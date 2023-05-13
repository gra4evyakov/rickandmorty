<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStateStore } from '@/stores/index'

import MyFilters from '@/components/MyFilters/MyFilters.vue'
import MyCard from '@/components/MyCard/MyCard.vue'
import MySearch from '@/components/MySearch.vue'
import MyLoader from '@/components/MyLoader.vue'
import MyError from '@/components/MyError.vue'
import ThePagination from '@/components/ThePagination.vue'
import MyCardSize from '@/components/MyCard/MyCardSize.vue'

const stateStore = useStateStore()
const {
  getCharacters,
  setFavouritesData,
  editFilter,
  editSearch,
  editCurrentPage,
  addToFavourites,
  removeToFavourites
} = useStateStore()
const currentSize = ref('medium')

const editSize = (size: string) => {
  currentSize.value = size
}

onMounted(() => {
  getCharacters()
  setFavouritesData()
})
</script>

<template>
  <main class="content">
    <div class="content-actions">
      <MySearch @searchCharacters="editSearch" />
      <MyFilters :filters="stateStore.filters" @editFilter="editFilter" />
      <MyCardSize @editSize="editSize" />
    </div>
    <ThePagination
      :max-pages="stateStore.maxPages"
      :current-page="stateStore.currentPage"
      @setCurrentPage="editCurrentPage"
    />
    <MyLoader v-if="stateStore.isLoading" />
    <template v-else>
      <MyError v-if="stateStore.isError" />
      <ul v-else class="content-cards" :class="`content-cards-${currentSize}`">
        <MyCard
          v-for="card in stateStore.characters"
          :key="card.id"
          :character="card"
          @addToFavourites="addToFavourites"
          @removeToFavourites="removeToFavourites"
        />
      </ul>
    </template>
  </main>
</template>

<style lang="scss" scoped>
.content {
  padding: 0 50px;

  &-actions {
    display: flex;
    flex-wrap: wrap;
    row-gap: 15px;
    justify-content: space-between;
    margin-bottom: 15px;

    @media screen and (max-width: 1024px) {
      & {
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }
    }
  }

  &-cards {
    display: grid;
    grid-auto-flow: dense;
    justify-content: center;
    gap: 30px;

    &-small {
      grid-template-columns: repeat(auto-fill, 150px);
    }

    &-medium {
      grid-template-columns: repeat(auto-fill, 200px);
    }

    &-large {
      grid-template-columns: repeat(auto-fill, 250px);
    }
  }

  @media screen and (max-width: 768px) {
    & {
      padding: 0 15px;
    }
  }
}
</style>
