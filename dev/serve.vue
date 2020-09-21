<template>
  <div id="app">
    <svg-sld :system="system">
      <template v-slot:component="slotProps">
        <svg-component
          :x="slotProps.x"
          :y="slotProps.y"
          :color="slotProps.component.color"
          :component-data="slotProps.component"
          @update-size="slotProps.updatesize"
          @left-click="onLeftClick"
        />
      </template>
    </svg-sld>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { SvgSld } from '@/entry';
import { SldSystem } from '@/models';
import SvgComponent from './SvgComponent.vue';

interface TestComponent {
  color: string;
}

export default Vue.extend({
  name: 'ServeDev',
  components: {
    SvgSld,
    SvgComponent
  },
  data() {
    return {
      system: {
        switchboards: [
          {
            consumers: [
              {
                components: [
                  {
                    color: "red"
                  },
                  {
                    color: "yellow"
                  }
                ]
              }
            ],
            producers: [
              {
                components: [
                  {
                    color: "green"
                  },
                  {
                    color: "blue"
                  }
                ]
              }
            ]
          }
        ]
      } as SldSystem<TestComponent>
    };
  },
  methods: {
    onLeftClick: function(e: TestComponent) {
      console.log("Left click", e.color);
    }
  }
});
</script>


