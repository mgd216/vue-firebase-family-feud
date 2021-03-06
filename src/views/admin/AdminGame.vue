<template>
  <v-container fluid grid-list-md>
    <v-row>
      <v-col cols="8">
        <div v-if="game">
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
              <div>
                <v-switch
                  v-model="game.teamA.strike1"
                  label="STRIKE 1"
                ></v-switch>
              </div>
              <div>
                <v-switch
                  v-model="game.teamA.strike2"
                  label="STRIKE 2"
                ></v-switch>
              </div>
              <div>
                <v-switch
                  v-model="game.teamA.strike3"
                  label="STRIKE 3"
                ></v-switch>
              </div>
            </v-col>
            <v-col cols="8"> </v-col>
            <v-col cols="2">
              <div>
                <v-switch
                  v-model="game.teamB.strike1"
                  label="STRIKE 1"
                ></v-switch>
              </div>
              <div>
                <v-switch
                  v-model="game.teamB.strike2"
                  label="STRIKE 2"
                ></v-switch>
              </div>
              <div>
                <v-switch
                  v-model="game.teamB.strike3"
                  label="STRIKE 3"
                ></v-switch>
              </div>
            </v-col>
          </v-row>
        </div>
        <div>
          <v-btn @click="createNewGame()">Create New Game</v-btn>
        </div>
      </v-col>
      <v-col cols="4">
        <div v-for="q of questions" :key="q.id">
          <div class="pa-2 d-flex justify-space-between">
            <div>{{ q.question }}</div>
            <v-btn small class="primary">load</v-btn>
          </div>
          <v-divider></v-divider>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Question from '@/components/game/Question'
import Score from '@/components/game/Score'

export default {
  name: 'AdminGame',
  components: {
    Question,
    Score,
  },
  computed: {
    ...mapGetters(['currentUserProfile', 'game', 'questions']),
  },
  methods: {
    ...mapActions(['getGameByUser']),
    createNewGame() {
      this.getGameByUser(this.currentUserProfile.id)
    },
  },
}
</script>
