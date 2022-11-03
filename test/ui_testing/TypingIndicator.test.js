import { Selector, t, ClientFunction } from 'testcafe';
import config from "../Config.js";
import utils from '../Utils';

fixture(`Typing Indicator Tests`)
  .page(config.urlBase);


test('Verify Typing Indicator', async t => {
	await utils.setupDebugMode(t);
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, '__typing=true');

	// Count 3 spans for the ... in the typing indicator
	await t
		.expect(Selector(".kai-typing-indicator span").count).eql(3);
	
	await utils.typeAndSend(t, '__typing=false');
});