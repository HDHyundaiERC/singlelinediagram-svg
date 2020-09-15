<template>
  <svg :viewBox="viewBox" :x="x" :y="y" :height="height" :width="width">
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
import Vue from "vue";

import { HorizontalGroup } from "@/mixins/Group";
import { Component, Prop } from "vue-property-decorator";
import { SldComponentGroup } from "@/models";
import SvgGroup from "@/components/SvgGroup.vue";

@Component({ mixins: [HorizontalGroup], components: { SvgGroup } })
export default class SvgHorizontalGroup<T> extends Vue {
  @Prop({ default: () => 0 }) x!: number;
  @Prop({ default: () => 0 }) y!: number;
  @Prop() group!: SldComponentGroup<T>[];

  get subElements() {
    return this.group;
  }
}
</script>
