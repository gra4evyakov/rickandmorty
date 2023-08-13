<script setup lang="ts">
interface Props {
  sort: string[]
}

const props = defineProps<Props>()
const emit = defineEmits(['editSort'])

const editSort = (sort: string) => {
  emit('editSort', sort)
}
</script>

<template>
  <div class="sort">
    <p>sort:</p>
    <div v-for="(sort, id) in props.sort" :key="id" class="sort-button">
      <input type="radio" name="sort" :id="sort" @change="editSort(sort)" />
      <label :for="sort">{{ sort }}</label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sort {
  display: flex;
  align-items: center;
  padding: 5px 20px;
  border: 1px solid rgba(240, 248, 255, 0.5);
  border-radius: 25px;
  gap: 15px;
  backdrop-filter: var(--blur-filter);

  &-button {
    input {
      display: none;
    }

    input:checked + label {
      text-shadow: var(--white-shadow);
    }

    label {
      cursor: pointer;
      font-size: 24px;
      transition: text-shadow 0.3s;

      &:hover {
        text-shadow: var(--white-shadow);
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
  }
}
</style>
