import { api } from '@utils/api'
import useSWR from 'swr'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useApi<Data = any, Error = any>(url: string) {
  const { data, error, isLoading, mutate, isValidating } = useSWR<Data, Error>(
    url,
    async (url: string) => {
      const response = await api.get(url)

      return response.data
    },
  )

  return { data, error, isLoading, mutate, isValidating }
}
