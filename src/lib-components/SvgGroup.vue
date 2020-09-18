<template>
  <svg :viewBox="viewBox" :x="x" :y="y" :height="height" :width="width">
    <g v-for="(component, index) of subElements" v-bind:key="index">
      <slot
        name="component"
        :x="0"
        :y="yComponents[index]"
        :component="component"
        :updatesize="e => updateSize(index, e)"
      ></slot>
    </g>
  </svg>
</template>
<script lang="ts">
import Vue from "vue";

import { VerticalGroup } from '@/mixins/Group';

export default Vue.extend({
  name: "SvgGroup",
  mixins: [VerticalGroup],
  props: {x: Number,y: Number,group: { type: Object }},
  computed: {
    subElements() {
      // @ts-ignore
      return this.group.components;
    }
  }
})
</script>
