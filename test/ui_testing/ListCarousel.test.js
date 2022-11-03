import { Selector, t, ClientFunction } from 'testcafe';
import config from "../Config.js";
import utils from '../Utils';

fixture(`Select List View Tests`)
	.page(config.urlBase);



test('Test List with default button', async t => {
	await utils.setupDebugMode(t);
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, '__testcaseMultiMedium');
	await utils.changeListInlineButtonMode(false);
	await utils.verifyListItemCount(t, 2);

	//Select first List Item 1st button
	await utils.clickOnListItemIndexButtonIndex(t, 1, 1);
	await utils.expectLastUserBubbleText(t, "Button 2");
	await t.wait(6000);

});
