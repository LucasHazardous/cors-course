# CORS

origin = protocol + domain + port

> CORS stands for Cross-origin resource sharing, it is a mechanism allowing server to explicitly whitelist certain origins and helps with bypassing the *[same-origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)* policy.

Cross-Origin Resource Sharing only applies in a browser context and is a security mechanism to allow one origin to make a request to another origin. All browsers follow the Single Origin Policy, meaning by default scripts cannot make requests to other origins - but if the server provides properly configured CORS headers this policy can be selectively relaxed. **Thus CORS is a way of selectively loosening security and not of tightening it.**

CORS can be a protection mechanism against certain CSRF (Cross-site request forgery) attacks.

# CSRF example 1

CSRF attack example which CORS protects against:

You're logged into bank.com on one tab and open evil.com is open in another tab.

If there was no CORS mechanism, evil.com could make AJAX request to bank.com (this is known as a cross-origin request) without your knowledge. And along with the request, the browser will send the session cookie which was set by bank.com earlier when you logged in. With this session cookie, bank.com will think that you've made this request and will process it.

With the CORS mechanism, the browser will first check whether bank.com accepts cross-origin requests or not. For this, the browser will first send an OPTIONS request to bank.com. The browser will only send the actual request if bank.com's CORS policy allows it.

Now, suppose evil.com tries to "bypass" this using a proxy. It will make an AJAX request to proxy.com which will forward the request to bank.com. But now, the browser will only send the cookies set by proxy.com. So, the bank.com's server will not get your session cookie and the attack will not work.

# CSRF example 2

GET request placed in an img tag is an example of simple request that is automatically executed on page load.

Suppose, there is a website example.com which has a whitelist of certain ip addresses that are allowed to access example.com/admin and make various requests.
Other form of CSRF is placing a request in an img tag:

&lt;img src="`http://example.com/admin/addUser?login=newuser&pass=pass123&type=admin`"&gt;

How to protect against such an attack? Use neither GET, HEAD, OPTIONS nor TRACE for purposes different than read. [These methods should be considered safe.](https://www.rfc-editor.org/rfc/rfc9110.html#name-safe-methods)

# Frontend with separate backend scenario

Suppose that app's frontend is hosted under f.com and backend consisting of REST API is hosted on a different server under b.com.Backend has CORS set to allow all origins to send requests to it.

Is there still a chance to protect against an attack described in **CSRF example 1**?
Instead of using cookies to store session token we can use localStorage or sessionStorage.

> A different Storage object is used for the sessionStorage and localStorage for **each origin** — they function and are controlled separately. [src](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

# Practical Examples

Install dependencies and run the example server with:
```
npm i;node .
```

[Different buttons](http://localhost) will produce different actions, observe the code as well as the developer console in the browser.

To get data from the /example endpoint run:
```
curl -H "Origin: http://example.com" localhost/example
```