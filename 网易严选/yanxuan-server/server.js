const express = require('express');
const api = require('./api');
const url = require('url');
const { JSDOM } = require("jsdom");
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');
const Mock = require('mockjs');


const app = express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
})



app.use(bodyParser());

app.post(api.REGIESTER_URL, (req, res) => {
    console.log('得到注册请求')
    let { username, password } = req.body;
    if (username && password) {
        //注册
        let userData = require('./data/user.json');

        let index = userData.findIndex(item => {
            return item.username === username
        })
        if (index >= 0) {
            res.json({
                message: '该用户已存在',
                status: 2,
                data: null
            })
        } else {
            userInfo = Mock.mock({
                username,
                password,
                'headerImg|1': require('./data/imgs.json').headerImgs
            })
            userData.push(userInfo);
            fs.writeFileSync('./data/user.json', JSON.stringify(userData), () => { });
            res.json({
                message: '注册成功',
                status: 0,
                data: null
            })
        }
    }
    else {
        res.json({
            message: '参数不能为空',
            status: 1,
            data: null
        })
    }
})

app.post(api.LOGIN_URL, (req, res) => {
    let { username, password } = req.body;
    if (username && password) {
        let userData = require('./data/user.json');
        let user = userData.find(item => {
            return item.username == username && item.password == password;
        })
        if (user) {
            user.token = 'fajldkfjouy312uhayf787fasfgbh';
            res.json({
                status: 0,
                message: 'ok',
                data: user
            });
        } else {
            res.json({
                status: 2,
                message: '用户名或密码错误',
                data: null
            });
        }
    } else {
        res.json({
            message: '参数不能为空',
            status: 1,
            data: null
        })
    }
})

/*
商品总数
*/
app.get(api.GOODS_TOTAL_URL, (req, res) => {
    axios.get('http://m.you.163.com/xhr/search/getTotalNumbersOfProducts.json')
        .then(response => {
            res.json({
                message: 'ok',
                status: 0,
                data: {
                    total: response.data.data
                }
            })
        })
})

//分类列表
app.get(api.CATE_LIST_URL, (req, res) => {
    JSDOM.fromURL("http://m.you.163.com/", { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.cateList
        });
    });
});

// 首页轮播图数据
app.get(api.HOME_BANNER_LIST_URL, (req, res) => {
    JSDOM.fromURL("http://m.you.163.com/", { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.jsonData.focusList
        });
    });
})

// 网易严选协议
app.get(api.POLICY_LIST_URL, (req, res) => {
    JSDOM.fromURL("http://m.you.163.com/", { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.jsonData.policyDescList
        });
    });
})

// 首页分类列表
app.get(api.HOME_CATE_LIST_URL, (req, res) => {
    JSDOM.fromURL("http://m.you.163.com/", { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.jsonData.kingKongModule
        });
    });
})

// 首页活动
app.get(api.HOME_ACTIVITY_URL, (req, res) => {
    JSDOM.fromURL("http://m.you.163.com/", { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.jsonData.bigPromotionModule
        });
    });
})

//品牌制造商直供
app.get(api.HOME_TAG_LIST_URL, (req, res) => {
    JSDOM.fromURL("http://m.you.163.com/", { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.jsonData.tagList
        });
    });
})

//类目热销榜
app.get(api.HOME_CATE_HOT_SELL_URL, (req, res) => {
    JSDOM.fromURL("http://m.you.163.com/", { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.jsonData.categoryHotSellModule
        });
    });
})

// 人气推荐
app.get(api.HOME_POPULAR_LIST_URL, (req, res) => {
    JSDOM.fromURL("http://m.you.163.com/", { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.jsonData.popularItemList
        });
    });
})

// 限时购
app.get(api.HOME_FLASH_SALE_URL, (req, res) => {
    JSDOM.fromURL("http://m.you.163.com/", { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.jsonData.flashSaleModule
        });
    });
})

// 新品首发
app.get(api.HOME_NEW_ITEM_URL, (req, res) => {
    JSDOM.fromURL("http://m.you.163.com/", { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.jsonData.newItemList
        });
    });
})

// 购物指南
app.get(api.HOME_SHOPPING_GUIDE_URL, (req, res) => {
    JSDOM.fromURL("http://m.you.163.com/", { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.jsonData.sceneLightShoppingGuideModule
        });
    });
})

// 推荐列表
app.get(api.HOME_TOP_CATELIST_URL, (req, res) => {
    JSDOM.fromURL("http://m.you.163.com/", { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.jsonData.categoryModule
        });
    });
})

// 分类列表数
app.get(api.HOME_CATE_ITEM_LIST_URL, (req, res) => {
    let { id } = url.parse(req.url, true).query;
    if (!id) {
        res.json({
            status: 1,
            message: '缺少参数',
            data: null
        });
        return;
    }

    JSDOM.fromURL("http://m.you.163.com/item/list?categoryId=" + id, { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: {
                categoryItemList: dom.window.jsonData.categoryItemList,
                currentCategory: dom.window.jsonData.currentCategory
            }
        });
    });
})

