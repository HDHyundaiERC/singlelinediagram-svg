<template>
  <svg :y="y" :x="x" width="72" height="34" viewBox="0 0 72 34" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="71" height="33" fill="white" stroke="black"/>
    <line v-if="open" x1="56.2577" y1="4.96623" x2="12" y2="17" stroke="black" stroke-width="2"/>
    <line v-else x1="58" y1="17" x2="12" y2="17" stroke="black" stroke-width="2"/>
    <circle cx="58" cy="17" r="3.5" fill="white" stroke="black"/>
    <circle cx="12" cy="17" r="3.5" fill="white" stroke="black"/>
  </svg>
</template>

<script>
export default {
  name: "breaker",
  props: {
    x: {type: Number},
    y: {type: Number},
    open: {type: Boolean, default: true}
  },
  data: function () {
    return {width: 72, height: 34}
  },
  mounted() {
    this.$emit("update-size", {width: this.width, height: this.height});
    this.$emit("update-switchboard-y", this.height / 2);
  }
}
</script>

<style scoped>

</style>