<template>
  <span>
    <v-avatar v-if="imgUrl" :height="size" :width="size">
      <img :src="imgUrl" alt="avatar" />
    </v-avatar>
    <fa-icon v-else size="2x" icon="user" />
  </span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserAvatar',
  props: {
    userId: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 48,
    },
  },
  data() {
    return {
      imgUrl: null,
    }
  },
  computed: {
    ...mapGetters(['userProfileImgUrlByUserId']),
  },
  watch: {
    userId: {
      handler: 'initialize',
      immediate: true,
    },
  },
  methods: {
    initialize() {
      this.imgUrl = this.userProfileImgUrlByUserId(this.userId)
    },
  },
}
</script>
