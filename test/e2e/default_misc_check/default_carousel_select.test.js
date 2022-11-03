import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Carousel Select`)
	.page(config.urlBase);
	

test('Verify carousel select element with min_select=1 and max_select=2', async t => {	
	await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);

	await utils.typeAndSend(t, 'ts: carousel select check');
    await t.wait(3000)  
    await utils.clickOnCarouselCardIndexButtonIndex(t, 1, 0);
    await t.wait(1000);
    await utils.clearSelectOptionIndex(t, 0);


    await utils.clickOnCarouselCardIndexButtonIndex(t, 0, 0);
    await utils.clickOnCarouselCardIndexButtonIndex(t, 1, 0);
    await utils.clickSend(t);
    await t.wait(2000)  
});