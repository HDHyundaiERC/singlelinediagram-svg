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
  >
    <svg-horizontal-group
        :x="0"
        :y="yComponents[0]"
        :alignBottom="true"
        :group="switchboard.producers"
        @update-size="updateSize(0, $event)"
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
        @update-size="updateSize(2, $event)"
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
    </svg-horizontal-group>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import { VerticalGroup } from '@/mixins/Group';
import SvgHorizontalGroup from './SvgHorizontalGroup.vue';
import SvgSwitchboardLine from './SvgSwitchboardLine.vue';

export default Vue.extend({
  name: 'SvgSwitchboard',
  mixins: [VerticalGroup],
  components: { SvgSwitchboardLine, SvgHorizontalGroup },
  props: {
    x: Number,
    y: Number,
    switchboard: { type: Object },
    sldConfiguration: { type: Object, required: true }
  },
  computed: {
    nSubElements() {
      return 3;
    }
  },
  methods: {
    emitSize: function () {
      // @ts-ignore
      this.$emit('update-size', { width: this.width, height: this.height });
      // @ts-ignore
      this.$emit('update-switchboard-y', this.yComponents[1])
    }
  }
})
</script>
