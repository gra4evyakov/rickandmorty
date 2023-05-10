<script setup lang="ts">
import { useStateStore } from '@/stores/index'

const stateStore = useStateStore()
</script>

<template>
  <footer class="footer">
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
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: transparent;
  border-top: 1px solid rgba(0, 0, 0, 0.422);
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.422);
  backdrop-filter: var(--blur-filter);
  color: rgba(0, 0, 0, 0.553);
  font-size: 12px;
}

.menu {
  &-list {
    display: flex;
    gap: 25px;
  }
}
</style>
