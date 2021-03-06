<template>
  <v-dialog v-model="value" :max-width="maxWidth" persistent>
    <v-card>
      <v-toolbar row class="blue darken-2" dense>
        <v-toolbar-title>
          <span class="headline mr-w">{{ title }}</span>
          <slot name="title" />
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="text-right">
          <slot name="items" />
          <v-btn
            text
            small
            fab
            class="headline"
            aria-label="Close Dialog"
            @click="cancel()"
            >X</v-btn
          >
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <slot name="form" />
        <slot name="body" />
      </v-card-text>
      <v-card-actions class="gery darken-4">
        <div v-if="hasFormSlot" class="caption">
          * Required Fields
        </div>
        <slot name="footer" />
        <v-spacer></v-spacer>
        <v-btn
          v-if="onReset"
          color="blue darken-2"
          text
          aria-label="Reset Dialog"
          @click="onReset"
          >Reset</v-btn
        >
        <v-btn
          color="blue darken-2"
          text
          aria-label="Cancel and Close Dialog"
          @click="cancel()"
          >{{ cancelBtnText }}</v-btn
        >
        <v-btn
          v-if="onSubmit"
          color="blue darken-2"
          :disabled="submitDisabled"
          text
          :aria-label="submitBtnText"
          @click="onSubmit"
          >{{ submitBtnText }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    caption: {
      type: String,
      default: '',
    },
    cancelBtnText: {
      type: String,
      default: 'Cancel',
    },
    maxWidth: {
      type: [String, Number],
      default: '99%',
    },
    onReset: {
      type: Function,
      default: null,
    },
    onSubmit: {
      type: Function,
      default: null,
    },
    submitBtnText: {
      type: String,
      default: 'Submit',
    },
    submitDisabled: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasFormSlot() {
      return !!this.$slots.form
    },
  },
  methods: {
    cancel() {
      this.$emit('input', false)
    },
  },
}
</script>
