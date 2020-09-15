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
  props: {
    x: { type: Number },
    y: { type: Number },
    color: { type: String, default: "black" }
  },
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
    this.emmitSize();
  },
  methods: {
    resize: function() {
      this.width *= 1.1;
      this.emmitSize();
    },
    emmitSize: function() {
      this.$emit("update-size", {
        width: this.width,
        height: this.height
      });
    }
  }
});
</script>
