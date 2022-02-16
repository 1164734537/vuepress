const head = [
    ['link', {
        rel: 'icon',
        href: '/logo.jpg'
    }],
    ['meta', {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
    }],
    // 添加cnzz统计
    [
        "script",
        {
            src: "https://v1.cnzz.com/z_stat.php?id=1280174405&web_id=1280174405"
        }
    ]
]


module.exports = head