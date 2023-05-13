<script setup lang="ts">
import { onMounted } from 'vue'
import { useStateStore } from '@/stores/index'

import MyLoader from '@/components/MyLoader.vue'
import MyCard from '@/components/MyCard/MyCard.vue'

import { type Character } from '@/services/interfaces/character'

const stateStore = useStateStore()

const addToFavourites = (card: Character) => {
  stateStore.addToFavourites(card)
}
const removeToFavourites = (id: number) => {
  stateStore.removeToFavourites(id)
}

onMounted(() => {
  stateStore.setFavouritesData()
})
</script>

<template>
  <main class="favourites">
    <MyLoader v-if="stateStore.isLoading" />
    <ul v-else class="favourites-cards">
      <MyCard
        v-for="card in stateStore.favourites"
        :key="card.id"
        :character="card"
        @addToFavourites="addToFavourites(card)"
        @removeToFavourites="removeToFavourites(card.id)"
      />
    </ul>
  </main>
</template>

<style lang="scss" scoped>
.favourites {
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
    grid-template-columns: repeat(auto-fill, 200px);
    grid-auto-flow: dense;
    justify-content: center;
    gap: 30px;
  }

  @media screen and (max-width: 768px) {
    & {
      padding: 0 15px;
    }
  }
}
</style>
