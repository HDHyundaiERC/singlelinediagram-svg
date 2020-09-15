<template>
  <svg :viewBox="viewBox" :x="x" :y="y" :height="height" :width="width">
    <template v-for="(component, index) of subElements">
      <g v-bind:key="index">
        <slot
          name="component"
          :x="0"
          :y="yComponents[index]"
          :component="component"
          :updatesize="e => updateSize(index, e)"
        ></slot>
      </g>
    </template>
  </svg>
</template>
<script lang="ts">
import Vue from "vue";

import { VerticalGroup } from "@/mixins/Group";
import { Component, Prop } from "vue-property-decorator";
import { SldComponentGroup } from "@/models";

@Component({ mixins: [VerticalGroup] })
export default class SvgGroup<T> extends Vue {
  @Prop({ default: () => 0 }) x!: number;
  @Prop({ default: () => 0 }) y!: number;
  @Prop() group!: SldComponentGroup<T>;

  get subElements() {
    return this.group.components;
  }
}
</script>
