<template>
  <div>
    <v-container v-if="game" grid-list-md fluid>
      <v-row>
        <v-col cols="2">
          <Score :score="game.teamA.score" />
        </v-col>
        <v-col cols="3"> &nbsp; </v-col>
        <v-col cols="2">
          <Score :score="game.questionScore" />
        </v-col>
        <v-col cols="3"> &nbsp; </v-col>
        <v-col cols="2">
          <Score :score="game.teamB.score" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" class="text-center text-h3">
          {{ game.teamA.name }}
        </v-col>
        <v-col cols="8">
          <Question question="This is a test question?" />
        </v-col>
        <v-col cols="2" class="text-center text-h3">
          {{ game.teamB.name }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <Strike :show="game.teamA.strike1" />
          <Strike :show="game.teamA.strike2" />
          <Strike :show="game.teamA.strike3" />
        </v-col>
        <v-col cols="8">
          <Answers
            :answers="[
              { answer: 'TEST', value: 10, showAnswer: true },
              { answer: 'PIZZA', value: 23, showAnswer: true },
            ]"
          />
        </v-col>
        <v-col cols="2">
          <Strike :show="game.teamB.strike1" />
          <Strike :show="game.teamB.strike2" />
          <Strike :show="game.teamB.strike3" />
        </v-col>
      </v-row>
    </v-container>
    <div v-else class="d-flex justify-center mt-5 text-h1">
      Ask your Admin to create a new Game.
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Answers from '@/components/game/Answers'
import Question from '@/components/game/Question'
import Score from '@/components/game/Score'
import Strike from '@/components/game/Strike'

export default {
  name: 'Game',
  components: {
    Answers,
    Question,
    Score,
    Strike,
  },
  computed: {
    ...mapGetters(['game']),
  },
}
</script>
