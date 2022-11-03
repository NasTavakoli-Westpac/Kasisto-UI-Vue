import { Selector, t, ClientFunction } from 'testcafe';
import config from "../../Config.js";
import utils from '../../Utils';

fixture(`Verify Alternative Button Tests`)
	.page(config.urlBase);
	

test('Verify Alternative Bot Button', async t => {	
	//await utils.sendStartSessionEvent();
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default alternative button');
	//await utils.expectLastBotBubbleText(t, 'testing alternative text fun');
	await utils.expectSingleBotButton(t);

});

test('Verify Alternative Bot Button Label', async t => {
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, 'TS: default alternative button');
	await utils.expectSingleBotButtonText(t, 'auto testing 1ac9');
	await utils.verifyLastBubbleIsFromBot(t);
});