import { type Ref } from 'vue'
import { type Character } from '@/services/interfaces/character'

export type RequestParams = {
  name?: string
  page?: number
  status?: string
  species?: string
  type?: string
  gender?: string
}

export type Request = {
  data: Ref<Character[]>
  isLoading: Ref<boolean>
  isError: Ref<boolean>
  pages: Ref<number>
  loadCharacters: (params?: RequestParams) => Promise<void>
}
