# Kasisto Webview

> The Kasisto Webview is built using Vue.js

## Important

Before you build and run the Webview, please make sure you have [nodejs installed](https://nodejs.org/en/download/package-manager/#macos).


## Build & Run

1. Install dependencies needed to run webview ```npm install```
1. Copy `public/static/env-example.js` file to `public/static/env.js` 
1. Edit `url` and `APP_AUTH_KEY` inside the `public/static/env.js` to the provided configurations from Kasisto.
1. Run the webview in development mode by typing in ```npm run serve```. Development mode has [hot reload](https://vue-loader.vuejs.org/guide/hot-reload.html) enabled.
1. To view the webview, open your browser to [http:localhost:8081](http:localhost:8081)
1. If you entered a valid `url` + `APP_AUTH_KEY` in `public/static/env.js` you should be able to type anything and get a response. If the response is "**You are not connected.**" then the `url` or `APP_AUTH_KEY` is incorrect or the server is unreachable. Please reach out to the Kasisto Team if you encounter this issue.


## Build For Production
1. Run ```npm run build``` inside the root webview-library directory.
2. Once complete the built files will be at the root webview-library directory inside the `/dist/` folder. 
3. You can run a [python simple server](https://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver/) on your machine with 
`python -m SimpleHTTPServer 8000` or another web server to test webview. **A webserver is required to view and load all files properly.**


## FAQ
**Where can I find more information on Vue.js?**

For a detailed explanation on how vue.js works, check out the [guide](https://vuejs.org/v2/guide/)


**Where can I find more information on how this Webview works?**

A Kasisto team memeber can provide a login to our  [Webview Docs](https://docs.kasisto.com/webview)


**How do I update my version of the webview with changes made by Kasisto?**

A Kasisto team memeber can provide a login to our  [Webview Docs](https://docs.kasisto.com/webview)

