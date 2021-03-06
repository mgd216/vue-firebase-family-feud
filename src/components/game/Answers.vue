<template>
  <div>
    <div v-for="(a, index) of answers" :key="index">
      <div v-if="a.showAnswer" class="text-h2 answer">
        <v-row>
          <v-col cols="10" class="text-center">
            {{ a.answer }}
          </v-col>
          <v-col cols="2" class="font-weight-bold text-center">
            {{ a.value }}
          </v-col>
        </v-row>
      </div>
      <div v-else class="d-flex justify-center align-center text-h1 answer">
        {{ index + 1 }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Answers',
  props: {
    answers: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.answer {
  border: 1px solid #ddd;
  margin: 3px;
  padding: 3px;
}
</style>
