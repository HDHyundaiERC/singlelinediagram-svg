Vertical component group.

Using mixin VerticalGroup

<template>
  <svg :viewBox="viewBox" :x="x" :y="y" :height="height" :width="width">
    <g v-for="(component, index) of subElements" v-bind:key="index">
      <slot
          name="component"
          :x="xPosition[index]"
          :y="yComponents[index]"
          :component="component"
          :updatesize="e => updateSize(index, e)"
      ></slot>
    </g>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue';

import { VerticalGroup } from '@/mixins/Group';

export default Vue.extend({
  name: 'SvgGroup',
  mixins: [VerticalGroup],
  props: {
    x: Number,
    y: Number,
    group: { type: Object },
    reverseOrder: { type: Boolean, default: false }
  },
  computed: {
    nSubElements() {
      // @ts-ignore
      return this.group.components.length;
    },
    subElements() {
      let subElements = this.group.components;
      if (this.reverseOrder)
        return subElements.reverse()
      else
        return subElements
    },
    xPosition() {
      const widths: number[] = Object.values(this.sizes).map(v => v.width)
      const widthMax = Math.max(0, ...widths)
      return widths.map(width => (widthMax - width) / 2)
    }
  }
})
</script>
