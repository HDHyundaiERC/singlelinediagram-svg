<template>
  <svg :viewBox="viewBox" :x="x" :y="y" :height="height" :width="width">
    <rect
      x="0"
      y="0"
      :width="width"
      :height="height"
      :fill="color"
      stroke="black"
      stroke-width="1"
      @click="resize"
    />
  </svg>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "svg-component",
  props: { x: Number, y: Number, color: String },
  data: function() {
    return {
      height: 25,
      width: 30
    };
  },
  computed: {
    viewBox: function(): string {
      return `0 0 ${this.width} ${this.height}`;
    }
  },
  mounted() {
    this.$emit("update-size", { width: this.width, height: this.height });
  },
  methods: {
    resize: function() {
      this.height *= 1.5;
      this.$emit("update-size", { width: this.width, height: this.height });
    }
  }
});
</script>
