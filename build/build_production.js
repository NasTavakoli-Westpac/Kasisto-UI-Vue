'use strict'


const fs = require('fs');

var webviewVersionFilePath = './build/webview-version.json';
var webviewVersionFileName = './webview-version.json';
var webviewVersion = require(webviewVersionFileName);

//Update webview version
webviewVersion.build = webviewVersion.build+1;
fs.writeFile(webviewVersionFilePath, JSON.stringify(webviewVersion), function (err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(webviewVersion));
  console.log('writing to ' + webviewVersionFileName);
});
