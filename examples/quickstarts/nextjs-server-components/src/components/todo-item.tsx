'use client'

import { NhostClient } from '@nhost/nhost-js'
import { deleteTodo, updateTodo } from '@server-actions/todos'
import Link from 'next/link'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'local',
  region: process.env.NEXT_PUBLIC_NHOST_REGION
})

export interface Todo {
  id: string
  title: string
  done: boolean
  attachment: {
    id: string
  }
}

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [completed, setCompleted] = useState(todo.done)

  const handleCheckboxChange = async () => {
    setCompleted(!completed)
    await updateTodo(todo.id, !completed)
  }

  const handleDeleteTodo = async () => {
    await deleteTodo(todo.id)
  }

  return (
    <div
      className={twMerge(
        'flex flex-row items-center p-2 bg-slate-100',
        completed && 'line-through bg-slate-200'
      )}
    >
      <label
        htmlFor={todo.id}
        className={twMerge(
          'block w-full space-x-2 rounded  select-none justify-center',
          completed && 'line-through bg-slate-200'
        )}
      >
        <input type="checkbox" id={todo.id} checked={completed} onChange={handleCheckboxChange} />
        <span>{todo.title}</span>
      </label>

      {todo.attachment && (
        <Link
          className="w-6 h-6"
          target="_blank"
          href={nhost.storage.getPublicUrl({ fileId: todo.attachment.id })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>
        </Link>
      )}

      <button onClick={handleDeleteTodo} className="w-6 h-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  )
}

export default TodoItem
