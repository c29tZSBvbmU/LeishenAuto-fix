md5 = require('js-md5');


const login = require("./api/auth").login;
const pause = require("./api/auth").pause;

const Secrets = {
    username: 15888494126,
    password: md5(KFS15888494126)
}


function start(username, password) {
    console.log('🌀雷神加速器暂停助手 开始运行-------')
    if (!username) {
        console.log("空用户名");
        return;
    }
    if (!password) {
        console.log("空密码");
        return;
    }
    const user = {
        account_token: null,
        country_code: 86,
        lang: "zh_CN",
        password: Secrets.password,
        region_code: 1,
        src_channel: "guanwang",
        user_type: "0",
        username: Secrets.username
    };

    login(user).then(res => {
        if (res.data.code == 0) {
            let account_token = res.data.data.login_info.account_token;
            pause({ "account_token": account_token, "lang": "zh_CN" }).then(res2 => {
                console.log(res2.data.code + ':' + res2.data.msg);
                console.log('🌀雷神加速器暂停助手 成功-------')

            })
        } else {
            console.log('🌀雷神加速器暂停助手 失败-------')
        }
        console.log('🌀雷神加速器暂停助手 结束运行-------')
    })


}


start(Secrets.username, Secrets.password);
