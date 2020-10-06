<template>
  <div id="app">
    <svg-sld :system="system" :sld-configuration="sldCfg"
             @add-producer="onEvent('add-producer', $event)"
             @add-consumer="onEvent('add-consumer', $event)"
            @add-switchboard="addSwitchboard">
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
import { SldConfiguration, SldSystem } from '@/models';
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
  methods: {
    onLeftClick: function (e: TestComponent) {
      console.log('Left click', e.type);
    },
    onEvent: function (tag: string, e: any) {
      console.log(tag, e);
    },
    addSwitchboard: function () {
      this.system.switchboards.push({
        consumers: [],
        producers: []
      })
    }
  },
  data() {
    return {
      sldCfg: {
        switchboardThickness: 5,
        showAddButtons: true
      } as SldConfiguration,
      system: {
        switchboards:[]
      },
      system2: {
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

});
</script>


