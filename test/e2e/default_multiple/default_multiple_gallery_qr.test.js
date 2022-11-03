import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Multiple Gallery And Quick Replies Test`)
	.page(config.urlBase);
	

test('Verify Bot Multiple Galleries', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default multiple gallery qr');
	await utils.verifyCardItemCount(t, 2);

});

test('Verify Multiple Quick Reply Click Button', async t => {	
	//await utils.sendStartSessionEvent()
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default multiple gallery qr');
	await t.wait(3000)
	await utils.verifyQuickReplyItemCount(t, 2);
	await t.wait(3000)
	await utils.clickQuickReplyWithText(t, 'automated testing 88ab');
	await utils.expectLastUserBubbleText(t, 'automated testing 88ab');
	await utils.verifyLastBubbleIsFromBot(t)

});