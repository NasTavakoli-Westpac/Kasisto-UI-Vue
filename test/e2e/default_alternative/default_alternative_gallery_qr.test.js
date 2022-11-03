import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Alternative Card Gallery with Quick Reply Test`)
	.page(config.urlBase);
	

test('Verify Alternative Bot Text Bubble', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default alternative gallery qr');
	await t.wait(3000);
	//await utils.expectLastBotBubbleText(t, 'testing alternative text fun');
	await utils.verifyLastBubbleIsFromBot(t)
});

test('Verify Alternative Quick With One Item', async t => {	
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default alternative gallery qr');

	await t.wait(3000);
	await utils.verifyQuickReplyItemCount(t, 1);
});

test('Verify Alternative Button Click And Last Bubble Text', async t => {	
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default alternative gallery qr');

	await t.wait(3000)
	await utils.clickQuickReplyWithText(t, 'automated testing 8fc3')
	//await utils.expectLastUserBubbleText(t, 'automated testing 8fc3')
	await utils.verifyLastBubbleIsFromBot(t)
});