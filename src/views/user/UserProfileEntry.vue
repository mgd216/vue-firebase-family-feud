<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <v-col class="col-md-6 col-xs-12">
        <BaseCard>
          <template #title>{{
            isNew ? 'Create User' : 'Update User'
          }}</template>
          <template #body>
            <v-row>
              <v-col v-if="!isNew">
                <PictureInput
                  ref="profile_picture"
                  width="600"
                  height="600"
                  margin="16"
                  accept="image/jpeg, image/png"
                  size="1"
                  radius="50"
                  :z-index="1"
                  :prefill="profileImgFile"
                  button-class="btn"
                  @change="submitUserProfilePhoto"
                ></PictureInput>
              </v-col>
              <v-col>
                <v-form ref="form" v-model="formValid" class="pa-2">
                  <v-text-field
                    v-model="user.firstName"
                    label="First Name *"
                    :disabled="!isActive"
                    :counter="20"
                    :minlength="3"
                    :maxlength="20"
                    required
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.lastName"
                    label="Last Name *"
                    :disabled="!isActive"
                    :counter="20"
                    :minlength="3"
                    :maxlength="20"
                    required
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.email"
                    :disabled="!isNew"
                    required
                    :rules="[rules.required, rules.email]"
                    label="Email *"
                  ></v-text-field>
                  <v-text-field
                    v-model="user.phone"
                    label="Phone"
                    :disabled="!isActive"
                    hint="555-555-5555"
                    :maxlength="12"
                    :rules="[rules.phone]"
                  ></v-text-field>
                  <v-radio-group
                    v-if="isAdmin"
                    v-model="user.role"
                    :disabled="!isActive"
                  >
                    <v-radio label="Admin" :value="USER_ROLES.ADMIN"></v-radio>
                    <v-radio
                      label="Employee"
                      :value="USER_ROLES.EMPLOYEE"
                    ></v-radio>
                  </v-radio-group>
                  <div v-if="user.terminateDate !== null" class="error--text">
                    Terminated on {{ user.terminateDate | date }}
                  </div>
                  <span class="caption float-right">* Required Fields</span>
                </v-form>
              </v-col>
            </v-row>
          </template>
          <template #actions>
            <v-btn
              v-if="!isNew && isActive"
              :disabled="processing"
              :loading="processing"
              class="error"
              large
              @click="submitTerminateUser()"
              >Terminate</v-btn
            >
            <v-btn
              v-if="!isNew && !isActive"
              :disabled="processing"
              :loading="processing"
              class="success"
              large
              @click="submitActivateUser()"
              >Activate</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
              v-if="!isNew && isActive"
              :disabled="processing"
              :loading="processing"
              class="warning"
              large
              @click="submitResetPassword()"
              >Reset Password</v-btn
            >
            <v-btn
              v-if="isActive"
              :disabled="processing || !formValid"
              :loading="processing"
              class="primary darken-2"
              large
              @click.prevent="submitForm()"
              >{{ isNew ? 'Create User' : 'Update User' }}</v-btn
            >
          </template>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { cloneDeep } from 'lodash'
import { fetch as fetchPolyfill } from 'whatwg-fetch'
import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/layout/BaseCard.vue'
import PictureInput from 'vue-picture-input'
import USER_ROLES from '@/constants/user-roles.constant'
import ValidationSvc from '@/services/validation.service'

const BLANK_USER = {
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  role: USER_ROLES.EMPLOYEE,
  terminateDate: null,
}

export default {
  name: 'UserProfileEntry',
  components: {
    BaseCard,
    PictureInput,
  },
  data() {
    return {
      error: null,
      formValid: false,
      isNew: false,
      user: { ...BLANK_USER },
      profileImgFile: null,
      processing: false,
      rules: {
        required: (val) => ValidationSvc.required(val),
        email: (val) => ValidationSvc.email(val),
        phone: (val) => ValidationSvc.phone(val),
      },
      USER_ROLES,
    }
  },
  computed: {
    ...mapGetters(['isAdmin', 'userById']),
    isActive() {
      return this.user.terminateDate === null
    },
  },
  created() {
    this.initialize()
  },
  methods: {
    ...mapActions([
      'activateUser',
      'createUser',
      'getUsers',
      'resetPassword',
      'terminateUser',
      'users',
      'updateUser',
      'updateUserProfilePhoto',
    ]),
    initialize: async function () {
      if (this.$route.params.id) {
        if (this.users.length === 0) {
          await this.getUsers()
        }
        this.error = null
        this.isNew = false
        const user = this.userById(this.$route.params.id)
        if (user) {
          this.user = cloneDeep(user)
          if (user.profileImgUrl) {
            //place the image as a file for picture-input component
            fetchPolyfill(user.profileImgUrl).then((res) => {
              const fd = new FormData()
              fd.set('a', res._bodyBlob)
              this.profileImgFile = fd.get('a')
            })
          }
        } else {
          this.error = `User not found for ID: ${this.$route.params.id}`
        }
      } else {
        this.isNew = true
        this.user = { ...BLANK_USER }
      }
    },
    submitForm() {
      this.processing = true
      this.user.fullName = `${this.user.firstName} ${this.user.lastName}`
      if (this.isNew) {
        this.createUser(this.user)
          .then(() => {
            this.$router.push({
              name: 'UserList',
            })
          })
          .finally(() => {
            this.processing = false
          })
      } else {
        this.updateUser(this.user).finally(() => {
          this.processing = false
        })
      }
    },
    submitActivateUser() {
      this.processing = true
      this.activateUser(this.user).finally(() => {
        this.initialize()
        this.processing = false
      })
    },
    submitTerminateUser() {
      this.$swal({
        title: 'Terminate User?',
        text: `Are you sure you wish to terminate ${this.user.firstName}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Terminate',
        cancelButtonText: 'No',
        showCloseButton: true,
      }).then((result) => {
        if (result.value) {
          this.processing = true
          this.terminateUser(this.user).finally(() => {
            this.initialize()
            this.processing = false
          })
        }
      })
    },
    submitResetPassword() {
      this.$swal({
        title: 'Reset Password?',
        text: `Are you sure you wish to reset the password for ${this.user.firstName}?  They will receive a link to reset their password in their email: ${this.user.email}.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Resest',
        cancelButtonText: 'No',
        showCloseButton: true,
      }).then((result) => {
        if (result.value) {
          this.resetPassword(this.user.email)
        }
      })
    },
    submitUserProfilePhoto() {
      const opts = {
        userId: this.user.id,
        file: this.$refs.profile_picture.file,
      }
      this.processing = true
      this.updateUserProfilePhoto(opts)
        .then((url) => {
          this.user.profileImgUrl = url
        })
        .finally(() => {
          this.processing = false
        })
    },
  },
}
</script>
