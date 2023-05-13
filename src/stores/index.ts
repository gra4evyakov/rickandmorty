import { ref } from 'vue'
import { defineStore } from 'pinia'

import { useRequest } from '@/api/characters/requests'
import { type Character } from '@/services/interfaces/character'

export const useStateStore = defineStore('state', () => {
  const favourites = ref<Character[]>([])
  const filters = ref<string[]>(['All', 'Human', 'Animal', 'Alien'])

  const currentFilter = ref<string>('All')
  const currentSearch = ref<string>('')
  const currentPage = ref<number>(1)

  const { data, isLoading, isError, loadCharacters, pages } = useRequest()

  async function getCharacters() {
    currentFilter.value = currentFilter.value === 'All' ? '' : currentFilter.value
    await loadCharacters({
      page: currentPage.value,
      name: currentSearch.value,
      species: currentFilter.value
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
    data,
    favourites,
    filters,
    currentFilter,
    currentSearch,
    currentPage,
    pages,
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
