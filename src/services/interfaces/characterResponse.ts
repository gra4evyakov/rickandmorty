import { Character } from './character'

export interface CharacterResponse {
  info: {
    count: number
    next: string
    pages: number
    prev: number | null
  }
  results: Character[]
}
