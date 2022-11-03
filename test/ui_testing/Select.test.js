import { Selector, t, ClientFunction } from 'testcafe';
import config from "../Config.js";
import utils from '../Utils';


fixture(`Select Tests`)
	.page(config.urlBase);

// test('Test SelectCarousel', async t => {
// 	await utils.setupDebugMode(t);
// 	await utils.disableWidgetModeAndSplashScreen(t);
// 	await utils.typeAndSend(t, '__selectCarousel');

// 	await utils.verifyCarouselCardCount(t, 4);
// 	await utils.verifyCarouselDotCount(t, 4);

// 	// await utils.clickSend(t);
// 	// await utils.verifyLastSelectSubmitButtonStatus(t, false);
// 	// await utils.verifyLastSelectErrorMessage(t, "Insufficient items selected")

// 	//Select first card
// 	await utils.clickOnCarouselCardIndexButtonIndex(t, 0, 0);
// 	await utils.verifySelectCarouselNthCardNthButtonActivationStatus(t, 0, 0, true);


// 	// Click on selectCarousel 3rd item button
// 	await utils.clickOnCarouselCardIndexButtonIndex(t, 2, 0);
// 	await utils.verifySelectCarouselNthCardNthButtonActivationStatus(t, 2, 0, true);

// 	// move selectCarousel to last item
// 	await utils.clickOnCarouselPagerDotIndex(t, 3);
// 	await utils.verifyCarouselDotIndexStatus(t, 3, true);

// 	// Click on selectCarousel last item button
// 	await utils.clickOnCarouselCardIndexButtonIndex(t, 3, 0);
// 	// verify clicking on the button make it "selected" using the kai_card_button_active class
// 	await utils.verifySelectCarouselNthCardNthButtonActivationStatus(t, 3, 0, true);

// 	// click Submit button with too many items selected
// 	await utils.clickSend(t);
// 	// await utils.verifyLastSelectSubmitButtonStatus(t, false);
// 	await utils.verifyLastSelectErrorMessage(t, "Too many items selected")


// 	// move carousel left
// 	await utils.clickOnCarouselLeftArrow(t);
// 	// verify clicking on the left arrow make the previous dot pager active
// 	await utils.verifyCarouselDotIndexStatus(t, 2, true);


// 	// draq carousel by taping on the last item and moving it  left of -350px
// 	await utils.dragCarouselHorizontallyFromItemIndex(t, -350, 1, true);
// 	// verify the carousel has been dragged to the last card
// 	await utils.verifyCarouselDotIndexStatus(t, 3, true);

// 	//verify the carousel neww position is at -450px
// 	await utils.verifyCarouselWrapperLeftPosition(t, -450, "lte");
// 	// drag carousel by taping on the 7th item from the start of the list and moving it right of 560px
// 	await utils.dragCarouselHorizontallyFromItemIndex(t, 560, 3, false);

// 	//verify the carousel neww position is superior to 0px
// 	await utils.verifyCarouselWrapperLeftPosition(t, -400, "gte");

// 	// Click on selectCarousel 3rd item button
// 	await utils.clickOnCarouselCardIndexButtonIndex(t, 2, 0);
// 	// verify clicking on the button make it "unselected" checking the kai_card_button_active class has been removed
// 	await utils.verifySelectCarouselNthCardNthButtonActivationStatus(t, 2, 0, false);


// 	// click Submit button again
// 	await utils.clickSend(t);

// 	await utils.expectNthLastUserBubbleText(t, 2, "You selected Visa Classic Card")
// 	await utils.expectLastUserBubbleText(t, "You selected Amex Platinum");

// });



// test('Test SelectList with standard button', async t => {
// 	await utils.changeListInlineButtonMode(false);
// 	await utils.setupDebugMode(t);
// 	await utils.disableWidgetModeAndSplashScreen(t);
// 	await utils.typeAndSend(t, '__selectList');

// 	await utils.verifyListItemCount(t, 3);

// 	// await utils.clickSend(t);
// 	// await utils.verifyLastSelectSubmitButtonStatus(t, false);
// 	// await utils.verifyLastSelectErrorMessage(t, "Insufficient items selected")

// 	//Select first List Item
// 	await utils.clickOnListItemIndexButtonIndex(t, 0, 0);
// 	await utils.verifySelectListNthCardNthButtonActivationStatus(t, 0, 0, true);


// 	// Click on selectList 2nd item button
// 	await utils.clickOnListItemIndexButtonIndex(t, 1, 0);
// 	await utils.verifySelectListNthCardNthButtonActivationStatus(t, 1, 0, true);

// 	// Click on selectList 3rd item button
// 	await utils.clickOnListItemIndexButtonIndex(t, 2, 0);
// 	await utils.verifySelectListNthCardNthButtonActivationStatus(t, 2, 0, true);

// 	// click Submit button with too many items selected
// 	await utils.clickSend(t);
// 	// await utils.verifyLastSelectSubmitButtonStatus(t, false);
// 	await utils.verifyLastSelectErrorMessage(t, "Too many items selected")

