import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Alternative Card Gallery Test`)
	.page(config.urlBase);
	

test('Verify Alternative Bot Text Bubble', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);

	await utils.typeAndSend(t, 'TS: default alternative gallery');
    await t.wait(3000);
	//await utils.expectLastBotBubbleText(t, 'testing alternative text fun');
	await utils.verifyLastBubbleIsFromBot(t)

});

/*
test('Verify Alternative Carousel Card One Item', async t => {	

	// check NBest are not shown at first
	await utils.verifyCarouselCardCount(t, 1);

});
*/