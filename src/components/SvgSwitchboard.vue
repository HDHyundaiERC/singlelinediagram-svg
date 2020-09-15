<template>
  <svg
    :viewBox="viewBox"
    :x="x"
    :y="y"
    :height="height"
    :width="width"
    ref="root"
  >
    <svg-group
      v-for="(group, index) of subElements"
      :key="index"
      :x="xComponents[index]"
      :y="0"
      :group="group"
      @update-size="updateSize(index, $event)"
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
    </svg-group>
  </svg>
</template>

<script lang="ts">
import SvgGroup from "./SvgGroup.vue";
import Vue from "vue";
import { HorizontalGroup } from "@/mixins/Group";
import { Component, Prop } from "vue-property-decorator";
import { SldSwitchboard } from "@/models";

@Component({ components: { SvgGroup }, mixins: [HorizontalGroup] })
export default class SvgSwitchboard<T> extends Vue {
  @Prop({ default: () => 0 }) x!: number;
  @Prop({ default: () => 0 }) y!: number;
  @Prop() switchboard!: SldSwitchboard<T>;

  get subElements() {
    return this.switchboard.producers;
  }
}
</script>
<style>
.single-line-diagram {
  height: 10000px;
  width: 10000px;
}
</style>
