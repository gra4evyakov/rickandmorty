<script setup lang="ts">
import { computed } from 'vue'

import { useStateStore } from '@/stores/index'

import { type Character } from '@/services/interfaces/character'

interface Props {
  character: Character
}
const props = defineProps<Props>()
const stateStore = useStateStore()

const emit = defineEmits(['addToFavourites', 'removeToFavourites'])
const addToFavourites = () => {
  emit('addToFavourites', props.character)
}
const removeToFavourites = () => {
  emit('removeToFavourites', props.character.id)
}
const isFavourites = computed((): boolean => {
  return stateStore.favourites.some((item: Character) => item.id === props.character.id)
})
</script>

<template>
  <div class="card">
    <img class="card-image" :src="props.character.image" :alt="props.character.name" />
    <span class="card-name">Name: {{ props.character.name }}</span>
    <span class="card-species">Species: {{ props.character.species }}</span>
    <button v-if="isFavourites" class="card-button card-button__remove" @click="removeToFavourites">
      REMOVE TO FAVOURITES
    </button>
    <button v-else class="card-button card-button__add" @click="addToFavourites">
      ADD TO FAVOURITES
    </button>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.422);
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.422);
  border-radius: 25px;
  backdrop-filter: var(--blur-filter);
  font-size: 14px;

  &-image {
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
  }

  &-name {
    padding: 10px;
  }

  &-species {
    padding: 10px;
  }

  &-button {
    padding: 10px 5px;
    border: 1px solid rgba(0, 0, 0, 0.422);
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    background: rgba(0, 0, 0, 0.5);
    font-size: 10px;
    white-space: nowrap;

    &__remove:hover {
      border-color: rgba(150, 55, 55, 0.264);
      background: rgba(150, 55, 55, 0.663);
      box-shadow: 0px 0px 1px 1px rgba(150, 55, 55, 0.663);
      animation: linear 0.5s infinite alternate button-remove;
    }

    &__add:hover {
      border-color: rgba(55, 150, 55, 0.264);
      background: rgba(55, 150, 55, 0.663);
      box-shadow: 0px 0px 1px 1px rgba(55, 150, 55, 0.663);
      animation: linear 0.5s infinite alternate button-add;
    }
  }
}

@keyframes button-add {
  100% {
    box-shadow: 0px 0px 5px 5px rgba(55, 150, 55, 0.663);
  }
}

@keyframes button-remove {
  100% {
    box-shadow: 0px 0px 5px 5px rgba(150, 55, 55, 0.663);
  }
}
</style>
