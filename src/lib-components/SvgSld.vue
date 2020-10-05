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
      :width="width*scale + 'mm'"
      :height="height*scale + 'mm'"
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
          @add-producer="addProducer"
          @add-consumer="addConsumer"
      >
        <template v-slot:component="slotProp">
          <slot
              name="component"
              :x="slotProp.data.x"
              :y="slotProp.data.y"
              :component="slotProp.data.component"
              :updatesize="slotProp.data.updatesize"
              :above-switchboard="slotProp.data.aboveSwitchboard"
              :group="slotProp.data.group"
              :index="slotProp.data.index"
              :delete="slotProp.data.delete"
          ></slot>
        </template>
      </svg-switchboard>
      <breaker
          v-if="index !== system.switchboards.length - 1"
          @update-size="updateSize(index*2 + 1, $event)"
          :x="xComponents[index*2 + 1]"
          :y="yPosition[index*2 + 1]"
          @update-switchboard-y="updateVAlignment(index*2 + 1, $event)"
      />
    </g>
    <SvgButton :x-right="width" :yTop="yPosition[nSubElements -1 ]-12"
               icon="plus" :show="true"
               v-if="sldConfiguration.showAddButtons"
               @click="addSwitchboard"/>
  </svg>
</template>

<script lang="ts">
import { HorizontalGroup } from '@/mixins/Group';
import SvgSwitchboard from '@/lib-components/SvgSwitchboard.vue';
import mixins from "vue-typed-mixins";

import Breaker from '@/lib-components/breaker.vue';
import SvgButton from '@/lib-components/SvgButton.vue';

export default mixins(HorizontalGroup).extend({
  name: 'SvgSld',
  components: { Breaker, SvgSwitchboard, SvgButton},
  props: {
    x: Number,
    y: Number,
    scale: { type: Number, default: .3 },
    system: { type: Object },
    sldConfiguration: { type: Object, required: true }
  },
  mounted() {
    // Handle button size
    this.updateSize(this.nSubElements - 1, { width: 34, height: 24 })
    this.updateVAlignment(this.nSubElements - 1, 0)
  },
  data: function () {
    return {
      ySwitchboardPosition: [] as number[],
      yPosition: [] as number[]
    }
  },
  computed: {
    nSubElements() {
      return this.system.switchboards.length * 2;
    },
    height() {
      let maxHeight = 0;
      for (const i of Object.keys(this.sizes)) {
        console.log(this.yPosition[i])
        maxHeight = Math.max(maxHeight, this.sizes[i].height + this.yPosition[i])
      }
      return maxHeight;
    }
  },
  methods: {
    updateVAlignment: function (index: number, event: number) {
      // @ts-ignore
      this.ySwitchboardPosition[index] = event;
      // @ts-ignore
      const yMax = Math.max(...this.ySwitchboardPosition)
      // @ts-ignore
      this.yPosition = this.ySwitchboardPosition.map(v => (yMax - v));
    },
    addProducer(event: any) {
      this.$emit('add-producer', event)
    },
    addConsumer(event: any) {
      this.$emit('add-consumer', event)
    },
    addSwitchboard() {
      this.$emit('add-switchboard')
    }
  }
})

</script>
