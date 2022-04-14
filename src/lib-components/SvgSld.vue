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
          :switchboard-index="index"
          :sld-configuration="sldConfiguration"
          @update-size="updateSize(index*2, $event)"
          @update-switchboard-y="updateVAlignment(index*2, $event)"
          @add-producer="addProducer"
          @add-consumer="addConsumer"
          @delete-switchboard="deleteSwitchboard"
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
              :group-index="slotProp.data.groupIndex"
              :switchboard-index="slotProp.data.switchboardIndex"
          ></slot>
        </template>
      </svg-switchboard>
      <breaker
          v-if="index !== system.switchboards.length - 1"
          @update-size="updateSize(index*2 + 1, $event)"
          :x="xComponents[index*2 + 1]"
          :y="yPosition[index*2 + 1]"
          :open="busTieBreakersOpen"
          :hide-breakers="hideBreaker"
          @update-switchboard-y="updateVAlignment(index*2 + 1, $event)"
      />
    </g>
    <SvgButton :x-right="width"
               :yTop="yPosition[nSubElements] ? yPosition[nSubElements] - buttonSize.height/2 : 0"
               icon="plus" :show="true"
               v-if="sldConfiguration.showAddButtons"
               @click="addSwitchboard"/>
  </svg>
</template>

<script lang="ts">
import { HorizontalGroup } from '@/mixins/Group';
import SvgSwitchboard from '@/lib-components/SvgSwitchboard.vue';
import mixins from 'vue-typed-mixins';

import Breaker from '@/lib-components/breaker.vue';
import SvgButton from '@/lib-components/SvgButton.vue';

export default mixins(HorizontalGroup({})).extend({
  name: 'SvgSld',
  components: { Breaker, SvgSwitchboard, SvgButton },
  props: {
    x: Number,
    y: Number,
    scale: { type: Number, default: .3 },
    system: { type: Object },
    sldConfiguration: { type: Object, required: true },
    hideBreaker: { type: Boolean, default: false }
  },
  data: function () {
    return {
      ySwitchboardPosition: [] as number[],
      yPosition: [] as number[],
      buttonSize: { width: 34, height: 24 }
    }
  },
  computed: {
    nSubElements() {
      const nElem = this.system.switchboards.length * 2 - 1;
      return nElem;
    },
    height() {
      let maxHeight = 0;
      for (const i of Object.keys(this.sizes)) {
        maxHeight = Math.max(maxHeight, this.sizes[i].height + this.yPosition[i])
      }
      return Math.max(maxHeight, this.buttonSize.height);
    },
    width: function (): number {
      return this.sizes.reduce(
          (sumWidth, size) => sumWidth + size.width,
          0
      ) + this.buttonSize.width;
    },
    busTieBreakersOpen(): boolean {
      return this.sldConfiguration.busTieBreakersOpen ?? true;
    }
  },
  methods: {
    updateVAlignment: function (index: number, event: number) {
      // @ts-ignore
      this.ySwitchboardPosition[index] = event;
      // @ts-ignore
      const yMax = Math.max(...this.ySwitchboardPosition, 2*this.buttonSize.height);
      // @ts-ignore
      this.yPosition = this.ySwitchboardPosition.map(v => (yMax - v));
      this.yPosition.push(yMax);
    },
    addProducer(event: any) {
      this.$emit('add-producer', event)
    },
    addConsumer(event: any) {
      this.$emit('add-consumer', event)
    },
    addSwitchboard() {
      this.$emit('add-switchboard');
    },
    deleteSwitchboard(switchboardIndex: number) {
      // First delete size and position information of the switchboard and the attached breaker
      if (switchboardIndex > 0) {
        this.sizes.splice(switchboardIndex * 2 - 1 , 2);
        this.yPosition.splice(switchboardIndex * 2 - 1, 2);
        this.ySwitchboardPosition.splice(switchboardIndex * 2 - 1, 2);
      } else if (this.system.switchboards.length > 1) {
        // Delete only switchboard information if the switchboard to delete is the first one.
        this.sizes.splice(switchboardIndex, 2);
        this.yPosition.splice(switchboardIndex, 2);
        this.ySwitchboardPosition.splice(switchboardIndex, 2);
      } else {
        this.updateVAlignment(0, this.buttonSize.height)
      }
      this.$emit('delete-switchboard', switchboardIndex);
    }
  }
})

</script>
