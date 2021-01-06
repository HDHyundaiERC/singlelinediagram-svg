Component containing the switchboard with producers, consumers and switchboard line.

Using mixin VerticalGroup

<template>
  <svg
      :viewBox="viewBox"
      :x="x"
      :y="y"
      :width="width"
      :height="height"
      ref="root"
      style="overflow: visible"
      @mouseover="hover = true"
      @mouseout="hover = false"
  >
    <!-- add rect below for hover parameter to work -->
    <rect :opacity="switchboard.backgroundColor ? 1 : 0" :fill="switchboard.backgroundColor" y="0"
          x="0" rx="10" ry="10" :width="width" :height="height"/>
    <svg-horizontal-group
        :x="0"
        :y="yComponents[0]"
        :alignBottom="true"
        :group="switchboard.producers"
        :switchboard-index="switchboardIndex"
        @update-size="updateSize(0, $event)"
    >
      <template v-slot:component="slotProp">
        <slot
            name="component"
            :data="slotProp.data"
        ></slot>
      </template>
    </svg-horizontal-group>
    <svg-switchboard-line
        :width="width"
        :x="0"
        :y="yComponents[1]"
        :thickness="sldConfiguration.switchboardThickness"
        @update-size="updateSize(1, $event)"
    />
    <svg-horizontal-group
        :x="0"
        :y="yComponents[2]"
        :group="switchboard.consumers"
        :switchboard-index="switchboardIndex"
        @update-size="updateSize(2, $event)"
    >
      <template v-slot:component="slotProp">
        <slot
            name="component"
            :data="slotProp.data"
        ></slot>
      </template>
    </svg-horizontal-group>
    <SvgButton :xRight="width" :yBottom="yComponents[1]" icon="plus" :show="hover"
               v-if="sldConfiguration.showAddButtons"
               @click="onAddProducer"/>
    <SvgButton :xRight="width" :yTop="yComponents[1] + sldConfiguration.switchboardThickness"
               icon="plus" :show="hover"
               v-if="sldConfiguration.showAddButtons"
               @click="onAddConsumer"/>
  </svg>
</template>

<script lang="ts">
import { VerticalGroup } from '@/mixins/Group';
import SvgHorizontalGroup from './SvgHorizontalGroup.vue';
import SvgSwitchboardLine from './SvgSwitchboardLine.vue';
import SvgButton from './SvgButton.vue';
import mixins from 'vue-typed-mixins';
import { BUTTON_HEIGHT } from './SvgButton.vue';

const STANDARD_SWITCHBOARD_THICKNESS = 10;

export default mixins(VerticalGroup({ minHeight: BUTTON_HEIGHT * 2 + STANDARD_SWITCHBOARD_THICKNESS })).extend({
  name: 'SvgSwitchboard',
  components: { SvgSwitchboardLine, SvgHorizontalGroup, SvgButton },
  props: {
    x: Number,
    y: Number,
    switchboard: { type: Object, required: true },
    sldConfiguration: { type: Object, required: true },
    switchboardIndex: { type: Number, required: true }
  },
  data: function () {
    return { hover: false };
  },
  computed: {
    nSubElements() {
      return 3;
    }
  },
  methods: {
    emitSize: function () {
      this.$emit('update-size', { width: this.width, height: this.height });
      this.$emit('update-switchboard-y', this.yComponents[1])
    },
    onAddProducer() {
      this.$emit('add-producer', {
        switchboard: this.switchboard,
        switchboardIndex: this.switchboardIndex
      })
    },
    onAddConsumer() {
      this.$emit('add-consumer', {
        switchboard: this.switchboard,
        switchboardIndex: this.switchboardIndex
      })
    }
  }
})
</script>
