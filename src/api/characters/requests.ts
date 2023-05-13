import { ref, type Ref } from 'vue'
import { apiService } from '@/api/characters/services'
import type { Character } from '@/services/interfaces/character'
import type { CharacterResponse } from '@/services/interfaces/characterResponse'
import type { RequestParams, Request } from '@/api/characters/types'

export const useRequest = (): Request => {
  const data: Ref<Character[]> = ref([])
  const isLoading: Ref<boolean> = ref(false)
  const isError: Ref<boolean> = ref(false)
  const pages: Ref<number> = ref(1)

  const loadCharacters = async (params?: RequestParams): Promise<void> => {
    isLoading.value = true
    try {
      const response: CharacterResponse = await apiService.getCharacters(params)
      data.value = response.results
      pages.value = response.info.pages
    } catch (err) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, isError, pages, loadCharacters }
}
