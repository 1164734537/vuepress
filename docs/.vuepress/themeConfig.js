const themeConfig = {
    blogConfig: {
        category: {
            location: 2,     // 在导航栏中的位置在第二个
            text: '分类' // Text default to "Category"
        },
        tag: {
            location: 3,     // 在导航栏中的位置在第三个
            text: '标签'      // Text default to "Tag"
        },
        // socialLinks: [     // Information bar displays social information
        //     // { icon: 'reco-wechat', link: 'https://github.com/recoluan' },
        //     // { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' }
        // ]
    },
    type: 'blog',
    logo: '/logo.jpg',
    authorAvatar: '/logo.jpg',
    subSidebar: 'auto',
    sidebarDepth: 2,
        noFoundPageByTencent: false,
        nav: [
            { text: '主页', link: '/',icon:'reco-home'},
            { text: '回顾', link: '/timeline/', icon:'reco-date'},
            {text:'打赏',link:'/blogs/Reward/', icon:'reco-suggestion'}
          ],
    valineConfig:{
        appId: '3Fzc0HxVWw3ca57z4QTNanzG-gzGzoHsz',
        appKey: 'OR9thMMikeQzBmoX6EnaWH8J'
    }

}
module.exports = themeConfig