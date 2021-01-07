<template>
  <svg
      :x="x"
      :y="y"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      :opacity="show ? 1 : 0"
      @click="onClick"
  >
    <g v-if="icon === 'delete'">
      <path
          class="svg-button__plus"
          d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
      />
      <circle r="10" cx="12" cy="12" class="svg-button__plus--overlay"/>
    </g>
    <g v-else-if="icon === 'plus'">
      <circle r="10" cx="12" cy="12" fill="white"/>
      <path
          class="svg-button__plus"
          d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
      />
      <circle r="10" cx="12" cy="12" class="svg-button__plus--overlay"/>
    </g>
  </svg>
</template>
<script lang="ts">


import Vue from 'vue'

export const BUTTON_HEIGHT = 24;
export const BUTTON_WIDTH = 24;

export default Vue.extend({
  name: 'svg-button',
  props: {
    show: { type: Boolean, required: true },
    icon: { type: String, required: true },
    xLeft: { type: Number, required: false },
    xRight: { type: Number, required: false },
    yTop: { type: Number, required: false },
    yBottom: { type: Number, required: false }
  },
  computed: {
    y(): number {
      if (this.yTop !== undefined) {
        return this.yTop;
      } else if (this.yBottom !== undefined) {
        return this.yBottom - BUTTON_HEIGHT;
      } else {
        return 0;
      }
    },
    x(): number {
      if (this.xLeft !== undefined) {
        return this.xLeft;
      } else if (this.xRight !== undefined) {
        return this.xRight - BUTTON_WIDTH;
      } else {
        return 0;
      }
    }
  },
  methods: {
    onClick(event: Event) {
      event.stopPropagation();
      this.$emit('click', event);
    }
  }
})
</script>
<style>
.svg-button__plus {
  fill: #003c65;
}

.svg-button__plus--overlay {
  opacity: 0;
  fill: white;
}

.svg-button__plus--overlay:hover {
  opacity: 0.08;
  cursor: pointer;
}

.svg-button__plus--overlay:active {
  opacity: 0.24;
}
</style>
