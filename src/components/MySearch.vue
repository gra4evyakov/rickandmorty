<script lang="ts" setup>
import { useStateStore } from '@/stores/index'

const stateStore = useStateStore()

const searchValue = stateStore.currentSearch

const emit = defineEmits(['searchCharacters'])
const searchCharacters = (value: string) => {
  emit('searchCharacters', value)
}
</script>

<template>
  <form @submit.prevent="searchCharacters(searchValue)">
    <input
      class="search"
      id="search"
      type="text"
      placeholder="Search by characters"
      v-model="searchValue"
    />
  </form>
</template>

<style lang="scss" scoped>
.search {
  padding: 10px 20px;
  text-align: center;
  background: transparent;
  border: 1px solid rgba(240, 248, 255, 0.5);
  border-radius: 25px;
  color: inherit;
  font-size: 24px;
  backdrop-filter: var(--blur-filter);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0px 0px 10px 1px rgb(240, 248, 255);
  }

  &:focus {
    box-shadow: 0px 0px 10px 1px rgb(240, 248, 255);
  }

  &:focus-visible {
    outline: 1px solid white;
  }

  &::placeholder {
    color: rgba(240, 248, 255, 0.5);
  }

  @media screen and (max-width: 1024px) {
    & {
      width: fit-content;
    }
  }

  @media screen and (max-width: 768px) {
    & {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 425px) {
    & {
      font-size: 12px;
    }
  }
}
</style>
