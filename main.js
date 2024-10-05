const md5 = require('js-md5'); 
const crypto = require('crypto');
const { login, pause } = require("./api/auth");

const Secrets = {
    username: process.env.LEISHEN_USERNAME,
    password: md5(process.env.LEISHEN_PASSWORD)
};

async function start(username, password) {
    console.log('🌀雷神加速器暂停助手 开始运行-------');

    if (!username || !password) {
        console.log("Empty username or password");
        return;
    }

    const user = buildUser(username, password);
    const signedUser = sign(user);

    try {
        const loginResponse = await login(signedUser);
        handleLoginResponse(loginResponse);
    } catch (err) {
        console.error('Login failed:', err.message);
    }

    console.log('🌀雷神加速器暂停助手 结束运行-------');
}

function buildUser(username, password) {
    return {
        country_code: 86,
        lang: "zh_CN",
        mobile_num: username,
        os_type: 4,
        password: Secrets.password,
        region_code: 1,
        user_type: "0",
        src_channel: "guanwang",
        username
    };
}

function sign(data) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const userData = { ts: timestamp, ...data };
    const sortedKeys = Object.keys(userData).sort();
    const sortedData = sortedKeys.reduce((acc, key) => ({ ...acc, [key]: userData[key] }), {});
    const query = queryString({ ...sortedData, key: "5C5A639C20665313622F51E93E3F2783" }, false);
    const signature = hexMD5(query);

    console.log("signature", signature);
    return { ...data, ts: timestamp, sign: signature };
}

function queryString(data, encode = true) {
    return Object.entries(data)
        .map(([key, value]) => `${key}=${encode ? encodeURIComponent(value) : value}`)
        .join("&");
}

function hexMD5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

async function handleLoginResponse(res) {
    if (res.data.code === 0) {
        const account_token = res.data.data.login_info.account_token;
        try {
            const pauseResponse = await pause({ account_token, lang: "zh_CN" });
            console.log(`${pauseResponse.data.code}: ${pauseResponse.data.msg}`);
            console.log('🌀雷神加速器暂停助手 成功-------');
        } catch (err) {
            console.error('Pause failed:', err.message);
        }
    } else {
        console.log('🌀雷神加速器暂停助手 失败-------');
    }
}

start(Secrets.username, Secrets.password);
