import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Multiple Buttons`)
	.page(config.urlBase);
	

test('Verify Bot Text And Multiple Buttons', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default multiple button');
	await utils.verifyLastBubbleIsFromBot(t)
	await utils.verifyButtonItemCount(t, 2);

});

test('Verify Bot Button Click With Text', async t => {	
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default multiple button');
	await utils.clickSingleBotButtonWithText(t, 'auto testing fa25');

});