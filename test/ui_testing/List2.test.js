import { Selector, t, ClientFunction } from 'testcafe';
import config from "../Config.js";
import utils from '../Utils';

fixture(`List View Tests`)
	.page(config.urlBase);



test('Test List with inline button', async t => {
	await utils.setupDebugMode(t);
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, '__list2');
	await utils.changeListInlineButtonMode(false);
	await utils.verifyListItemCount(t, 3);


	//Select first List Item 1st button
	await utils.clickOnListItemIndexInlineButtonIndex(t, 0, 0);
	await utils.expectLastUserBubbleText(t, "Edit");
	await t.wait(3000);

});


test('Test List with 3 inline button', async t => {
	await utils.setupDebugMode(t);
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, '__list2');
	await utils.changeListInlineButtonMode(true);
	await utils.verifyListItemCount(t, 3);

	//Select first List Item 2nd buttons 
	await utils.clickOnListGroupedItemIndexButtonIndex(t, 1, 1);
	await utils.expectLastUserBubbleText(t, "Button 2");
	await t.wait(3000);

});

