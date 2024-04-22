import { TodoDTO } from '@dtos/todoDTO'
import { useApi } from './useApi'
import { Page } from '@dtos/Page'

export function useTodos(id?: number) {
  const { data, isLoading, error, mutate } = useApi<Page<TodoDTO>>('/v1/todos')

  return { data, isLoading, error, mutate }
}