// 	// Click on selectList 1st item button and 3rd item button
// 	await utils.clickOnListItemIndexButtonIndex(t, 0, 0);
// 	await utils.clickOnListItemIndexButtonIndex(t, 2, 0);
// 	// verify clicking on the button make it "unselected" checking the kai_card_button_active class has been removed
// 	await utils.verifySelectListNthCardNthButtonActivationStatus(t, 0, 0, false);
// 	await utils.verifySelectListNthCardNthButtonActivationStatus(t, 2, 0, false);


// 	// click Submit button again
// 	await utils.clickSend(t);

// 	await utils.verifyLastBubbleIsFromBot(t);

// });

// test('Test SelectList with inline button', async t => {
// 	await utils.changeListInlineButtonMode(true);
// 	await utils.setupDebugMode(t);
// 	await utils.disableWidgetModeAndSplashScreen(t);
// 	await utils.typeAndSend(t, '__selectList');

// 	await utils.verifyListItemCount(t, 3);

// 	await utils.clickSend(t);
// 	// await utils.verifyLastSelectSubmitButtonStatus(t, false);
// 	// await utils.verifyLastSelectErrorMessage(t, "Insufficient items selected")

// 	//Select first List Item
// 	await utils.clickOnListItemIndexInlineButtonIndex(t, 0, 0);
// 	await utils.verifySelectListNthCardNthInlineButtonActivationStatus(t, 0, 0, true);


// 	// Click on selectList 2nd item button
// 	await utils.clickOnListItemIndexInlineButtonIndex(t, 1, 0);
// 	await utils.verifySelectListNthCardNthInlineButtonActivationStatus(t, 1, 0, true);

// 	// Click on selectList 3rd item button
// 	await utils.clickOnListItemIndexInlineButtonIndex(t, 2, 0);
// 	await utils.verifySelectListNthCardNthInlineButtonActivationStatus(t, 2, 0, true);

// 	// click Submit button with too many items selected
// 	await utils.clickSend(t);
// 	// await utils.verifyLastSelectSubmitButtonStatus(t, false);
// 	await utils.verifyLastSelectErrorMessage(t, "Too many items selected")

// 	// Click on selectList 1st item button and 3rd item button
// 	await utils.clickOnListItemIndexInlineButtonIndex(t, 0, 0);
// 	await utils.clickOnListItemIndexInlineButtonIndex(t, 2, 0);
// 	// verify clicking on the button make it "unselected" checking the kai_card_button_active class has been removed
// 	await utils.verifySelectListNthCardNthInlineButtonActivationStatus(t, 0, 0, false);
// 	await utils.verifySelectListNthCardNthInlineButtonActivationStatus(t, 2, 0, false);


// 	// click Submit button again
// 	await utils.clickSend(t);

// 	await utils.verifyLastBubbleIsFromBot(t);

// });



test('Test SelectChecklistn', async t => {
	await utils.setupDebugMode(t);
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, '__selectChecklist');

	await utils.verifySelectChecklistItemCount(t, 8);

	// await utils.verifyLastSelectSubmitButtonStatus(t, false);
	// await utils.verifyLastSelectErrorMessage(t, "Insufficient items selected")

	//Select first List Item
	await utils.clickOnSelectChecklistItemIndexButtonIndex(t, 0, 0);
	// TODO: create a utils method to verify the chip is displayed with the right label
	// await utils.verifySelectChecklistNthCardNthButtonActivationStatus(t, 0, 0, true);


	// Click on selectList 2nd item button
	await utils.clickOnSelectChecklistItemIndexButtonIndex(t, 1, 0);
	// await utils.verifySelectChecklistNthCardNthButtonActivationStatus(t, 1, 0, true);

	// Click on selectList 3rd item button
	await utils.clickOnSelectChecklistItemIndexButtonIndex(t, 2, 0);
	// await utils.verifySelectChecklistNthCardNthButtonActivationStatus(t, 2, 0, true);

	// click Submit button with too many items selected
	await utils.clickSend(t);
	// await utils.verifyLastSelectSubmitButtonStatus(t, false);
	await utils.verifyLastSelectErrorMessage(t, "Too many items selected")

	// Click on selectList 1st item button and 3rd item button
	await utils.clickOnSelectChecklistItemIndexButtonIndex(t, 0, 0);
	await utils.clickOnSelectChecklistItemIndexButtonIndex(t, 2, 0);
	// verify clicking on the button make it "unselected" checking the kai_card_button_active class has been removed
	// await utils.verifySelectChecklistNthCardNthButtonActivationStatus(t, 0, 0, false);
	// await utils.verifySelectChecklistNthCardNthButtonActivationStatus(t, 2, 0, false);


	// click Submit button again
	await utils.clickSend(t);

	await utils.expectLastUserBubbleText(t, "Looking into Long Term Investments");

});


