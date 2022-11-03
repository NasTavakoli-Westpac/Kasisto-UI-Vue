import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`List Check`)
	.page(config.urlBase);
	

test('Verify list select element with min_select=2 and max_select=3', async t => {	
	await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);

	await utils.typeAndSend(t, 'ts: list select check');
    await t.wait(3000)  
    await utils.clickOnListItemIndexInlineButtonIndex(t, 1, 0);
    await t.wait(1000);
    await utils.clearSelectOptionIndex(t,0)

    await utils.clickOnListItemIndexInlineButtonIndex(t, 0, 0);
    await utils.clickOnListItemIndexInlineButtonIndex(t, 1, 0);
    await utils.clickOnListItemIndexInlineButtonIndex(t, 2, 0);
    await utils.clickSend(t);
    await t.wait(2000)  
});