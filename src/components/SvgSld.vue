<template>
  <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" class="single-line-diagram"
       ref="root">
  </svg>
</template>

<script lang="ts">
import SvgGroup from './SvgGroup.vue';
import Vue from 'vue';

export default Vue.extend({
  name: 'svg-sld',
  components: { },
  props: { x: Number, y: Number },
  data: function () {
    return { height: 5, width: 10 };
  },
  mounted() {
    const root = this.$refs.root as Element;
    let height = 0;
    let width = 0
    // eslint-disable-next-line no-unused-vars
    for (const _i of [0, 1]) {
      const component = new SvgGroup({ propsData: { y:0, x: width } });
      component.$mount();
      root.appendChild(component.$el);
      height = Math.max(component.height, height);
      width += component.width
    }
    this.width = width;
    this.height = height;
  },
  computed: {
    viewBox: function (): string {
      return `0 0 ${ this.width } ${ this.height }`;
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

