import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Multiple Bot Text AND Quick Replies Test`)
	.page(config.urlBase);
	

test('Verify Multiple Text Bubble And Quick Replies', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default multiple text qr');
	await utils.verifyTextBubbleItemCount(t, 2);
	await utils.verifyQuickReplyItemCount(t, 2);

});

test('Verify Multiple Quick Reply Click Button', async t => {	
	//await utils.sendStartSessionEvent()
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default multiple text qr');
	await t.wait(3000)
	await utils.verifyQuickReplyItemCount(t, 2);
	await t.wait(3000)
	await utils.clickQuickReplyWithText(t, 'automated testing abef');
	await utils.expectLastUserBubbleText(t, 'automated testing abef');
	await utils.verifyLastBubbleIsFromBot(t)

});