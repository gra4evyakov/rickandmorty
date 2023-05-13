import axiosInstance from '@/services/default'
import type { CharacterResponse } from '@/services/interfaces/characterResponse'
import type { RequestParams } from '@/api/characters/types'

export const apiService = {
  async getCharacters(params?: RequestParams): Promise<CharacterResponse> {
    const response = await axiosInstance.get('', { params })
    return response.data
  }
}
