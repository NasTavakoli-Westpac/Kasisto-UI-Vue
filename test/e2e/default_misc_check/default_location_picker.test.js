import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Location Picker Check`)
	.page(config.urlBase);
	

test('Verify button of type LOCATION which should invoke the location picker element', async t => {	
	await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);

	await utils.typeAndSend(t, 'ts: location picker check');
	await utils.clickButtonPickerVerifyText(t, 'Location Picker');   
	await t.wait(2000) 
	await utils.testLocationPickerComponent(t, '65 Bras Basah Rd, Singapore 189561');   
	await t.wait(2000)
});