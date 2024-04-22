import { api } from "@services/api";
import useSWR from "swr";

export function useApi<Data = any, Error = any>(url: string) {
  const { data, error, isLoading, mutate } = useSWR<Data, Error>(url, async url => {
    const response = await api.get(url);

    return response.data;
  })

  return { data, error, isLoading, mutate }
}