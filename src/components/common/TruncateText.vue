<template>
  <span>
    <!-- eslint-disable vue/no-v-html -->
    <span
      class="pointer d-inline-block text-truncate"
      :style="`max-width: ${maxWidth}px;`"
      @click="show = true"
    >
      <span v-html="text"></span>
    </span>
    <BaseDialog v-model="show" :max-width="dialogMaxWidth" :title="dialogTitle">
      <template #body>
        <div class="scroller-400 pa-3" v-html="text"></div>
      </template>
    </BaseDialog>
  </span>
</template>

<script>
import BaseDialog from '@/components/layout/BaseDialog.vue'

export default {
  name: 'TruncateText',
  components: {
    BaseDialog,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    maxWidth: {
      type: Number,
      default: 150,
    },
    dialogTitle: {
      type: String,
      default: null,
    },
    dialogMaxWidth: {
      type: [String, Number],
      default: '95%',
    },
  },
  data() {
    return {
      show: false,
    }
  },
}
</script>

<style></style>template