// 商品详情 
app.get(api.ITEM_DETAIL_URL, (req, res) => {
    let { id } = url.parse(req.url, true).query;
    if (!id) {
        res.json({
            status: 1,
            message: '缺少参数',
            data: null
        });
        return;
    }

    JSDOM.fromURL("http://m.you.163.com/item/detail?id=" + id, { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.jsonData
        });
    });
})

//分类
app.get(api.CATEGOEY_LIST_URL, (req, res) => {
    JSDOM.fromURL('http://m.you.163.com/item/cateList', { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.ftlData.categoryL1List
        })
    })
})

//分类页面分类列表
app.get(api.CATEGOEY_LIST_GROUP_URL, (req, res) => {
    let categoryId = url.parse(req.url, true).query.categoryId || '1022001';

    JSDOM.fromURL('http://m.you.163.com/item/cateList?categoryId=' + categoryId, { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: {
                categoryGroupList: dom.window.ftlData.categoryGroupList,
                currentCategory: dom.window.ftlData.currentCategory
            }
        })
    })
})

// 分类商品列表
app.get(api.CATEGOEY_LIST_GROUP_ITEM_URL, (req, res) => {
    let { categoryId, subCategoryId } = url.parse(req.url, true).query;
    if (!categoryId || !subCategoryId) {
        res.json({
            status: 1,
            message: '缺少参数',
            data: null
        });
        return;
    }

    JSDOM.fromURL('http://m.you.163.com/item/list?categoryId=' + categoryId + '&subCategoryId=' + subCategoryId, { runScripts: 'dangerously' }).then(dom => {
        res.json({
            status: 0,
            message: 'ok',
            data: dom.window.ftlData.categoryItems
        })
    })
})

// 识物tab数据
app.get(api.TOPIC_FIND_TABS_URL, (req, res) => {
    axios.get('http://m.you.163.com/topic/v1/find/getTabs.json')
        .then(response => {
            res.json({
                status: 0,
                message: 'ok',
                data: response.data.data
            })
        })
})

// 识物tab列表数据
// 参数：tabId 默认值为9
app.get(api.TOPIC_FIND_TAB_DATA_URL, (req, res) => {
    let tabId = url.parse(req.url, true).query.tabId || 9;
    //推荐
    if (tabId == 9) {
        axios.get('http://m.you.163.com/topic/v1/find/recManual.json')
            .then(response => {
                let arr = response.data.data;
                let newData = [];
                arr.map(({ topics }) => {
                    newData = [...newData, ...topics];
                })
                res.json({
                    status: 0,
                    message: 'ok',
                    data: {
                        hasMore: false,
                        result: newData
                    }
                })
            })
    }
    //达人   上新   home
    else if (tabId == 4 || tabId == 5 || tabId == 6) {
        let { page, size } = url.parse(req.url, true).query;
        axios.get('http://m.you.163.com/topic/v1/find/getTabData.json', {
            params: {
                page,
                size,
                tabId
            }
        }).then(response => {
            res.json({
                status: 0,
                message: 'ok',
                data: response.data.data
            })
        })
    }
    else {
        res.json({
            message: 'id错误',
            status: 1,
            data: null
        })
    }
})

// 识物tab晒单banner数据
app.get(api.TOPIC_FIND_SHOW_BANNER_URL, (req, res) => {
    axios.get('https://m.you.163.com/topic/v1/look/getCollection.json?id=39')
        .then(response => {
            res.json({
                message: 'ok',
                status: 0,
                data: response.data.data
            })
        })
})

// 识物tab晒单列表数据
app.get(api.TOPIC_FIND_SHOW_DATA_URL, (req, res) => {
    let { page, size, type } = url.parse(req.url, true).query;
    if (!page || !size || !type) {
        res.json({
            message: '缺少参数',
            status: 1,
            data: null
        })
        return;
    }
    if (type != 1 && type != 2 && type != 3) {
        res.json({
            message: 'type参数不正确',
            status: 2,
            data: null
        })
        return;
    }

    axios.get('https://m.you.163.com/topic/v1/look/getList.json', {
        params: {
            page,
            size,
            type
        }
    })
        .then(response => {
            res.json({
                message: 'ok',
                status: 0,
                data: response.data.data
            })
        })
})


// 部署前端页面到服务器上

// 设置静态资源
// app.use('/css', express.static('./www/css'));
// app.use('/js', express.static('./www/js'));
// app.use('/images', express.static('./www/images'));

// // 请求服务器‘/’,显示首页
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/www/index.html');
// });

// // 其他路径请求，还是响应index页面
// app.use('/', (req, res) => {
//     res.sendFile(__dirname + '/www/index.html');
// })



app.listen('9099', 'localhost', (error) => {
    if (error) {
        console.log('启动失败');
        console.log(error);
    } else {
        console.log('启动成功');
    }
});