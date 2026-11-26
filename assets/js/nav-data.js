/**
 * Bilingual navigation dataset for WebStack.
 * Edit this file to add, update, or reorder categories and site entries.
 *
 * - category.id: stable URL-safe slug for anchor links & scrollspy
 * - category.icon: inline SVG icon key (star, globe, trending, sparkles, compass, wrench, server, play, monitor)
 * - title / desc / name: supports either a plain string or { zh: "...", en: "..." }
 */
window.NAV_DATA = [
  {
    id: 'recommended',
    icon: 'star',
    name: { zh: '常用推荐', en: 'Favorites' },
    items: [
      {
        title: 'Bilibili',
        desc: { zh: '哔哩哔哩 (゜-゜)つロ 干杯~', en: 'Video sharing & ACG community' },
        url: 'https://www.bilibili.com/',
        logo: 'assets/images/logos/bilibili.png'
      },
      {
        title: { zh: '知乎', en: 'Zhihu' },
        desc: { zh: '有问题，就会有答案', en: 'Chinese Q&A and knowledge community' },
        url: 'https://www.zhihu.com/hot',
        logo: 'assets/images/logos/zhihu.png'
      },
      {
        title: { zh: '小红书', en: 'Xiaohongshu' },
        desc: { zh: '分享生活，记录美好', en: 'Lifestyle & discovery platform' },
        url: 'https://www.xiaohongshu.com/',
        logo: 'assets/images/logos/xiaohongshu.png'
      },
      {
        title: { zh: '微信读书', en: 'WeRead' },
        desc: { zh: '让阅读不再孤独', en: 'Social e-book reading platform' },
        url: 'https://weread.qq.com/web/shelf',
        logo: 'assets/images/logos/weread.png'
      },
      {
        title: { zh: 'QQ邮箱', en: 'QQ Mail' },
        desc: { zh: '常联系', en: 'Personal email service' },
        url: 'https://mail.qq.com/',
        logo: 'assets/images/logos/qqmail.png'
      },
      {
        title: { zh: '阿里云', en: 'Alibaba Cloud' },
        desc: { zh: '点击领取2000元限量云产品优惠券', en: 'Cloud computing & infrastructure console' },
        url: 'https://www.aliyun.com/minisite/goods?userCode=xtct5egx&share_source=copy_link',
        logo: 'assets/images/logos/alibabacloud.png'
      },
      {
        title: { zh: '华为云课堂', en: 'Huawei Cloud Edu' },
        desc: { zh: '华为云的在线学习平台', en: 'Huawei Cloud online learning platform' },
        url: 'https://edu.huaweicloud.com/',
        logo: 'assets/images/logos/huawei.png'
      },
      {
        title: { zh: '华为云成长中心', en: 'Huawei Cloud Grow' },
        desc: { zh: '华为云开发者成长中心，做任务赢积分兑换好礼', en: 'Developer growth tasks & rewards hub' },
        url: 'https://grow.developer.huaweicloud.com/',
        logo: 'assets/images/logos/huawei.png'
      },
      {
        title: { zh: '百度网盘青春版', en: 'Baidu Netdisk Youth' },
        desc: { zh: '极速下载、无广告的百度网盘服务', en: 'Ad-free, high-speed personal cloud storage' },
        url: 'https://pan.baidu.com/youth/pan/main',
        logo: 'assets/images/logos/baiduyouth.png'
      }
    ]
  },
  {
    id: 'community',
    icon: 'globe',
    name: { zh: '社区资讯', en: 'Community & News' },
    items: [
      {
        title: 'Linux do',
        desc: { zh: '活跃的互联网社区，以科技为主', en: 'Active tech & developer forum' },
        url: 'https://linux.do/',
        logo: 'assets/images/logos/linuxdo.png'
      },
      {
        title: 'V2EX',
        desc: { zh: '程序猿社区', en: 'Creative developers & tech community' },
        url: 'https://www.v2ex.com/',
        logo: 'assets/images/logos/v2ex.png'
      },
      {
        title: 'NodeSeek',
        desc: { zh: '搞机论坛', en: 'VPS, networking & geek forum' },
        url: 'https://www.nodeseek.com/',
        logo: 'assets/images/logos/nodeseek.png'
      },
      {
        title: 'Perplexity',
        desc: { zh: 'AI 智能搜索引擎与资讯探索平台', en: 'AI-powered search & discovery engine' },
        url: 'https://www.perplexity.ai/discover',
        logo: 'assets/images/logos/perplexity.png'
      },
      {
        title: { zh: '少数派', en: 'sspai' },
        desc: { zh: '高品质数字消费指南', en: 'Digital productivity & software guide' },
        url: 'https://sspai.com/',
        logo: 'assets/images/logos/sspai.png'
      },
      {
        title: 'Hacker News',
        desc: { zh: '科技新闻网站', en: 'Tech & startup news aggregator' },
        url: 'https://news.ycombinator.com/',
        logo: 'assets/images/logos/hackernews.png'
      },
      {
        title: 'XDA Developers',
        desc: { zh: '科技新闻网站', en: 'Mobile hardware & Android tech portal' },
        url: 'https://www.xda-developers.com/',
        logo: 'assets/images/logos/xda.png'
      },
      {
        title: { zh: '一飞周报', en: 'Yifei Weekly' },
        desc: { zh: '美股财经周报', en: 'US equity & macro finance weekly digest' },
        url: 'https://harryyifei.notion.site/a8005aa0030f46519e7aa51e56577ffd?v=4e6fa2e482f24d6b8859b0ca1152795f',
        logo: 'assets/images/logos/mockupworld.png'
      },
      {
        title: { zh: '总统追踪器', en: 'Civic Tracker' },
        desc: { zh: '追踪美国总统动向', en: 'US executive actions & policy tracker' },
        url: 'https://civictracker.us/executive/member/?uuid=3094abf7-4a95-4b8d-8c8d-af7d1c3747a1',
        logo: 'assets/images/logos/president.png'
      }
    ]
  },
  {
    id: 'investing',
    icon: 'trending',
    name: { zh: '投资记录', en: 'Investing' },
    items: [
      {
        title: { zh: '雪球', en: 'Xueqiu' },
        desc: { zh: '聪明的投资者都在这里', en: 'Investor community & market watchlists' },
        url: 'https://xueqiu.com/',
        logo: 'assets/images/logos/xueqiu.png'
      },
      {
        title: { zh: '集思录', en: 'Jisilu' },
        desc: { zh: '以数据为核心的投资社区', en: 'Data-driven arbitrage & fixed-income forum' },
        url: 'https://www.jisilu.cn/',
        logo: 'assets/images/logos/jisilu.png'
      },
      {
        title: 'HaoETF',
        desc: { zh: 'QDII基金实时溢价率与估值', en: 'Real-time QDII ETF premium & valuation' },
        url: 'https://www.haoetf.com/',
        logo: 'assets/images/logos/haoetf.png'
      },
      {
        title: 'History of Market',
        desc: { zh: '市场历史数据与行情复盘', en: 'Historical market data & cycle review' },
        url: 'https://historyofmarket.com/',
        logo: 'assets/images/logos/historyofmarket.png'
      },
      {
        title: { zh: '大道总纲', en: 'Duan Yongping Archive' },
        desc: { zh: '段永平投资问答录与商业思考', en: 'Q&A archive on value investing & business' },
        url: 'https://duan.ayaseeri.com/',
        logo: 'assets/images/logos/dadaozonggang.svg'
      }
    ]
  },
  {
    id: 'ai-workflow',
    icon: 'sparkles',
    name: { zh: 'AI工作流', en: 'AI Workflow' },
    items: [
      {
        title: 'Banana',
        desc: { zh: 'Nano Banana Pro 提示词', en: 'Nano Banana Pro prompt gallery' },
        url: 'https://youmind.com/zh-CN/nano-banana-pro-prompts',
        logo: 'assets/images/logos/banana.png'
      },
      {
        title: 'Gemini',
        desc: { zh: 'Gemini 3 Pro 提示词', en: 'Gemini 3 Pro prompt library' },
        url: 'https://youmind.com/zh-CN/gemini-3-prompts',
        logo: 'assets/images/logos/gemini.png'
      },
      {
        title: { zh: '扣子空间', en: 'Coze Space' },
        desc: { zh: '聘请各行业专家为你解决问题', en: 'Domain-expert AI agents workspace' },
        url: 'https://space.coze.cn/expert',
        logo: 'assets/images/logos/coze.png'
      },
      {
        title: 'NotebookLM',
        desc: { zh: 'NotebookLM 笔记本', en: 'AI-grounded research & audio notebook' },
        url: 'https://notebooklm.google.com/',
        logo: 'assets/images/logos/notebooklm.png'
      }
    ]
  },
  {
    id: 'inspiration',
    icon: 'compass',
    name: { zh: '界面灵感', en: 'Developer & Infra' },
    items: [
      {
        title: 'Cloudflare',
        desc: { zh: 'Cloudflare 官网', en: 'Edge DNS, CDN, Pages & Workers' },
        url: 'https://www.cloudflare.com/',
        logo: 'assets/images/logos/cloudflare.png'
      },
      {
        title: 'GitHub',
        desc: { zh: 'GitHub 官网', en: 'Code hosting, Actions & open source' },
        url: 'https://github.com/',
        logo: 'assets/images/logos/github.png'
      },
      {
        title: { zh: '花云', en: 'FlowerCloud' },
        desc: { zh: '优秀的科学上网（略贵，但是贼稳）', en: 'Reliable proxy & global network tunnel' },
        url: 'https://flowercloud.net/clientarea.php',
        logo: 'assets/images/logos/huacloud.png'
      }
    ]
  },
  {
    id: 'tools',
    icon: 'wrench',
    name: { zh: '在线工具', en: 'Online Tools' },
    items: [
      {
        title: 'TinyPNG',
        desc: { zh: 'PNG图片压缩工具', en: 'Smart WebP, PNG & JPEG compression' },
        url: 'https://tinypng.com/',
        logo: 'assets/images/logos/tinypng-panda.png'
      },
      {
        title: 'Remove.bg',
        desc: { zh: '图片背景去除工具', en: 'Instant image background removal' },
        url: 'https://www.remove.bg/zh',
        logo: 'assets/images/logos/removebg.png'
      },
      {
        title: 'Adobe Acrobat',
        desc: { zh: '在线PDF编辑工具', en: 'Online PDF viewer & editor' },
        url: 'https://acrobat.adobe.com/',
        logo: 'assets/images/logos/acrobat.png'
      },
      {
        title: 'Canva',
        desc: { zh: '在线设计工具', en: 'Online graphic & layout studio' },
        url: 'https://www.canva.com/',
        logo: 'assets/images/logos/canva.png'
      }
    ]
  },
  {
    id: 'self-hosted',
    icon: 'server',
    name: { zh: '自建网站', en: 'Self-Hosted' },
    items: [
      {
        title: "Xcho's Blog",
        desc: { zh: '个人博客与技术分享', en: 'Personal blog & technical notes' },
        url: 'https://555212.xyz/',
        logo: 'assets/images/logos/Coda.png'
      },
      {
        title: 'File Browser',
        desc: { zh: '个人私有云及在线文件管理', en: 'Private cloud & web file manager' },
        url: 'https://file.555212.xyz/',
        logo: 'assets/images/logos/filebrowser.png'
      },
      {
        title: 'Web Check',
        desc: { zh: '全能的网站信息探测分析工具', en: 'All-in-one OSINT & site diagnostics' },
        url: 'https://webcheck.555212.xyz/',
        logo: 'assets/images/logos/webcheck.png'
      },
      {
        title: 'Uptime Kuma',
        desc: { zh: '站点在线状态实时监控检测', en: 'Self-hosted uptime monitoring dashboard' },
        url: 'https://uptime.555212.xyz/dashboard',
        logo: 'assets/images/logos/uptimekuma.png'
      }
    ]
  },
  {
    id: 'media',
    icon: 'play',
    name: { zh: '影音娱乐', en: 'Media' },
    items: [
      {
        title: { zh: '爱壹帆', en: 'Yifan TV' },
        desc: { zh: '海量高清视频免费在线观看', en: 'Online HD streaming & drama library' },
        url: 'https://www.yifan.tv/',
        logo: 'assets/images/logos/yifantv.png'
      }
    ]
  },
  {
    id: 'setup',
    icon: 'monitor',
    name: { zh: '装机工具', en: 'PC Setup' },
    items: [
      {
        title: 'LDTools',
        desc: { zh: '非盈利性工具索引网站，收录各类纯净无捆绑的装机工具', en: 'Clean, bundle-free Windows setup software index' },
        url: 'https://tool.pc.wiki/',
        logo: 'assets/images/logos/ldtools.svg'
      }
    ]
  }
];
