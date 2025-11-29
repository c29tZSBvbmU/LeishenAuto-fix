const axios = require('axios');

const pause_api = axios.create({
    baseURL: process.env.VUE_APP_BASE_API || "https://vip.leigod.com", 
    timeout: 5000 
})

const login_api = axios.create({
    baseURL: process.env.VUE_APP_BASE_API || "https://webapi.leigod.com", 
    timeout: 5000
})

module.exports = {
    pause_api,
    login_api
}