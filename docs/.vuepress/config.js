const head = require("./head");
const plugins = require("./plugins");
const themeConfig = require("./themeConfig");
module.exports = {
        title:"Uncle Chen's Blog",
        description:'万丈高楼平地起，地基还得自己起',
        head,
        theme: 'reco',
        themeConfig,
        plugins,
        serviceWorker: true,
    }  