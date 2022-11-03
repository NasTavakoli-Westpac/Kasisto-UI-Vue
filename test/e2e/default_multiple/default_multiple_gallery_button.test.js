import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Multiple Gallery With Button Test`)
	.page(config.urlBase);
	

test('Verify Bot Multiple Galleries', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default multiple gallery button');
	await utils.verifyCardItemCount(t, 2);

});

test('Verify Multiple Card Button And Click Button', async t => {
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default multiple gallery button');

	await t.wait(3000)
	await utils.verifyButtonCountForCard(t, 2)
	await t.wait(1000)
	await utils.clickCarouselCardButtonWithText(t, 'auto testing 2610')

});