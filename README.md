# Guilded Authlink
A new way to make OAuth requests to the authlink API for easier guilded login actions.

## Basic Code
A simple setup for your authlink client!
```js
const Authlink = require('guilded-authlink');
const authClient = new Authlink();

// Set the client's credentials
authClient.setClientId('123456789');
authClient.setClientSecret('123456789');
authClient.setRedirectUri('https://example.com/authlink');

// Export the client for use in your routes or elsewhere files.
module.exports = authClient;
```

And there you have it, a simple authlink client!

# Docs

`getAccessCode` - Get the access token after returning a authorization code from authlink.
Example:
```js
const code = "super-awesome-code";
const data = await <AuthlinkClient>.getAccessCode(code);
console.log(`Here is my super awesome access token: ${data.accessToken}`);
```

`refreshToken` - Get a new access token after the current one has expired.
Example:
```js
const refreshToken = "super-awesome-refresh-token";
const data = await <AuthlinkClient>.refreshToken(refreshToken);
console.log(`Here is my new super awesome refresh token: ${data.refreshToken}`);
```

`revokeToken` - Revoke & remove a access token data.
Example:
```js
const token = "super-awesome-token";
const data = await <AuthlinkClient>.revokeToken(token);
console.log(`Here is my new super awesome refresh token: ${data.refreshToken}`);
```

**requires identity scope**
`getUser` - Get the user data from a access token.
Example:
```js
const token = "super-awesome-token";
const data = await <AuthlinkClient>.getUser(token);
console.log(`Here is my favourite user: ${data.name}`);
```

**requires servers scope**
`getUserServers` - Get the user's servers from a access token.
Example:
```js
const token = "super-awesome-token";
const data = await <AuthlinkClient>.getUserServers(token);
console.log(`Here is my favourite user's servers:`);
console.log(data);
```

**requires server.members.read scope**
`getUserServerMember` - Get the user's server member data from an access token and server id.
Example:
```js
const token = "super-awesome-token";
const serverId = "123456789";
const data = await <AuthlinkClient>.getUserServerMember(token, serverId);
console.log(`Here is my favourite user's server member data:`);
console.log(data);
```

# Enjoy
That's all there is to it!

For support or suggestions, join our [Guilded Server!](https://guilded.com/coding)
