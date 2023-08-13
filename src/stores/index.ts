import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { useGetCharacters } from '@/api/characters/requests'
import { type Character } from '@/services/interfaces/character'

export const useStateStore = defineStore('state', () => {
  const sort = ref<string[]>(['All', 'Name', 'Species'])
  const filters = ref<string[]>(['All', 'Human', 'Animal', 'Alien'])
  const favourites = ref<Character[]>([])

  const currentFilter = ref<string>('')
  const currentSort = ref<string>('')
  const currentSearch = ref<string>('')
  const currentPage = ref<number>(1)

  const characters = computed(() => {
    const results = data?.value?.results;
    if (!results) {
      return [];
    }

    let sortedCharacters = [...results];
    
    if (currentSort.value === 'Name') {
      return sortedCharacters.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort.value === 'Species') {
      return sortedCharacters.sort((a, b) => a.species.localeCompare(b.species));
    } else if (currentSort.value === '') {
      return sortedCharacters;
    }
  });

  const pages = computed(() => data?.value?.info?.pages || 1)


  const { data, isLoading, isError, execute } = useGetCharacters()

  async function getCharacters() {
    currentFilter.value = currentFilter.value === 'All' ? '' : currentFilter.value
    await execute({
      page: currentPage.value,
      name: currentSearch.value,
      species: currentFilter.value
    })
  }

  function editFilter(newFilter: string) {
    currentFilter.value = newFilter
    getCharacters()
  }

  function editSort(newSort: string) {
    currentSort.value = newSort
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
    sort,
    currentFilter,
    currentSort,
    currentSearch,
    currentPage,
    pages,
    isLoading,
    isError,
    getCharacters,
    editFilter,
    editSort,
    editSearch,
    editCurrentPage,
    addToFavourites,
    removeToFavourites,
    setFavouritesData,
    updateFavourites
  }
})
