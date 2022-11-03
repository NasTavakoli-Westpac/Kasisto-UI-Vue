import { Selector, t, ClientFunction } from 'testcafe';
import config from "../Config.js";
import utils from '../Utils';

fixture(`Text Bubble Tests`)
  .page(config.urlBase);


test('Verify User Text Bubble', async t => {
	const message = 'User Typed Bubble';

	await utils.disableWidgetModeAndSplashScreen(t);

	await utils.typeAndSend(t, message);
	await utils.expectLastUserBubbleText(t, message);
});

test('Verify Bot Text Bubble', async t => {	
	await utils.setupDebugMode(t);
	await utils.disableWidgetModeAndSplashScreen(t);
	
	await utils.typeAndSend(t, '__textresponse');

	await utils.expectLastBotBubbleText(t, "The test box is used for the virtual assistant's messages to the user.");

});