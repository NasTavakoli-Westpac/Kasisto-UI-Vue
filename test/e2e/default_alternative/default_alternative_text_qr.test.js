import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Alternative QR Tests`)
	.page(config.urlBase);
	
test('Verify Alternative Bot Text Bubble', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default alternative text qr');
	//await utils.expectLastBotBubbleText(t, 'testing alternative text fun');
	await utils.verifyLastBubbleIsFromBot(t)
});

test('Verify Alternative Quick Reply Equal One Item And Click Button', async t => {	
	//await utils.sendStartSessionEvent()
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default alternative text qr');
	await t.wait(3000)
	await utils.verifyQuickReplyItemCount(t, 1);
	await t.wait(3000)
	await utils.clickQuickReplyWithText(t, 'automated testing d998');
	await utils.expectLastUserBubbleText(t, 'automated testing d998');
	await utils.verifyLastBubbleIsFromBot(t)

});
