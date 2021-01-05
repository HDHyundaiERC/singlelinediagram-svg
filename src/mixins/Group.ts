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

export function VerticalGroup( option: {minHeight?: number, minWidth?: number}) {
  return Vue.extend({
  data: function() {
    return {
      sizes: [] as ComponentSize[]
    };
  },
  mounted() {
    this.emitSize();
  },
  computed: {
    nSubElements: function() {
      return 0;
    },
    viewBox: function(): string {
      return `0 0 ${this.width} ${this.height}`;
    },
    yComponents: function(): number[] {
      if (this.sizes.length !== this.nSubElements) {
        return new Array(this.nSubElements).fill(0);
      }
      let y = 0;
      const yComp = [];
      for (const size of this.sizes) {
        yComp.push(y);
        y += size.height;
      }
      return yComp;
    },
    width: function(): number {
      return Math.max(option.minWidth || 0,...this.sizes.map(size => size.width));
    },
    height: function(): number {
      const height = this.sizes.reduce(
        (sumHeight, size) => sumHeight + size.height,
        0
      );
      return Math.max(height, option.minHeight || 0)
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
});}

export function HorizontalGroup( option: {minHeight?: number, minWidth?: number}) {
  return Vue.extend({
    data: function () {
      return {
        sizes: [] as ComponentSize[]
      };
    },
    mounted() {
      this.emitSize();
    },
    computed: {
      nSubElements: function () {
        return 0;
      },
      viewBox: function (): string {
        return `0 0 ${ this.width } ${ this.height }`;
      },
      xComponents: function (): number[] {
        if (this.sizes.length !== this.nSubElements) {
          return new Array(this.nSubElements).fill(0);
        }
        let x = 0;
        const xComp = [];
        for (const size of this.sizes) {
          xComp.push(x);
          x += size.width;
        }
        return xComp;
      },
      height: function (): number {
        return Math.max(option.minWidth || 0, ...this.sizes.map(size => size.height));
      },
      width: function (): number {
        return this.sizes.reduce(
          (sumWidth, size) => sumWidth + size.width,
          option.minHeight || 0
        );
      }
    },
    methods: {
      updateSize: function (
        index: number,
        size: { width: number; height: number }
      ) {
        Vue.set(this.sizes, index, size);
        this.emitSize();
      },
      emitSize: function () {
        this.$emit("update-size", { width: this.width, height: this.height });
      }
    }
  });
}
