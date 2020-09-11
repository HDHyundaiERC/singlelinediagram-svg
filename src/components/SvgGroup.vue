<template>
  <svg :viewBox="viewBox" :x="x" :y="y" :height="height" :width="width" ref="root">
  </svg>
</template>
<script lang="ts">
import SvgComponent from '@/components/SvgComponent.vue';
import Vue from 'vue'

export default {
  name: 'svg-group',
  props: { x: Number, y: Number },
  data: function () {
    return {
      height: 0, width: 0, components: [
        {
          color: 'green'
        },
        {
          color: 'blue'
        }]
    };
  },
  mounted() {
    const root = this.$refs.root;
    let y = 0;
    let width = 0
    for (const comp of this.components) {
      const ComponentClass = Vue.extend(SvgComponent)
      const component = new ComponentClass({ propsData: { y, x:0, color: comp.color } });
      component.$mount();
      root.appendChild(component.$el);
      y += component.height;
      width = Math.max(width, component.width)
    }
    this.width = width;
    this.height = y;
  },
  computed: {
    viewBox: function (): string {
      return `0 0 ${ this.width } ${ this.height }`;
    }
  }
};
</script>