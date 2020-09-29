<template>
  <svg
    :viewBox="viewBox"
    :x="x"
    :y="y"
    :height="height"
    :width="width"
  >
    <line :x1="width/2" :x2="width/2" y1="0" y2="30" stroke="black" stroke-width="4"/>
    <text :x="width/2" y="60" text-anchor="middle" font-size="30">{{text}}</text>
  </svg>
</template>
<script lang="js">
import Vue from "vue";

export default Vue.extend({
  name: "consumer-text-component",
  props: {
    x: { type: Number },
    y: { type: Number },
    text: { type: String }
  },
  data: function() {
    return {
      height: 90,
      width: 120
    };
  },
  computed: {
    viewBox: function() {
      return `0 0 ${this.width} ${this.height}`;
    }
  },
  mounted() {
    this.$emit("update-size", {
        width: this.width,
        height: this.height
      });
  }
});
</script>
