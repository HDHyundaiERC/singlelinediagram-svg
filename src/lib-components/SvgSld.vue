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
import { HorizontalGroup } from '@/mixins/Group';
import SvgSwitchboard from '@/lib-components/SvgSwitchboard.vue';

import Vue from 'vue';

export default Vue.extend({
  name: 'SvgSld',
  mixins: [HorizontalGroup],
  components: { SvgSwitchboard },
  props: { x: Number, y: Number, system: { type: Object } },
  computed: {
    subElements() {
      // @ts-ignore
      return this.system.switchboards;
    }
  }
})

</script>
