<template>
  <svg
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
    class="single-line-diagram"
    ref="root"
  >
    <svg-group
      v-for="(group, index) of groups"
      :key="index"
      :x="xComponents[index]"
      :y="0"
      @update-size="updateSize(index, $event)"
    />
  </svg>
</template>

<script lang="ts">
import SvgGroup from "./SvgGroup.vue";
import Vue from "vue";
import { ComponentSize } from "@/models";

export default Vue.extend({
  name: "svg-sld",
  components: { SvgGroup },
  props: { x: Number, y: Number },
  data: function() {
    return {
      sizes: {} as { [index: string]: ComponentSize },
      groups: [{}, {}]
    };
  },
  computed: {
    viewBox: function(): string {
      return `0 0 ${this.width} ${this.height}`;
    },
    xComponents: function(): number[] {
      const componentsIds = Object.keys(this.sizes);
      if (componentsIds.length !== this.groups.length) {
        return this.groups.map(() => 0);
      }
      let x = 0;
      const xComp = [];
      for (const component of componentsIds) {
        const size = this.sizes[component];
        xComp.push(x);
        x += size.width;
      }
      return xComp;
    },
    width: function(): number {
      return Object.values(this.sizes).reduce(
        (oldWidth, size) => Math.max(oldWidth, size.width),
        0
      );
    },
    height: function(): number {
      return Object.values(this.sizes).reduce(
        (sumHeight, size) => sumHeight + size.height,
        0
      );
    }
  },
  methods: {
    updateSize: function(
      index: string,
      size: { width: number; height: number }
    ) {
      Vue.set(this.sizes, index, size);
      this.emmitSize();
    },
    emmitSize: function() {
      this.$emit("update-size", { width: this.width, height: this.height });
    }
  }
});
</script>
<style>
.single-line-diagram {
  height: 10000px;
  width: 10000px;
}
</style>
