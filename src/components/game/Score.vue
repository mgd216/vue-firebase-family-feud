<template>
  <div class="score d-flex align-center justify-center">{{ score }}</div>
</template>

<script>
export default {
  name: 'Score',
  props: {
    score: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
.score {
  font-size: 80px;
  font-weight: bold;
  border: 1px solid #ccc;
}
</style>
