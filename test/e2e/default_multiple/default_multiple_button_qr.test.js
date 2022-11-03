import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Multiple Buttons And Quick Replies`)
	.page(config.urlBase);
	

test('Verify Bot Text And Multiple Buttons', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default multiple button qr');
	await utils.verifyLastBubbleIsFromBot(t)
	await utils.verifyButtonItemCount(t, 2);

});

test('Verify Bot Button Click With Text', async t => {	
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default multiple button qr');
	await utils.clickSingleBotButtonWithText(t, 'auto testing da90');

});

test('Verify Multiple Quick Reply Click Button', async t => {	
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default multiple button qr');
	await t.wait(3000)
	await utils.verifyQuickReplyItemCount(t, 2);
	await t.wait(3000)
	await utils.clickQuickReplyWithText(t, 'automated testing da90');
	await utils.expectLastUserBubbleText(t, 'automated testing da90');
	await utils.verifyLastBubbleIsFromBot(t)

});