import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Text Bubble Tests`)
	.page(config.urlBase);
	

test('Verify Bot Text Bubble', async t => {	
	await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default single text qr');

	//await utils.expectLastBotBubbleText(t, 'default');
	await utils.verifyLastBubbleIsFromBot(t);
});

test('Verify Quick Reply Equal One Item And Click Button', async t => {	
	//await utils.sendStartSessionEvent()
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default single text qr');
	await t.wait(3000)
	await utils.verifyQuickReplyItemCount(t, 1);
	await utils.clickQuickReplyWithText(t, 'automated testing f274');
	await utils.expectLastUserBubbleText(t, 'automated testing f274')
	await utils.verifyLastBubbleIsFromBot(t)

});
