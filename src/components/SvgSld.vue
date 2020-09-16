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
      :x="xComponents[index]"
      :y="0"
      :switchboard="group"
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
    </svg-switchboard>
  </svg>
</template>

<script lang="ts">
import { HorizontalGroup } from "@/mixins/Group";
import SvgSwitchboard from "@/components/SvgSwitchboard.vue";
import { SldSystem } from "@/models";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: { SvgSwitchboard }, mixins: [HorizontalGroup] })
export default class SvgSld<T> extends Vue {
  @Prop({ default: () => 0 }) x!: number;
  @Prop({ default: () => 0 }) y!: number;
  @Prop() system!: SldSystem<T>;

  get subElements() {
    return this.system.switchboards;
  }
}
</script>
