import { ref } from 'vue'
import { defineStore } from 'pinia'

import axiosInstance from '../services/default'

import { type Character } from '../services/interfaces/character'
import { type CharacterResponse } from '../services/interfaces/characterResponse'

export const useStateStore = defineStore('state', () => {
  const characters = ref<Character[]>([])
  const favourites = ref<Character[]>([])
  const filters = ref<string[]>(['All', 'Human', 'Animal', 'Alien'])

  const currentFilter = ref<string>('All')
  const currentSearch = ref<string>('')

  const currentPage = ref<number>(1)
  const maxPages = ref<number>(0)

  const isLoading = ref<boolean>(false)
  const isError = ref<boolean>(false)

  async function getCharacters() {
    currentFilter.value = currentFilter.value === 'All' ? '' : currentFilter.value
    isLoading.value = true
    await axiosInstance
      .get<CharacterResponse>('/', {
        params: {
          name: currentSearch.value,
          species: currentFilter.value,
          page: currentPage.value
        }
      })
      .then((res) => {
        isError.value = false
        isLoading.value = false
        characters.value = res.data.results
        maxPages.value = res.data.info.pages
      })
      .catch((error) => {
        isLoading.value = false
        isError.value = true
        console.log(error)
      })
  }

  function editFilter(filter: string) {
    currentFilter.value = filter
    getCharacters()
  }

  function editSearch(value: string) {
    currentSearch.value = value
    getCharacters()
  }

  function editCurrentPage(page: number) {
    currentPage.value = page
    getCharacters()
  }

  function addToFavourites(card: Character) {
    favourites.value.push(card)
    updateFavourites()
  }

  function removeToFavourites(id: number) {
    favourites.value = favourites.value.filter((card) => card.id != id)
    updateFavourites()
  }

  function setFavouritesData() {
    const localFavourites = localStorage.getItem('favouritesList')
    if (localFavourites) {
      favourites.value = JSON.parse(localFavourites) as Character[]
    }
  }
  function updateFavourites() {
    localStorage.setItem('favouritesList', JSON.stringify(favourites.value))
  }

  return {
    characters,
    favourites,
    filters,
    currentFilter,
    currentSearch,
    currentPage,
    maxPages,
    isLoading,
    isError,
    getCharacters,
    editFilter,
    editSearch,
    editCurrentPage,
    addToFavourites,
    removeToFavourites,
    setFavouritesData,
    updateFavourites
  }
})
