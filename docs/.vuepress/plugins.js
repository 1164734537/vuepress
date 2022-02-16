const plugins = [
    [
     'vuepress-plugin-sponsor',//打赏插件
     {
       theme: 'simple',
       alipay: '/zfb_pay.jpg',
       wechat: '/wx_pay.jpg',
       qq: '',
       paypal: '',
       duration: 2000
     }
   ],
  //  ["@vuepress-yard/vuepress-plugin-window",{
  //   title: "uncle陈の公告",  //vuepress公告插件 先安装在配置 npm install @vuepress-yard/vuepress-plugin-window --save
  //   windowStyle:{
  //       right:'40px',
  //       top:'70px',
  //       width:'320px'
  //   },
  //   contentInfo: {
  //     title: "关注陈叔叔公众号解锁文章 🎉🎉🎉",
  //     needImg: true,
  //     imgUrl: "/ewm.jpg",
  //   },
  //   bottomInfo: {
  //       btnText: '赞赏',
  //       linkTo: '/blogs/Reward/'
  //   },
  //   delayMount:500,
  //   closeOnce: false
  // }],
  [
    '@vuepress/back-to-top' //回到顶部插件
  ],
  [
    '@vuepress/pwa',
    {
      serviceWorker: true,
      updatePopup: true,
    }
  ],
  // 支持中文文件名
  [
    "permalink-pinyin",
    {
      lowercase: true, // Converted into lowercase, default: true
      separator: "-", // Separator of the slug, default: '-'
    },
  ],
  // 分页插件
  ["@vuepress-reco/vuepress-plugin-pagation", {}],
  // 代码复制插件
  ['vuepress-plugin-code-copy', true],
  ['reading-progress',
    {
      readingDir: 'blogs'
    }
  ]
]

module.exports = plugins