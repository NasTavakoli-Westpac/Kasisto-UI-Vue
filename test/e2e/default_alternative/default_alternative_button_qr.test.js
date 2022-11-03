import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Verify Alternative Button And Quick Reply Tests`)
	.page(config.urlBase);
	
test('Verify Alternative Bot Button, Text Label, And Click Button With Text', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default alternative button qr');

	// await utils.expectLastBotBubbleText(t, 'default');
	await utils.expectSingleBotButtonText(t, 'auto testing 5658');
	await utils.clickSingleBotButtonWithText(t, 'auto testing 5658');

});

test('Verify Alternative Quick Reply Equal One Item And Click Button', async t => {	
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default alternative button qr');
    await t.wait(3000);
	await utils.verifyQuickReplyItemCount(t, 1);
	await utils.clickQuickReplyWithText(t, 'automated testing e7e0')
	
});
