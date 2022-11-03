import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Multiple Gallery Test`)
	.page(config.urlBase);
	

test('Verify Bot Multiple Galleries', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default multiple gallery');
	await utils.verifyCardItemCount(t, 2);

});