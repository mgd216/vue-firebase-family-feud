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
              <v-text-field
                v-model="game.teamA.name"
                label="Team A"
                @input="updateGame"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <div class="d-flex justify-space-between">
                <v-btn class="primary" @click="scoreToA()">
                  <fa-icon icon="arrow-left" class="mr-2" /> Score to A
                </v-btn>
                <v-btn class="primary" @click="scoreToB()">
                  Score to B<fa-icon icon="arrow-right" class="ml-2" />
                </v-btn>
              </div>
              <div v-if="game" class="text-h3 pa-2 text-center">
                {{ game.question }}
              </div>
            </v-col>
            <v-col cols="2" class="text-center text-h3">
              <v-text-field
                v-model="game.teamB.name"
                label="Team B"
                @input="updateGame"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <div>
                <v-switch
                  v-model="game.teamA.strike1"
                  label="STRIKE 1"
                  @change="updateGame"
                ></v-switch>
              </div>
              <div>
                <v-switch
                  v-model="game.teamA.strike2"
                  label="STRIKE 2"
                  @change="updateGame"
                ></v-switch>
              </div>
              <div>
                <v-switch
                  v-model="game.teamA.strike3"
                  label="STRIKE 3"
                  @change="updateGame"
                ></v-switch>
              </div>
            </v-col>
            <v-col cols="8">
              <v-row v-for="(a, index) of game.answers" :key="index">
                <v-col cols="8" class="text-h3">
                  {{ a.answer }}
                </v-col>
                <v-col cols="2" class="text-h2">{{ a.value }}</v-col>
                <v-col cols="2"
                  ><v-switch
                    v-model="a.showAnswer"
                    label="Show Answer"
                    @click="updateQuestionScore(a.value)"
                  ></v-switch
                ></v-col>
              </v-row>
            </v-col>
            <v-col cols="2">
              <div>
                <v-switch
                  v-model="game.teamB.strike1"
                  label="STRIKE 1"
                  @change="updateGame"
                ></v-switch>
              </div>
              <div>
                <v-switch
                  v-model="game.teamB.strike2"
                  label="STRIKE 2"
                  @change="updateGame"
                ></v-switch>
              </div>
              <div>
                <v-switch
                  v-model="game.teamB.strike3"
                  label="STRIKE 3"
                  @change="updateGame"
                ></v-switch>
              </div>
            </v-col>
          </v-row>
        </div>
        <div>
          <v-btn class="primary" @click="clearGame()">Create New Game</v-btn>
          <v-btn class="ml-3 primary" @click="clearQuestionsLoaded()"
            >Clear Loaded Questions</v-btn
          >
        </div>
      </v-col>
      <v-col cols="4">
        <div v-for="q of questions" :key="q.id">
          <div class="pa-2 d-flex justify-space-between">
            <div>{{ q.question }}</div>
            <fa-icon
              v-if="isQuestionLoaded(q.id)"
              icon="check-circle"
              class="success--text"
            />
            <v-btn v-else small class="primary" @click="loadQuestion(q)"
              >load</v-btn
            >
          </div>
          <v-divider></v-divider>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Score from '@/components/game/Score'

export default {
  name: 'AdminGame',
  components: {
    Score,
  },
  computed: {
    ...mapGetters([
      'currentUserProfile',
      'game',
      'questions',
      'questionsLoaded',
    ]),
  },
  methods: {
    ...mapActions([
      'clearQuestionsLoaded',
      'createNewGameByUser',
      'getGameByUser',
      'updateGame',
    ]),
    isQuestionLoaded(id) {
      return this.questionsLoaded.includes(id)
    },
    clearGame() {
      this.$swal({
        title: 'Create New Game?',
        text: `This will stop the current game and create a new game, Continue?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, New Game',
        cancelButtonText: 'No',
        showCloseButton: true,
      }).then((result) => {
        if (result.value) {
          this.createNewGameByUser(this.currentUserProfile.id)
        }
      })
    },
    loadQuestion(question) {
      if (this.game) {
        this.game.question = question.question
        this.game.answers = question.answers.map((a) => {
          return {
            answer: a.answer,
            value: a.value,
            showAnswer: false,
          }
        })
        this.questionsLoaded.push(question.id)
        this.updateGame()
      }
    },
    scoreToA() {
      this.game.teamA.score += this.game.questionScore
      this.game.teamA.strike1 = false
      this.game.teamA.strike2 = false
      this.game.teamA.strike3 = false
      this.game.questionScore = 0
      this.game.question = null
      this.game.answers = []
      this.updateGame()
    },
    scoreToB() {
      this.game.teamB.score += this.game.questionScore
      this.game.teamB.strike1 = false
      this.game.teamB.strike2 = false
      this.game.teamB.strike3 = false
      this.game.questionScore = 0
      this.game.question = null
      this.game.answers = []
      this.updateGame()
    },
    updateQuestionScore(val) {
      this.game.questionScore += val
      this.updateGame()
    },
  },
}
</script>
