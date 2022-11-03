import { Selector, t, ClientFunction } from 'testcafe';
import config from "../Config.js";
import utils from '../Utils';

fixture(`List View Tests`)
	.page(config.urlBase);



test('Test List with default button', async t => {
	await utils.setupDebugMode(t);
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.changeListInlineButtonMode(false);
	await utils.typeAndSend(t, '__list');
	await utils.verifyListItemCount(t, 3);


	//Select first List Item 1st button
	await utils.clickOnListItemIndexButtonIndex(t, 0, 0);
	await utils.expectLastUserBubbleText(t, "Book Appointment");


	// Click on list 2nd item  1st button
	await utils.clickOnListItemIndexButtonIndex(t, 1, 0);
	await utils.expectLastUserBubbleText(t, "Book Appointment");


});

test('Test List with inline button', async t => {
	await utils.setupDebugMode(t);
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, '__listgrouped');

	await utils.changeListInlineButtonMode(true);
	await utils.verifyListItemCount(t, 3);

	//Select first List Item 2nd buttons 
	await utils.clickOnListGroupedItemIndexButtonIndex(t, 0, 1);
	await utils.expectLastUserBubbleText(t, "Sell");

	//Select 3nd List Item 1nd buttons 
	await utils.clickOnListGroupedItemIndexButtonIndex(t, 2, 0);
	await utils.expectLastUserBubbleText(t, "Buy More");

});