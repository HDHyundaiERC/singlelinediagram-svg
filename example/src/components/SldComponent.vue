<template>
  <svg
      :viewBox="viewBox"
      :x="x"
      :y="y"
      :height="height"
      :width="width"
      @contextmenu.prevent="makeSmaller"
      @click="resize"
  >
    <ConsumerTextComponent :x="0" :y="0" v-if="componentData.type==='ConsumerText'"
                           @update-size="updateSize" :text="componentData.text"
    />
    <SvgComponent v-else :x="0" :y="0" :component-data="componentData"
                  @update-size="updateSize"/>
  </svg>
</template>
<script lang="js">
import Vue from 'vue';
import ConsumerTextComponent from './ConsumerTextComponent.vue'
import SvgComponent from './SvgComponent.vue';

export default Vue.extend({
  name: 'sld-component',
  components: { SvgComponent, ConsumerTextComponent },
  props: {
    x: { type: Number },
    y: { type: Number },
    color: { type: String },
    componentData: { type: Object, required: true }
  },
  data: function () {
    return {
      height: 0,
      width: 0
    };
  },
  computed: {
    viewBox: function () {
      return `0 0 ${ this.width } ${ this.height }`;
    }
  },

  mounted() {
    this.emitSize();
  },
  methods: {
    resize: function () {
      this.width *= 1.1;
      this.emitSize();
    },
    makeSmaller: function () {
      this.$emit('left-click', this.componentData);
    },
    emitSize: function () {
      this.$emit('update-size', {
        width: this.width,
        height: this.height
      });
    },
    updateSize: function (size) {
      this.width = size.width;
      this.height = size.height;
      this.emitSize();
    }
  }
});
</script>

