<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <span class="text-h4">User Notification</span>
      </v-card-title>
      <v-card-text>
        <v-container fluid grid-list-md>
          <v-row wrap>
            <v-col cols="12" lg="6" class="pa-3">
              <div v-if="notification.active" class="title text-center pt-2">
                Notifications are ACTIVE as of:
              </div>
              <div v-else class="title text-center pt-2">
                Notifications are NOT ACTIVE as of:
              </div>
              <div class="title text-center pt-2">
                {{ notification.updateDate | dateTime }} ({{
                  notification.updateDate | timeAgo
                }})
              </div>
            </v-col>
            <v-col cols="12" lg="6" class="pa-3">
              <v-btn
                class="success ma-3"
                :disabled="notification.active"
                @click="turnOnNotifications()"
                >Turn ON All Notifications</v-btn
              >
              <v-btn
                class="primary ma-3"
                :disabled="!notification.active"
                @click="turnOffNotifications()"
                >Turn OFF All Notifications</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="white black--text">
              <quill-editor
                v-model="notification.notification"
                class="quill-editor"
                :options="quillEditorOptions"
              ></quill-editor>
            </v-col>
          </v-row>
          <v-row wrap>
            <v-col cols="12" lg="6">
              <span class="title">Notification Type:</span>
              <v-radio-group v-model="notification.level" row>
                <v-radio label="INFO" value="info" color="primary" />
                <v-radio label="ERROR" value="error" color="primary" />
                <v-radio label="SUCCESS" value="success" color="primary" />
              </v-radio-group>
            </v-col>
            <v-col cols="12" lg="6">
              <v-btn class="primary" @click="submitUpdateNotification()"
                >Update Notification</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'AdminUserNotification',
  components: {
    quillEditor,
  },
  data() {
    return {
      notification: {
        level: 'info',
      },
    }
  },
  computed: {
    ...mapGetters(['quillEditorOptions', 'userNotification']),
  },
  watch: {
    userNotification: {
      handler: 'fetchUserNotification',
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['updateUserNotification', 'updateUserNotifications']),
    fetchUserNotification() {
      this.notification = cloneDeep(this.userNotification)
    },
    submitUpdateNotification() {
      this.notification.updateDate = new Date().valueOf()
      this.updateUserNotification(this.notification)
    },
    turnOnNotifications() {
      this.$swal({
        title: 'Turn ON Notifcations?',
        text: `Are you sure you wish to turn ON the Home Page Notification for all users?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Turn On',
        cancelButtonText: 'No',
        showCloseButton: true,
      }).then((result) => {
        if (result.value) {
          this.updateUserNotifications(true).then(() => {
            this.notification.active = true
            this.notification.updateDate = new Date().valueOf()
            this.submitUpdateNotification()
          })
        }
      })
    },
    turnOffNotifications() {
      this.$swal({
        title: 'Turn OFF Notifcations?',
        text: `Are you sure you wish to turn OFF the Home Page Notification for all users?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Turn Off',
        cancelButtonText: 'No',
        showCloseButton: true,
      }).then((result) => {
        if (result.value) {
          this.updateUserNotifications(false).then(() => {
            this.notification.active = false
            this.notification.updateDate = new Date().valueOf()
            this.submitUpdateNotification()
          })
        }
      })
    },
  },
}
</script>
