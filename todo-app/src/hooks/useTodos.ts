import { Page } from '@dtos/page'
import { Todo } from '@dtos/todo'

import { useApi } from './useApi'

export function useTodos() {
  const { data, isLoading, error, mutate, isValidating } =
    useApi<Page<Todo>>('/v1/todos')

  return { data, isLoading, error, mutate, isValidating }
}
