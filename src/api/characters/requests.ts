import { apiService } from '@/api/characters/services'
import { useRequest } from '@/hooks/useRequest'

export const useGetCharacters = () => {
  return useRequest(apiService.getCharacters)
}
