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
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class SvgSwitchboardLine extends Vue {
  @Prop() x!: number;
  @Prop() y!: number;
  @Prop() width!: number;
  height = 4;

  mounted() {
    this.emitSize();
  }

  get viewBox(): string {
    return `0 0 ${this.width} ${this.height}`;
  }

  emitSize() {
    this.$emit("update-size", {
      width: 0,
      height: this.height
    });
  }
}
</script>
