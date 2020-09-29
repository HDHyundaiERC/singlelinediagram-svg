# Single line diagram svg
This is a vue component library used to draw and create single line diagrams.

## Demo
To show a demo open example folder. Run `yarn install` and `yarn run serve` to run it.

## Usage
To install the following line to dependencies in package.json:

`"singlelinediagram-svg": "git+ssh://git@git.code.sintef.no/mes/singlelinediagram-svg.git#4d9ae16e27ca70e88e7e407384c9f5c7aadcaff4",`

Include a sld by:

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

Note that `<sld-component/>` is not provided by this package and must be provided by the user.
This component renders each node in the single line diagram.

To use the `sld-component` from the example app, do the following to support importing of SVGs:
1. Install `vue-svg-loader`
2. Add to `vue.config.js`
    
        module.exports = {
            chainWebpack: (config) => {
                const svgRule = config.module.rule('svg');
            
                svgRule.uses.clear();
            
                svgRule
                  .use('babel-loader')
                  .loader('babel-loader')
                  .end()
                  .use('vue-svg-loader')
                  .loader('vue-svg-loader');
            },
        };
