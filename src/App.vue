<template>
  <div id="app">
    <svg-sld :system="system">
      <template v-slot:component="slotProps">
        <svg-component
          :x="slotProps.x"
          :y="slotProps.y"
          :color="slotProps.component.color"
          @update-size="slotProps.updatesize"
        />
      </template>
    </svg-sld>
  </div>
</template>

<script lang="ts">
import SvgSld from "@/components/SvgSld.vue";
import { SldSystem } from "@/models";
import SvgComponent from "@/components/SvgComponent.vue";

interface TestComponent {
  color: string;
}

export default {
  name: "App",
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
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
