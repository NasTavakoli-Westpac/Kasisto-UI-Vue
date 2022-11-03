import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Card Gallery with Quick Reply Test`)
	.page(config.urlBase);
	

test('Verify Bot Text Bubble', async t => {	
	await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default single gallery qr');
	//await utils.expectLastBotBubbleText(t, 'default');
	await utils.verifyLastBubbleIsFromBot(t)

});

test('Verify Quick With One Item', async t => {	
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default single gallery qr');

	await t.wait(3000);
	await utils.verifyQuickReplyItemCount(t, 1);
});

test('Verify Button Click And Last Bubble Text', async t => {	
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default single gallery qr');

	await t.wait(3000)
	await utils.clickQuickReplyWithText(t, 'automated testing 3017')
	await utils.expectLastUserBubbleText(t, 'automated testing 3017')
	await utils.verifyLastBubbleIsFromBot(t)
});


