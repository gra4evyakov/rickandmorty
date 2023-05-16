import { type Ref } from 'vue'

export type RequestParams = {
  page?: number
  name?: string
  species?: string
}

export type RequestResult<T> = {
  data: Ref<T | null>
  isLoading: Ref<boolean>
  isError: Ref<boolean>
  execute: (params?: RequestParams) => Promise<void>
}

export type RequestFunction<T> = (params?: RequestParams) => Promise<T>
