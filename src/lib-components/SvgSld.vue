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
    <g v-for="(group, index) of system.switchboards"
       :key="index">
      <svg-switchboard

          :x="xComponents[index*2]"
          :y="yPosition[index*2]"
          :switchboard="group"
          :sld-configuration="sldConfiguration"
          @update-size="updateSize(index*2, $event)"
          @update-switchboard-y="updateVAlignment(index*2, $event)"
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
      <breaker @update-size="updateSize(index*2 + 1, $event)"
               :x="xComponents[index*2 + 1]"
               :y="yPosition[index*2 + 1]"
               @update-switchboard-y="updateVAlignment(index*2 + 1, $event)"
      />
    </g>
  </svg>
</template>

<script lang="ts">
import { HorizontalGroup } from '@/mixins/Group';
import SvgSwitchboard from '@/lib-components/SvgSwitchboard.vue';

import Vue from 'vue';
import Breaker from '@/lib-components/breaker.vue';

export default Vue.extend({
  name: 'SvgSld',
  mixins: [HorizontalGroup],
  components: { Breaker, SvgSwitchboard },
  props: {
    x: Number,
    y: Number,
    system: { type: Object },
    sldConfiguration: { type: Object, required: true }
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
      return [[],[],[],[],[],[]];
    },
    height() {
      let maxHeight = 0;
      // @ts-ignore
      for (const i of Object.keys(this.sizes)) {
        // @ts-ignore
        maxHeight = Math.max(maxHeight, this.sizes[i].height + this.yPosition[i])
      }
      return maxHeight;
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
