import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Card Gallery Test`)
	.page(config.urlBase);
	

test('Verify Bot Text Bubble', async t => {	
	await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);

	// check NBest are not shown at first
	await utils.typeAndSend(t, 'TS: default single gallery');
	//await utils.expectLastBotBubbleText(t, 'default');
	await utils.verifyLastBubbleIsFromBot(t);

});
/*
test('Verify Carousel Card One Item', async t => {	

	// check NBest are not shown at first
	await utils.verifyCarouselCardCount(t, 1);

});
*/