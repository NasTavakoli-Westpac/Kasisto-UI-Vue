import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Checklist Check`)
	.page(config.urlBase);
	

test('Verify checklist select element with no min/max select - 1', async t => {	
	await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);

    await utils.typeAndSend(t, 'ts: checklist select check');
    await utils.clickOnSelectChecklistItemIndexButtonIndex(t, 1, 0);
    await t.wait(1000);
    await utils.expectLastBotBubbleText(t, 'Echo 4567');
    
});

test('Verify checklist select element with no min/max select - 2', async t => {	
	await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
    await utils.typeAndSend(t, 'ts: checklist select check');
    await utils.clickOnSelectChecklistItemIndexButtonIndex(t, 0, 0);
    await t.wait(1000);
    await utils.expectLastBotBubbleText(t, 'Echo 2345');
});