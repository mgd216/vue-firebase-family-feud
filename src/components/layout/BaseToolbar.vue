<template>
  <v-toolbar class="blue darken-2 mb-2" dense>
    <v-toolbar-title>
      <BackButton />
      <fa-icon v-if="icon" class="ml-3" :icon="icon" />
      <span v-if="title" class="ml-2">{{ title }}</span>
      <slot name="title" />
      <v-chip v-if="!isNil(counter)" :class="counterColor" class="ml-2">{{
        counter
      }}</v-chip>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <slot name="items" />
      <UserQuickLinkButton
        v-if="quickLink || quickLinkTitle"
        :display="qlTitle"
        :route="$route"
      />
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { isNil } from 'lodash'
import BackButton from '@/components/common/BackButton.vue'
import UserQuickLinkButton from '@/components/user/UserQuickLinkButton.vue'

export default {
  name: 'BaseToolbar',
  components: {
    BackButton,
    UserQuickLinkButton,
  },
  props: {
    counter: {
      type: Number,
      default: null,
    },
    counterColor: {
      type: String,
      default: 'primary darken-2',
    },
    icon: {
      type: [String, Array, null],
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    quickLink: {
      type: Boolean,
      default: false,
    },
    quickLinkTitle: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isNil,
    }
  },
  computed: {
    qlTitle() {
      return this.quickLinkTitle || this.title
    },
  },
}
</script>
