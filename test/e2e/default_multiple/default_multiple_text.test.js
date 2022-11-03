import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Multiple Bot Test Text Bubble`)
	.page(config.urlBase);
	

test('Verify Bot Multiple Text Bubble', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default multiple text');
	await utils.verifyTextBubbleItemCount(t, 2);

});