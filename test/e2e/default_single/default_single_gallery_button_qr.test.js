import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Card Gallery With Button And Quick Reply Test`)
	.page(config.urlBase);
	

test('Verify Bot Text Bubble', async t => {	
	await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);

	await utils.typeAndSend(t, 'TS: default single gallery button qr');
	//await utils.expectLastBotBubbleText(t, 'default');
	await utils.verifyLastBubbleIsFromBot(t);

});

test('Verify Quick Reply With One Item, Click Button, And Last Bubble Text', async t => {	
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default single gallery button qr');

	await t.wait(3000);
	await utils.verifyQuickReplyItemCount(t, 1);
	await utils.clickQuickReplyWithText(t, 'automated testing caf5');
	await utils.expectLastUserBubbleText(t, 'automated testing caf5');
	await utils.verifyLastBubbleIsFromBot(t);

});

test('Verify Card Button And Click Button', async t => {	
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default single gallery button qr');

	await t.wait(3000);
	await utils.verifyButtonCountForCard(t, 1);
	await t.wait(1000);
	await utils.clickCarouselCardButtonWithText(t, 'auto testing 060d');

});
