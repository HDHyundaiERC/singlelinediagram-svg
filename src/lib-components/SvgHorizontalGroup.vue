Horizontal group of vertical component group.

For instance consumer groups, where each consumer group is a group of components.

<template>
  <svg :viewBox="viewBox" :x="x" :y="y" :height="height" :width="width">
    <svg-group
        v-for="(g, index) of group"
        :key="index"
        :x="xComponents[index]"
        :y="yPosition[index]"
        :group="g"
        :reverse-order="alignBottom"
        :switchboard-index="switchboardIndex"
        :group-index="index"
        @update-size="updateSize(index, $event)"
    >
      <template v-slot:component="slotProp">
        <slot
            name="component"
            :data="slotProp"
        ></slot>
      </template>
    </svg-group>
  </svg>
</template>
<script lang="ts">
import Vue from 'vue';

import { HorizontalGroup } from '@/mixins/Group';
import SvgGroup from './SvgGroup.vue';


export default Vue.extend({
  name: 'SvgHorizontalGroup',
  mixins: [HorizontalGroup({minHeight: 24, minWidth: 24})],
  components: { SvgGroup },
  props: {
    x: Number,
    y: Number,
    group: { type: Array, required: true},
    switchboardIndex: { type: Number, required: true },
    alignBottom: { type: Boolean, default: false }
  },
  computed: {
    nSubElements() {
      // @ts-ignore
      return this.group.length;
    },
    yPosition() {
      if (this.alignBottom) {
        const heightMax = Math.max(...Object.values(this.sizes).map(v => v.height));
        // @ts-ignore
        return Object.values(this.sizes).map(v => heightMax - v.height)
      } else {
        // @ts-ignore
        return Object.values(this.sizes).map(v => 0)
      }
    }
  }
})


</script>
