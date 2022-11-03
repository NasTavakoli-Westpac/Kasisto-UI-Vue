/////////////////////////////////////////////////////////////////////
// Vars

const useBrowserstack = false;

const createTestCafe = require('testcafe');

let testcafe = null;

/////////////////////////////////////////////////////////////////////
// Test File Setup 
// Including all .test.js files. You can replace * with just one file if you don't run to run all of them

console.log("========== Running TestRunner_ui.js ==========");

const testFiles = [
    './test/ui_testing/*.test.js', // Run all .test.js files
    // './test/ui_testing/QuickReplies.test.js' // Run only QuickReplies test file
    // './test/ui_testing/List.test.js',
    // './test/ui_testing/Select.test.js',
    // './test/ui_testing/Carousel.test.js',
    // './test/ui_testing/TextBubble.test.js',
    // './test/ui_testing/TypingIndicator.test.js'
    // './test/ui_testing/ListCarousel.test.js',
    // './test/ui_testing/List2.test.js',
];

console.log("Test Files: ");

for (var i = 0; i < testFiles.length; i++) {
    console.log("=> " + testFiles[i]);
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