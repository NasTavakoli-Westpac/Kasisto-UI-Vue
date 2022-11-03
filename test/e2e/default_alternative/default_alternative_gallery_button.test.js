import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Alternative Card Gallery With Button Test`)
	.page(config.urlBase);
	

test('Verify Alternative Bot Text Bubble', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default alternative gallery button');
	//await utils.expectLastBotBubbleText(t, 'testing alternative text fun');
	await utils.verifyLastBubbleIsFromBot(t)

});



test('Verify Alternative Card Button And Click Button', async t => {	
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default alternative gallery button');

	await t.wait(3000)
	await utils.verifyButtonCountForCard(t, 1)
	await t.wait(1000)
	await utils.clickCarouselCardButtonWithText(t, 'auto testing ca96')

});