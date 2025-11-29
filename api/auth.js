const { pause_api, login_api } = require('../utils/request');

function login(data) {
    return login_api({
        url: '/api/auth/login/v1',
        method: 'post',
        data
    })
}

function pause(data) {
    return pause_api({
        url: '/api/user/pause',
        method: 'post',
        data
    })
}

module.exports = {login, pause}