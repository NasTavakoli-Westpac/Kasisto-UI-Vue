/////////////////////////////////////////////////////////////////////
// Vars

const useBrowserstack = false;
const createTestCafe = require('testcafe');
let testcafe = null;
const fs = require('fs');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function configureEnv() {
    await exec('(cd ./test/e2e/be_integration ; ./configure_env.sh)', function (err, stdout) {
        if (err !== null) { 
            console.log('Unable to load the package due to: ' + err);
            process.exit(1);
        }
        console.log("========== Package Successfully Loaded ==========");
        runTests();
    });     
}

function runTests() {
    /////////////////////////////////////////////////////////////////////
// Test File Setup 
// Including all .test.js files. You can replace * with just one file if you don't run to run all of them

console.log("========== Running TestRunner_e2e.js ==========");

// const testFiles = [
//     // './test/e2e/default_single/default_single_text.test.js',
//     // './test/e2e/default_misc_check/default_carousel_select.test.js',
//     // 'test/e2e/default_misc_check/default_list.test.js',
//     // 'test/e2e/default_misc_check/default_checklist.test.js',
//     // './test/e2e/default_multiple/default_multiple_gallery_button_qr.test.js',
//     // './test/e2e/default_multiple/default_multiple_text_qr.test.js',
//     // './test/e2e/default_multiple/default_multiple_button.test.js',
//     // './test/e2e/default_multiple/default_multiple_button_qr.test.js',
//     // './test/e2e/default_multiple/default_multiple_gallery.test.js',
//     // './test/e2e/default_multiple/default_multiple_gallery_qr.test.js',
//     // './test/e2e/default_multiple/default_multiplee_gallery_button.test.js',
//     // './test/e2e/default_multiple/default_multiple_gallery_button_qr.test.js'
// ];

let testFiles = ['./test/e2e/'];
//let testFiles = ['./test/e2e/default_multiple/default_multiple_gallery_button.test.js'];
const testFileDirectory = ['default_single', 'default_alternative', 'default_multiple','default_misc_check'];

console.log("Test Files: ");
for(let i=0; i<testFileDirectory.length; i++){
        fs.readdirSync('./test/e2e/'+testFileDirectory[i]+'/').forEach(file => {
           console.log("=> " + testFileDirectory[i] + '/' + file)
        })
}

console.log("===============================================");

/////////////////////////////////////////////////////////////////////
// Browser Setup

let browsers = [];
const browserMinVersions = {
    firefox: "58.0",
    msedge: "15.0",
    safari: "11.1",
    chrome: "63.0",
    msie: "11.0"
};
const browserstackBrowsers = [

    'browserstack:chrome:OS X High Sierra', //Newest Version
    'browserstack:chrome@' + browserMinVersions['chrome'] + ':OS X High Sierra', //Min Version

    'browserstack:firefox:Windows 10', //Newest Version
    'browserstack:firefox@' + browserMinVersions['firefox'] + ':Windows 10', //Min Version

    // 'browserstack:safari:OS X High Sierra', //Newest Version Same version as min version currently
    'browserstack:safari@' + browserMinVersions['safari'] + ':OS X High Sierra', //Min Version

    'browserstack:edge:Windows 10', //Newest Version
    'browserstack:edge@' + browserMinVersions['msedge'] + ':Windows 10', //Min Version

    'browserstack:ie@11.0:Windows 10', //Min & Only IE Version

];
const localBrowsers = [
    'chrome',
    // 'safari',
    // 'firefox'
];
if (useBrowserstack) {
    browsers = browserstackBrowsers;
    console.log("Running tests on Browserstack");
} else {
    browsers = localBrowsers;
    console.log("Running tests on machine");
}

/////////////////////////////////////////////////////////////////////
// Run Tests


createTestCafe('localhost', 1337, 1338) //Ports to run the Debugger on which isn't the same as the webview port
    .then(tc => {
        testcafe = tc;
        const runner = testcafe.createRunner();        
        return runner
            .src(testFiles)
            .browsers(browsers)
            .run();
    })
    .then(failedCount => {
        console.log('Tests failed: ' + failedCount);
        testcafe.close();
    });
}

configureEnv();