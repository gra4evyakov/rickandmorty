<script setup lang="ts">
const emit = defineEmits(['editSize'])

const editSize = (size: string) => {
  emit('editSize', size)
}

const cardSizes: string[] = ['small', 'medium', 'large']
</script>

<template>
  <div class="sizes">
    <p>card size:</p>
    <div v-for="(size, id) in cardSizes" :key="id" class="sizes-button">
      <input type="radio" name="size" :id="size" @change="editSize(size)" />
      <label :for="size">{{ size }}</label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sizes {
  width: fit-content;
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
