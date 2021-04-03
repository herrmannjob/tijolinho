module.exports = {
  pluginOptions: {
    quasar: {
      treeShake: true,
    },
  },
  transpileDependencies: ["vuetify", /[\\\/]node_modules[\\\/]quasar[\\\/]/],
};
