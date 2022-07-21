const request = require("../util/request");

/**
 * @class AuthlinkClient
 * @classdesc The AuthlinkClient class is used to interact with the Authlink API.
 */
class AuthlinkClient {
    constructor() {
        this.settings = {
            clientId: '',
            clientSecret: '',
            redirectUri: '',
        };
    };

    /**
     * 
     * @param {String} clientId Your Authlink client ID
     * @param {String} clientSecret Your Authlink client secret
     * @param {String} redirectUri The redirect URI for your Authlink client
     */

    setClientId(clientId) {
        this.settings.clientId = clientId;
    };

    setClientSecret(clientSecret) {
        this.settings.clientSecret = clientSecret;
    };

    setRedirectUri(redirectUri) {
        this.settings.redirectUri = redirectUri;
    };

    /**
     * 
     * @param {String} code The authorization code received from Authlink
     * @returns {Promise<Object>} An object containing a fresh new access token and refresh token
     */

    async getAccessCode(code) {
        if (this.settings.clientId === '' || this.settings.clientSecret === '' || this.settings.redirectUri === '') throw new Error(`You must set the client ID, client secret, and redirect URI before you can use the Authlink API.`);
        return await request("POST", "/token", {
            data: new URLSearchParams({
                client_id: this.settings.clientId,
                client_secret: this.settings.clientSecret,
                redirect_uri: this.settings.redirectUri,
                grant_type: "authorization_code",
                code,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    };

    /**
     * 
     * @param {String} refreshToken The authlink refresh token
     * @returns 
     */

    async refreshToken(refreshToken) {
        if (this.settings.clientId === '' || this.settings.clientSecret === '' || this.settings.redirectUri === '') throw new Error(`You must set the client ID, client secret, and redirect URI before you can use the Authlink API.`);
        return await request('POST', '/token', {
            data: new URLSearchParams({
                client_id: this.settings.clientId,
                client_secret: this.settings.clientSecret,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    };

    /**
     * 
     * @param {String} token The access token received from us.
     * @returns 
     */

    async revokeToken(token) {
        if (this.settings.clientId === '' || this.settings.clientSecret === '' || this.settings.redirectUri === '') throw new Error(`You must set the client ID, client secret, and redirect URI before you can use the Authlink API.`);
        return await request('POST', '/token/revoke', {
            data: new URLSearchParams({
                client_id: this.settings.clientId,
                client_secret: this.settings.clientSecret,
                token: token,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    };

    /**
     * 
     * @param {String} accessToken The access token received from us.
     * @returns {Object} An object containing the user data.
     */

    async getUser(accessToken) {
        if (this.settings.clientId === '' || this.settings.clientSecret === '' || this.settings.redirectUri === '') throw new Error(`You must set the client ID, client secret, and redirect URI before you can use the Authlink API.`);
        return await request('GET', '/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    };

    /**
     * 
     * @param {String} accessToken The access token received from us.
     * @returns {Object} An object containing the user's servers data.
     */

    async getUserServers(accessToken) {
        if (this.settings.clientId === '' || this.settings.clientSecret === '' || this.settings.redirectUri === '') throw new Error(`You must set the client ID, client secret, and redirect URI before you can use the Authlink API.`);
        return await request('GET', '/users/@me/servers', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    };

    /**
     * 
     * @param {String} accessToken The access token received from us.
     * @param {String} serverId The server ID to get the user's member data from.
     * @param {Boolean} getPermissions Should we also get the member's permissions on the server?
     * @returns 
     */

    async getUserServerMember(accessToken, serverId, getPermissions=false) {
        if (this.settings.clientId === '' || this.settings.clientSecret === '' || this.settings.redirectUri === '') throw new Error(`You must set the client ID, client secret, and redirect URI before you can use the Authlink API.`);
        return await request('GET', `/users/@me/servers/${serverId}/member`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                getPermissions: String(getPermissions),
            },
        });
    };
}

// Finally, export the AuthlinkClient class.
module.exports = AuthlinkClient;
