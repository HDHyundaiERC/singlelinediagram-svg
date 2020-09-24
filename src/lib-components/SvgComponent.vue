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
<script lang="ts">
import Vue from "vue";
import Generator from "@/lib-components/component-symbols/generator.svg"
import Engine from "@/lib-components/component-symbols/engine.svg"
import ACDC from "@/lib-components/component-symbols/acdc.svg"
import DCAC from "@/lib-components/component-symbols/dcac.svg"
import Motor from "@/lib-components/component-symbols/motor.svg"

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
    viewBox: function(): string {
      return `0 0 ${this.width} ${this.height}`;
    }
  },

  mounted() {
    const svg = this.$refs.svg as SVGElement | undefined;
    // @ts-ignore
    if (svg !== undefined && svg.width !== undefined) {
      // @ts-ignore
      this.width = svg.width.baseVal.value;
      // @ts-ignore
      this.height = svg.height.baseVal.value;
    }
    this.$emit("update-size", {
        width: this.width,
        height: this.height
      });
  },
});
</script>
