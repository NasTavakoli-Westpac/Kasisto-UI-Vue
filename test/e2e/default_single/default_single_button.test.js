import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Verify Button Tests`)
	.page(config.urlBase);
	

test('Verify Bot Button', async t => {	
	await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default single button');

	//await utils.typeAndSend(t, 'TS: default single text');
	//await utils.expectLastBotBubbleText(t, 'default');
	await utils.verifyLastBubbleIsFromBot(t);
	await utils.expectSingleBotButton(t);

});

test('Verify Bot Button Label', async t => {	
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default single button');

	await utils.expectSingleBotButtonText(t, 'auto testing 3a36');
	await utils.verifyLastBubbleIsFromBot(t);
});

