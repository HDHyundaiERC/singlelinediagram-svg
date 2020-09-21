Main component for Single line diagram

Uses HorizontalGroup-mixins, which defines:
- viewBox
- width
- height
- xComponents: number[] x position of each subElement
- updateSize(): listens to size change of subElements
- emitSize(): emit size of this component to parent component.

<template>
  <svg
      :viewBox="viewBox"
      :width="width + 'mm'"
      :height="height + 'mm'"
      xmlns="http://www.w3.org/2000/svg"
      class="single-line-diagram"
  >
    <svg-switchboard
        v-for="(group, index) of subElements"
        :key="index"
        :x="xComponentsWithSpace[index]"
        :y="yPosition[index]"
        :switchboard="group"
        :sld-configuration="sldConfiguration"
        @update-size="updateSize(index, $event)"
        @update-switchboard-y="updateVAlignment(index, $event)"
    >
      <template v-slot:component="slotProp">
        <slot
            name="component"
            :x="slotProp.x"
            :y="slotProp.y"
            :component="slotProp.component"
            :updatesize="slotProp.updatesize"
        ></slot>
      </template>
    </svg-switchboard>
  </svg>
</template>

<script lang="ts">
import { HorizontalGroup } from '@/mixins/Group';
import SvgSwitchboard from '@/lib-components/SvgSwitchboard.vue';

import Vue from 'vue';

export default Vue.extend({
  name: 'SvgSld',
  mixins: [HorizontalGroup],
  components: { SvgSwitchboard },
  props: {
    x: Number,
    y: Number,
    system: { type: Object },
    sldConfiguration: { type: Object, required: true}
  },
  data: function () {
    return {
      ySwitchboardPosition: [] as number[],
      yPosition: [] as number[]
    }
  },
  computed: {
    subElements() {
      // @ts-ignore
      return this.system.switchboards;
    },
    height() {
      let maxHeight = 0;
      // @ts-ignore
      for (const i of Object.keys(this.sizes)) {
        // @ts-ignore
        maxHeight = Math.max(maxHeight, this.sizes[i].height + this.yPosition[i])
      }
      return maxHeight;
    },
    xComponentsWithSpace() {
      return this.xComponents.map((x, i) => {
        return x + this.sldConfiguration.xSpacingBetweenSwitchboards*i
      })
    },
    width: function(): number {
      return Object.values(this.sizes).reduce(
        (sumWidth, size, index) => {
          let width = size.width;
          if (index > 0) {
            width += this.sldConfiguration.xSpacingBetweenSwitchboards;
          }
          return sumWidth + width
        },
        0
      );
    }
  },
  methods: {
    updateVAlignment: function (index: number, event: number) {
      this.ySwitchboardPosition[index] = event;
      const yMax = Math.max(...this.ySwitchboardPosition)
      this.yPosition = this.ySwitchboardPosition.map(v => (yMax - v));
    }
  }
})

</script>
