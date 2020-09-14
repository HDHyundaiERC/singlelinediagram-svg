<template>
  <svg
    :viewBox="viewBox"
    :x="x"
    :y="y"
    :height="height"
    :width="width"
    ref="root"
  >
    <svg-component
      ref="child"
      v-for="(component, index) of components"
      :color="component.color"
      v-bind:key="index"
      :x="0"
      :y="yComponents[index]"
      @update-size="updateSize(index, $event)"
    ></svg-component>
  </svg>
</template>
<script lang="ts">
import Vue from "vue";
import SvgComponent from "@/components/SvgComponent.vue";
import { ComponentSize } from "@/models";

export default Vue.extend({
  name: "svg-group",
  props: { x: Number, y: Number },
  components: { SvgComponent },
  data: function() {
    return {
      components: [
        {
          color: "green"
        },
        {
          color: "blue"
        },
        {
          color: "red"
        }
      ],
      sizes: {} as { [index: string]: ComponentSize }
    };
  },
  computed: {
    viewBox: function(): string {
      return `0 0 ${this.width} ${this.height}`;
    },
    yComponents: function(): number[] {
      const componentsIds = Object.keys(this.sizes);
      if (componentsIds.length !== this.components.length) {
        return this.components.map(() => 0);
      }
      let y = 0;
      const yComp = [];
      for (const component of componentsIds) {
        const size = this.sizes[component];
        yComp.push(y);
        y += size.height;
      }
      return yComp;
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
      index: number,
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
