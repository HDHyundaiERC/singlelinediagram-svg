Vertical component group.

Using mixin VerticalGroup

<template>
  <svg :viewBox="viewBox" :x="x" :y="y" :height="height" :width="width">
    <rect :opacity="group.backgroundColor ? 1 : 0" :fill="group.backgroundColor" y="0"
          x="0" rx="10" ry="10" :width="width" :height="height"/>
    <g v-for="(component, index) of subElements" v-bind:key="index">
      <slot
          name="component"
          :x="xPosition[index]"
          :y="yComponents[index]"
          :component="component"
          :group="group.components"
          :index="reverseOrder ? (group.components.length - 1 - index): index"
          :group-index="groupIndex"
          :switchboard-index="switchboardIndex"
          :above-switchboard="reverseOrder"
          :updatesize="e => updateSize(index, e)"
          :delete="() => onDelete(index)"
      ></slot>
    </g>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue';

import { VerticalGroup } from '@/mixins/Group';

export default Vue.extend({
  name: 'SvgGroup',
  mixins: [VerticalGroup({minHeight:24})],
  props: {
    x: Number,
    y: Number,
    group: { type: Object, required: true },
    reverseOrder: { type: Boolean, default: false },
    switchboardIndex: {type: Number, required: true},
    groupIndex: {type: Number, required: true}
  },
  computed: {
    nSubElements() {
      // @ts-ignore
      return this.group.components.length;
    },
    subElements() {
      let subElements = this.group.components;
      if (this.reverseOrder)
        return [...subElements].reverse()
      else
        return subElements
    },
    xPosition() {
      // @ts-ignore this.sizes is from VerticalGroup
      const widths: number[] = this.sizes.map(v => v.width)
      const widthMax = Math.max(0, ...widths)
      return widths.map(width => (widthMax - width) / 2)
    }
  },
  methods: {
    onDelete(index: number) {
      // @ts-ignore this.sizes is from VerticalGroup
      this.sizes.splice(index, 1)
      const elementIndex = this.reverseOrder ? (this.group.components.length - 1 - index): index;
      this.group.components.splice(elementIndex, 1);
      // @ts-ignore this.emitSize is from VerticalGroup
      this.emitSize()
    }
  }
})
</script>
