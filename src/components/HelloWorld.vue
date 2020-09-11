<template>
  <div class="hello">
    <svg-sld></svg-sld>
  </div>
</template>

<script>
import SvgSld from "@/components/SvgSld";
export default {
  name: 'HelloWorld',
  components: {SvgSld},
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
