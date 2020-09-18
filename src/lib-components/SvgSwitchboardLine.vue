<template>
  <svg :viewBox="viewBox" :x="x" :y="y" :height="height" :width="width">
    <rect
        x="0"
        y="0"
        :width="width"
        :height="height"
        fill="black"
        stroke="black"
        stroke-width="1"
    />
  </svg>
</template>
<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  name: 'SvgSwitchboardLine',
  props: { x: Number, y: Number, width: Number },
  data() {
    return { height: 4 };
  },
  mounted: function () {
    this.emitSize();
  },
  computed: {
    viewBox(): string {
      return `0 0 ${ this.width } ${ this.height }`;
    }
  },
  methods: {
    emitSize: function () {
      this.$emit('update-size', {
        width: 0,
        height: this.height
      });
    }
  }
})
</script>
