<template>
  <v-card
    class="elevation-6 d-flex flex-column"
    :height="height"
    :outlined="outlined"
    :max-width="maxWidth"
  >
    <v-toolbar
      dense
      :class="titleBarClass"
      :max-height="titleBarHeight"
      :min-height="titleBarHeight"
    >
      <v-toolbar-title>
        <slot name="title" />
        <v-chip v-if="!isNil(counter)" :class="counterColor" class="ml-2">{{
          counter
        }}</v-chip>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <slot name="items" />
        <v-menu v-if="showMenu" bottom left>
          <template #activator="{ on }">
            <span v-on="on">
              <fa-icon class="title mt-3" icon="ellipsis-v" />
            </span>
          </template>
          <v-list>
            <slot name="menuItems" />
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <slot name="body" />
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions v-if="showActions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { isNil } from 'lodash'

export default {
  name: 'BaseCard',
  props: {
    counter: {
      type: Number,
      default: null,
    },
    counterColor: {
      type: String,
      default: 'primary darken-2',
    },
    height: {
      type: [Number, String],
      default: '100%',
    },
    maxWidth: {
      type: [Number, String],
      default: '100%',
    },
    menuPermissions: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    titleBarColor: {
      type: String,
      default: 'grey darken-1',
    },
    titleBarHeight: {
      type: Number,
      default: 48,
    },
    titleTextColor: {
      type: String,
      default: 'white',
    },
    outlined: {
      type: Boolean,
      deefault: false,
    },
  },
  data() {
    return {
      isNil,
    }
  },
  computed: {
    showActions() {
      return !!this.$slots['actions']
    },
    showMenu() {
      return this.menuPermissions && !!this.$slots['menuItems']
    },
    titleBarClass() {
      return `${this.titleBarColor} ${this.titleTextColor}--text`
    },
  },
}
</script>
