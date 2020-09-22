<template>
  <div id="app">
    <svg-sld :system="system" :sld-configuration="sldCfg">
      <template v-slot:component="slotProps">
        <sld-component
            :x="slotProps.x"
            :y="slotProps.y"
            :type="slotProps.component.type"
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
import SldComponent from './SldComponent.vue';

interface TestComponent {
  type: string;
}

export default Vue.extend({
  name: 'ServeDev',
  components: {
    SvgSld,
    SldComponent
  },
  data() {
    return {
      sldCfg: {
        switchboardThickness: 5
      },
      system: {
        switchboards: [
          {
            consumers: [
              {
                components: [
                  {
                    type: 'DCAC'
                  },
                  {
                    type: 'Motor'
                  },
                  {
                    type: 'ConsumerText',
                    text: 'Propeller'
                  }
                ]
              },{
                components: [
                  {
                    type: 'DCAC'
                  },
                  {
                    type: 'ConsumerText',
                    text: 'Hotel'
                  }
                ]
              }
            ],
            producers: [
              {
                components: [
                  {
                    type: 'ACDC'
                  },
                  {
                    type: 'Generator'
                  },
                  {
                    type: 'Engine'
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
                    type: 'DCAC'
                  },
                  {
                    type: 'Motor'
                  },
                  {
                    type: 'ConsumerText',
                    text: 'Propeller'
                  }
                ]
              }
            ],
            producers: [
              {
                components: [
                  {
                    type: 'ACDC'
                  },
                  {
                    type: 'Generator'
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
                    type: 'DCAC'
                  },
                  {
                    type: 'Motor'
                  },
                  {
                    type: 'ConsumerText',
                    text: 'Propeller'
                  }
                ]
              },
              {
                components: [
                  {
                    type: 'DCAC'
                  },
                  {
                    type: 'ConsumerText',
                    text: 'Hotel'
                  }
                ]
              }
            ],
            producers: [
              {
                components: [
{
                    type: 'ACDC'
                  },
                  {
                    type: 'Generator'
                  },
                  {
                    type: 'Engine'
                  }
                ]
              }
            ]
          },
          {
            producers: [],
            consumers: []
          }
        ]
      } as SldSystem<TestComponent>
    };
  },
  methods: {
    onLeftClick: function (e: TestComponent) {
      console.log('Left click', e.type);
    }
  }
});
</script>


