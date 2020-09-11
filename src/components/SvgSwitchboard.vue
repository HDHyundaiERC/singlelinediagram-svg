<template>
  <svg :viewBox="viewBox" :x="x" :y="y" :height="height" :width="width">
    <rect x="0" y="0" :width="width" :height="height" fill="black" />
  </svg>
</template>
<script lang="ts">
export default {
  name: 'svg-switchboard',
  props: { x: Number, y: Number, width: Number },
  data: function() {
    return { height: 5 };
  },
  computed: {
    viewBox: function(): string {
      return `0 0 ${this.width} ${this.height}`;
    }
  }
};
</script>

