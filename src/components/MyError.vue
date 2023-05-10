<template>
  <div class="error">
    <p>WARNING</p>
    <p>Something went wrong</p>
  </div>
</template>

<style lang="scss" scoped>
.error {
  font-size: 40px;
  text-align: center;
  color: red;
  text-shadow: 0px 0px 1px red;
  animation: linear 0.5s infinite alternate error;
}

@keyframes error {
  100% {
    text-shadow: 0px 0px 40px red;
  }
}
</style>
