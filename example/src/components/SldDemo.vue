<template>
  <div id="app">
    <svg-sld :system="system" :sld-configuration="sldCfg"
             @add-producer="onEvent('add-producer', $event)"
             @add-consumer="onEvent('add-consumer', $event)">
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

<script lang="js">
import Vue from 'vue';
import { SvgSld } from 'singlelinediagram-svg';
import SldComponent from './SldComponent.vue';

export default Vue.extend({
  name: 'SldDemo',
  components: {
    SvgSld,
    SldComponent
  },
  methods: {
    onLeftClick: function (e) {
      console.log('Left click', e.type);
    },
    onEvent: function (tag, e) {
      console.log(tag, e);
    }
  },
  data() {
    return {
      sldCfg: {
        switchboardThickness: 5,
        showAddButtons: true
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
      }
    };
  },

});
</script>


