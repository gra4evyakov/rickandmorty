<script setup lang="ts">
interface Props {
  filters: string[]
}

const props = defineProps<Props>()
const emit = defineEmits(['editFilter'])

const editFilter = (filter: string) => {
  emit('editFilter', filter)
}
</script>

<template>
  <div class="filters">
    <p>filter:</p>
    <div v-for="(filter, id) in props.filters" :key="id" class="filters-button">
      <input type="radio" name="filter" :id="filter" @change="editFilter(filter)" />
      <label :for="filter">{{ filter }}</label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filters {
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
