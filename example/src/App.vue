<template>
  <div id="app">
    <SldDemo/>
  </div>
</template>

<script>

import SldDemo from "@/components/SldDemo";

export default {
  name: 'App',
  components: {
    SldDemo
  }
}
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
