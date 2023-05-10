<script setup lang="ts">
interface Props {
  maxPages: number
  currentPage: number
}
const props = defineProps<Props>()
const emit = defineEmits(['setCurrentPage'])

const setCurrentPage = (pageNumber: number) => {
  if (pageNumber >= 1 && pageNumber <= props.maxPages) {
    emit('setCurrentPage', pageNumber)
  }
}
</script>

<template>
  <div class="pagination">
    <p class="pagination-pages">Page {{ props.currentPage }} of {{ props.maxPages }}</p>
    <button class="pagination-button" :disabled="props.currentPage == 1" @click="setCurrentPage(1)">
      FIRST PAGE
    </button>
    <button
      class="pagination-button"
      :disabled="props.currentPage == 1"
      @click="setCurrentPage(props.currentPage - 1)"
    >
      PREV
    </button>
    <button
      class="pagination-button"
      :disabled="props.currentPage == props.maxPages"
      @click="setCurrentPage(props.currentPage + 1)"
    >
      NEXT
    </button>
    <button
      class="pagination-button"
      :disabled="props.currentPage == props.maxPages"
      @click="setCurrentPage(props.maxPages)"
    >
      LAST PAGE
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  margin-bottom: 15px;
  text-align: center;

  &-pages {
    margin-bottom: 5px;
  }

  &-button {
    padding: 5px 10px;
    border: 1px solid var(--base-color);
    border-radius: 25px;
    transition: text-shadow 0.3s;

    &:hover {
      text-shadow: var(--white-shadow);
    }

    &:disabled {
      cursor: not-allowed;
      text-shadow: none;
      opacity: 0.8;
    }
  }

  &-button + &-button {
    margin-left: 10px;
  }
}
</style>
