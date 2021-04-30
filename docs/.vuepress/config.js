const nav = require("./nav");
// const sidebar = require("./sidebar")
module.exports = {
    theme: 'reco',
    themeConfig: {
        // sidebarDepth: 2,
        type: 'blog',
        authorAvatar: '/images/avatar.jpg',
        nav,
        sidebar:"auto"
        // subSidebar:"auto",
        // sidebar: [
        //     {
        //         title: '一组题目',
        //         collapsable: false,
        //         children: [
        //             ['/fontend/css/','陈叔叔'], 
        //             '/fontend/js/scope',
        //         ]
        //     },
        //     {
        //         title: '二组题目',
        //         collapsable: false,
        //         children: [
        //             ['/about/','关于'],
        //         ]
        //     },
        //     {
        //         title: '三组题目',
        //         collapsable: false,
        //         children: [
        //             ['/interview/','面试'],
        //         ]
        //     },
        //     {
        //         title: '三组题目',
        //         collapsable: false,
        //         children: [
        //             ['/wechat/cloudev/','云开发'],
        //             ['/wechat/minprogram/','小程序'],
        //         ]
        //     },
        // ]
    }
}