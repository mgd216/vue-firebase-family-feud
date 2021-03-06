<template>
  <v-container fluid fill-height>
    <v-layout row align-center justify-center>
      <v-card flat max-width="400">
        <v-card-title primary-title>
          <img src="@/assets/family_feud_small.png" height="40px" alt />
          <span class="title">Family Feud</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="formValid" class="pa-2">
            <v-text-field
              v-model="form.email"
              name="Email"
              label="Email"
              required
              :rules="[rules.required, rules.email]"
            >
              <fa-icon slot="prepend" icon="envelope" />
            </v-text-field>
            <v-text-field
              v-model="form.password"
              name="Password"
              label="Password"
              type="password"
              :rules="[rules.required]"
              required
            >
              <fa-icon slot="prepend" icon="lock" />
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="processing || !formValid"
            :loading="processing"
            primary
            large
            block
            @click.prevent="submitLogin()"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      formValid: false,
      processing: false,
      rules: {
        required: (value) => !!value || 'This field is required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  methods: {
    ...mapActions(['login']),
    submitLogin() {
      if (!this.formValid) return
      this.processing = true
      this.login({
        email: this.form.email,
        password: this.form.password,
      }).finally(() => {
        this.processing = false
      })
    },
  },
}
</script>
