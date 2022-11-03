import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Date Picker Check`)
	.page(config.urlBase);
	

test('Verify button of type DATE which should invoke the location picker element', async t => {	
	await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);

	await utils.typeAndSend(t, 'ts: date picker check');
	await utils.clickButtonPickerVerifyText(t, 'Date Picker');    
	await t.wait(2000)
	await utils.testDatePickerComponent(t, '27');  
	await t.wait(2000) 
});