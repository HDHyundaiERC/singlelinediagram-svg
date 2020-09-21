/** Mixins for grouping subElements into component vertical or horizontal

    Defines:
    - viewBox: svg viewbox size
    - width: svg width
    - height: svg width
    - xComponents/yComponents: number[] x/y-position of each subElement
    - updateSize(): listens to size change of subElements
    - emitSize(): emit size of this component to parent component.
 *
 */

import Vue from "vue";
import { ComponentSize } from '@/models';

export const VerticalGroup = Vue.extend({
  data: function() {
    return {
      sizes: {} as { [index: string]: ComponentSize }
    };
  },
  mounted() {
    this.emitSize();
  },
  computed: {
    subElements: function() {
      return [];
    },
    viewBox: function(): string {
      return `0 0 ${this.width} ${this.height}`;
    },
    yComponents: function(): number[] {
      const componentsIds = Object.keys(this.sizes);
      if (componentsIds.length !== this.subElements.length) {
        return this.subElements.map(() => 0);
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
      return Math.max(0,...Object.values(this.sizes).map(size => size.width));
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
      this.emitSize();
    },
    emitSize: function() {
      this.$emit("update-size", { width: this.width, height: this.height });
    }
  }
});

export const HorizontalGroup = Vue.extend({
  data: function() {
    return {
      sizes: {} as { [index: string]: ComponentSize }
    };
  },
  mounted() {
    this.emitSize();
  },
  computed: {
    subElements: function() {
      return [];
    },
    viewBox: function(): string {
      return `0 0 ${this.width} ${this.height}`;
    },
    xComponents: function(): number[] {
      const componentsIds = Object.keys(this.sizes);
      if (componentsIds.length !== this.subElements.length) {
        return this.subElements.map(() => 0);
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
    height: function(): number {
      return Math.max(0,...Object.values(this.sizes).map(size => size.height));
    },
    width: function(): number {
      return Object.values(this.sizes).reduce(
        (sumWidth, size) => sumWidth + size.width,
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
      this.emitSize();
    },
    emitSize: function() {
      this.$emit("update-size", { width: this.width, height: this.height });
    }
  }
});
