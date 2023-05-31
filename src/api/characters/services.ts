import axiosInstance from '@/services/default'
import type { CharacterResponse } from '@/services/interfaces/characterResponse'
import type { RequestParams } from '@/api/characters/types'

export const apiService = {
  async getCharacters(params?: RequestParams): Promise<CharacterResponse> {
    return (await axiosInstance.get('', { params })).data
  }
}
