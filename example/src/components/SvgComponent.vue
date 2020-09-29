<template>
  <svg
    :viewBox="viewBox"
    :x="x"
    :y="y"
    :height="height"
    :width="width"
  >
    <svg :is="componentData.type" ref="svg"/>
  </svg>
</template>
<script lang="js">
import Vue from "vue";
import Generator from "singlelinediagram-svg/src/lib-components/component-symbols/generator.svg"
import Engine from "singlelinediagram-svg/src/lib-components/component-symbols/engine.svg"
import ACDC from "singlelinediagram-svg/src/lib-components/component-symbols/acdc.svg"
import DCAC from "singlelinediagram-svg/src/lib-components/component-symbols/dcac.svg"
import Motor from "singlelinediagram-svg/src/lib-components/component-symbols/motor.svg"

export default Vue.extend({
  name: "svg-component",
  components: {Generator, Engine, ACDC, DCAC, Motor},
  props: {
    x: { type: Number },
    y: { type: Number },
    componentData: {type: Object, required: true}
  },
  data: function() {
    return {
      height: 0,
      width: 0
    };
  },
  computed: {
    viewBox: function() {
      return `0 0 ${this.width} ${this.height}`;
    }
  },

  mounted() {
    const svg = this.$refs.svg;
    if (svg !== undefined && svg.width !== undefined) {
      this.width = svg.width.baseVal.value;
      this.height = svg.height.baseVal.value;
    }
    this.$emit("update-size", {
        width: this.width,
        height: this.height
      });
  },
});
</script>
