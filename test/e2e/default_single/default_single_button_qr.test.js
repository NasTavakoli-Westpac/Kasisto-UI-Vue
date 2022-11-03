import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Verify Button And Quick Reply Tests`)
	.page(config.urlBase);
	
test('Verify Bot Button, Text Label, And Click Button With Text', async t => {	
	await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default single button qr');

	//await utils.expectLastBotBubbleText(t, 'default');
	await utils.verifyLastBubbleIsFromBot(t)
	await utils.expectSingleBotButtonText(t, 'auto testing 9f2c');
	await utils.clickSingleBotButtonWithText(t, 'auto testing 9f2c');

});

test('Verify Quick Reply Equal One Item And Click Button', async t => {	
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default single button qr');
	await t.wait(3000);
	await utils.verifyQuickReplyItemCount(t, 1);
	await utils.clickQuickReplyWithText(t, 'automated testing c812')
	
});
