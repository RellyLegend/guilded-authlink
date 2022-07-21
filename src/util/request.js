const fetch = require("node-fetch");

const BASE = 'https://authlink.guildedapi.com/api/v1';

async function request(method, path, props = {}) {
    const headers = {}

    let body = undefined;
    if (props.json) {
        body = JSON.stringify(props.json)
        headers['Content-Type'] = 'application/json'
    } else if (props.data) {
        body = props.data
    }

    if (props.headers) {
        Object.assign(headers, props.headers)
    }

    const url = new URL(BASE + path)

    if (props.params) {
        for (const key of Object.keys(props.params)) {
            url.searchParams.append(key, props.params[key])
        }
    }

    const response = await fetch(url, {
        method,
        body,
        headers,
    })
    if (response.status == 204) {
        return {}
    }
    if (response.headers.get('Content-Type') == 'application/json') {
        return await response.json()
    }
    return await response.data()
}

module.exports = request;
