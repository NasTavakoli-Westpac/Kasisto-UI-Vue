import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Alternative Tests`)
	.page(config.urlBase);
	

test('Verify Bot Alternative Text Bubble', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);

	await utils.typeAndSend(t, 'TS: default alternative text');
	//await utils.expectLastBotBubbleText(t, 'testing alternative text fun');

});