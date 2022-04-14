import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { DocumentNode } from 'graphql'

import { GraphqlRequestResponse, GraphqlResponse } from '../types'

export interface NhostGraphqlConstructorParams {
  url: string
}

export class NhostGraphqlClient {
  private url: string
  private instance: AxiosInstance
  private accessToken: string | null

  constructor(params: NhostGraphqlConstructorParams) {
    const { url } = params

    this.url = url
    this.accessToken = null
    this.instance = axios.create({
      baseURL: url
    })
  }

  async request(
    document: string | DocumentNode,
    variables?: any,
    config?: AxiosRequestConfig
  ): Promise<GraphqlRequestResponse> {
    // add auth headers if any
    const headers = {
      ...config?.headers,
      ...this.generateAccessTokenHeaders()
    }

    const operationName = ''

    let responseData
    try {
      const res = await this.instance.post(
        '',
        {
          operationName: operationName || undefined,
          query:
            typeof document === 'string'
              ? document
              : /*
                 * Dynamic import as graphql is an optional dependency and
                 * doesn't need to be here if the user is sending a string request
                 * On the other hand, if they send a graphql-tag request, we then
                 * know the graphql package is available
                 */
                (await import('graphql/language/printer')).print(document),
          variables
        },
        { ...config, headers }
      )

      responseData = res.data
    } catch (error) {
      if (error instanceof Error) {
        return { data: null, error }
      }
      console.error(error)
      return {
        data: null,
        error: new Error('Unable to get do GraphQL request')
      }
    }

    if (typeof responseData !== 'object' || Array.isArray(responseData) || responseData === null) {
      return {
        data: null,
        error: new Error('incorrect response data from GraphQL server')
      }
    }

    responseData = responseData as GraphqlResponse

    if (responseData.errors) {
      return {
        data: null,
        error: responseData.errors
      }
    }

    return { data: responseData.data, error: null }
  }

  getUrl(): string {
    return this.url
  }

  setAccessToken(accessToken: string | undefined) {
    if (!accessToken) {
      this.accessToken = null
      return
    }

    this.accessToken = accessToken
  }

  private generateAccessTokenHeaders() {
    if (!this.accessToken) {
      return
    }

    // eslint-disable-next-line consistent-return
    return {
      Authorization: `Bearer ${this.accessToken}`
    }
  }
}
