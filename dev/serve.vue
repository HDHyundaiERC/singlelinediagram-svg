<template>
  <div id="app">
    <svg-sld :system="system" :sld-configuration="sldCfg">
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
      sldCfg: {
        xSpacingBetweenSwitchboards: 10,
        switchboardThickness: 2
      },
      system: {
        switchboards: [
          {
            consumers: [
              {
                components: [
                  {
                    color: 'red'
                  },
                  {
                    color: 'yellow'
                  }
                ]
              }
            ],
            producers: [
              {
                components: [
                  {
                    color: 'green'
                  },
                  {
                    color: 'blue'
                  }
                ]
              },
              {
                components: [
                  {
                    color: 'green'
                  }
                ]
              }
            ]
          },
          {
            consumers: [
              {
                components: [
                  {
                    color: 'red'
                  },
                  {
                    color: 'yellow'
                  }
                ]
              }
            ],
            producers: [
              {}
            ]
          },
          {
            consumers: [
              {
                components: [
                  {
                    color: 'red'
                  },
                  {
                    color: 'yellow'
                  },
                  {
                    color: 'green'
                  }
                ]
              }
            ],
            producers: [
              {
                components: [

                  {
                    color: 'blue'
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
    onLeftClick: function (e: TestComponent) {
      console.log('Left click', e.color);
    }
  }
});
</script>


