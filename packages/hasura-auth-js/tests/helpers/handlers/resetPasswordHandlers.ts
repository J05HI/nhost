import { HttpResponse, rest } from 'msw'
import { BASE_URL } from '../config'

/**
 * Request handler for MSW to mock an internal server error when requesting a password reset.
 */
export const resetPasswordInternalErrorHandler = rest.post(`${BASE_URL}/user/password/reset`, () =>
  HttpResponse.json(
    {
      status: 500,
      error: 'internal-error',
      message: 'Internal error'
    },
    { status: 500 }
  )
)

/**
 * Request handler for MSW to mock a network error when requesting a password reset.
 */
export const resetPasswordNetworkErrorHandler = rest.post(
  `${BASE_URL}/user/password/reset`,
  () => new Response('Network error', { status: 500 })
)

/**
 * Request handler for MSW to mock a bad request when requesting a password reset.
 */
export const resetPasswordInvalidEmailHandler = rest.post(`${BASE_URL}/user/password/reset`, () =>
  HttpResponse.json(
    {
      status: 400,
      message: '"email" must be a valid email',
      error: 'invalid-request'
    },
    { status: 400 }
  )
)

/**
 * Request handler for MSW to mock a "User Not Found" error when requesting a password reset.
 */
export const resetPasswordUserNotFoundHandler = rest.post(`${BASE_URL}/user/password/reset`, () =>
  HttpResponse.json(
    {
      status: 400,
      message: 'No user found',
      error: 'user-not-found'
    },
    { status: 400 }
  )
)

/**
 * Request handler for MSW to mock a successful network request when requesting a password reset.
 */
export const resetPasswordSuccessHandler = rest.post(
  `${BASE_URL}/user/password/reset`,
  () => new Response('OK', { status: 200 })
)
