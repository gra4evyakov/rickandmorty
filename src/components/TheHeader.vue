<script setup lang="ts">
import { useStateStore } from '@/stores/index'

const stateStore = useStateStore()
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="header-logo">Rick and Morty</RouterLink>
    <nav class="menu">
      <ul class="menu-list">
        <li class="menu-list_item">
          <RouterLink to="/">MAIN</RouterLink>
        </li>
        <li class="menu-list_item">
          <RouterLink to="/favourites">FAVOURITES {{ stateStore.favourites.length }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 10px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.422);
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.422);
  backdrop-filter: var(--blur-filter);

  &-logo {
    font-size: 24px;
    transition: text-shadow 0.3s;

    &:hover {
      text-shadow: var(--white-shadow);
    }
  }

  .menu {
    &-list {
      display: flex;
      gap: 25px;

      &_item {
        transition: text-shadow 0.3s;

        &:hover {
          text-shadow: var(--white-shadow);
        }
      }
    }
  }

  @media screen and (max-width: 550px) {
    & {
      padding: 10px 15px;
      justify-content: center;
      gap: 10px;
    }
  }
}
</style>
