import { ref, type Ref } from 'vue'
import type { RequestParams, RequestFunction, RequestResult } from '@/api/characters/types'

export const useRequest = <T>(requestFunction: RequestFunction<T>): RequestResult<T> => {
  const data: Ref<T | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)
  const isError: Ref<boolean> = ref(false)

  const execute = async (params?: RequestParams): Promise<void> => {
    isLoading.value = true
    try {
      data.value = await requestFunction(params)
    } catch {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    data,
    isLoading,
    isError,
    execute
  }
}
