<template>
  <v-select
    :value="user"
    return-object
    :label="label"
    :items="activeUserSelectList"
    :clearable="clearable"
    :required="required"
    item-value="id"
    item-text="fullName"
    @input="handleInput"
    @click:clear="
      () => {
        user = null
      }
    "
  ></v-select>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserSelectList',
  props: {
    value: {
      type: Object,
      default: null,
    },
    label: {
      type: String,
      default: 'Select User',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: null,
    }
  },
  computed: {
    ...mapGetters(['activeUserSelectList']),
  },
  watch: {
    value(val) {
      this.user = val
    },
  },
  mounted() {
    this.user = this.value
  },
  methods: {
    handleInput(val) {
      if (val) {
        this.$emit('input', { id: val.id, fullName: val.fullName })
      } else {
        this.$emit('input', null)
      }
    },
  },
}
</script>
