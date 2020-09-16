import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: {
    format: "esm",
    file: "dist/svg-sld.js",
    sourcemap: true
  },
  external: ["vue", "vue-property-decorator"],
  plugins: [typescript({}), vue()]
};
