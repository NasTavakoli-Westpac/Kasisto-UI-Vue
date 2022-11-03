import { Selector, t, ClientFunction } from 'testcafe';
import config from "../Config.js";
import utils from '../Utils';

fixture(`Carousel Tests`)
  .page(config.urlBase);



test('Carousel Adaptive Card Display and clicks - part 1', async t => {  
  await utils.setupDebugMode(t);
  await utils.disableWidgetModeAndSplashScreen(t);
  await utils.changeCardSizeMode("adaptive");
  await utils.typeAndSend(t, '__carousel');

  await utils.verifyCarouselCardCount(t, 4);
  await utils.verifyCarouselDotCount(t, 4);

  //verify the button count for each card of carousel
  await utils.verifyCarouselButtonCountForCard(t, 0, 1);
  await utils.verifyCarouselButtonCountForCard(t, 1, 1);
  await utils.verifyCarouselButtonCountForCard(t, 2, 1);
  await utils.verifyCarouselButtonCountForCard(t, 3, 1);


  // click 1st card, 1st button
  await utils.clickOnCarouselCardIndexButtonIndex(t, 0, 0);
  await utils.expectLastUserBubbleText(t, "Learn More");

  await utils.clickOnCarouselRightArrow(t);
  await utils.verifyCarouselDotIndexStatus(t, 1, true);

  // click 2nd card, 1st button
  await utils.clickOnCarouselCardIndexButtonIndex(t, 1, 0);
  await utils.expectLastUserBubbleText(t, "Learn More");

});

test('Carousel Adaptive Card Display and clicks - part 2', async t => {  
  await utils.setupDebugMode(t);
  await utils.disableWidgetModeAndSplashScreen(t);
  await utils.changeCardSizeMode("adaptive");
  await utils.typeAndSend(t, '__carousel');

  await utils.clickOnCarouselPagerDotIndex(t, 2);
  await utils.verifyCarouselDotIndexStatus(t, 2, true);

  // click 3rd card, 1st button
  await utils.clickOnCarouselCardIndexButtonIndex(t, 2, 0);
  await utils.expectLastUserBubbleText(t, "Learn More");

  await utils.clickOnCarouselRightArrow(t);
  await utils.verifyCarouselDotIndexStatus(t, 3, true);

  // click 4th card, 1st button
  await utils.clickOnCarouselCardIndexButtonIndex(t, 3, 0);
  await utils.expectLastUserBubbleText(t, "Phone Number");

});

test('Carousel Expand Button test', async t => {

  await utils.setupDebugMode(t);
  await utils.disableWidgetModeAndSplashScreen(t);
  await utils.changeCardSizeMode("adaptive");
  await utils.typeAndSend(t, '__carousel');

  await utils.clickOnCarouselPagerDotIndex(t, 2);

  // //expand carousel 4th card should display 6 button instead of 3
  // await utils.clickOnCarouselCardIndexExpandButton(t, 3);
  // await utils.verifyCarouselButtonCountForCard(t, 3, 6);

  // //clicking again the expand button should limit again the number of button on the card to 3
  // await utils.clickOnCarouselCardIndexExpandButton(t, 3);
  // await utils.verifyCarouselButtonCountForCard(t, 3, 3);


  await utils.clickOnCarouselPagerDotIndex(t, 0);

  // verify the 1st Card expand correctly
  await utils.verifyCarouselCardIndexExpand(t, 0);
  // verify the 1st Card collapse correctly
  await utils.verifyCarouselCardIndexCollapse(t, 0);


  await utils.clickOnCarouselPagerDotIndex(t, 2);

})

// NOTE: this test is not applicable anymore after updating the carousel debug payload to make it more demo friendly
// test('Carousel Fixed Card Display and clicks', async t => {
//   await utils.setupDebugMode(t);
//   await utils.changeCardSizeMode("fixed");
//   await utils.typeAndSend(t, '__carousel');

//   // when the hardcoded carousel is used in "fixed" card mode, the 4th item should be limited up to 3 buttons instead of 6

//   await utils.verifyCarouselButtonCountForCard(t, 3, 3);

//   await utils.verifyAllCarouselCardsHeightAreMatching(t);


// });

test('Carousel Scrolling', async t => {
  await utils.setupDebugMode(t);
  await utils.disableWidgetModeAndSplashScreen(t);
  await utils.changeCardSizeMode("fixed");
  await utils.typeAndSend(t, '__carousel');


	//verify the Carousel initial position is at the initial left margin of 50px
	await utils.verifyCarouselWrapperLeftPosition(t, 45);
	// draq Carousel by taping on the 3rd item starting from the end of the list and moving it  left of -560px
	await utils.dragCarouselHorizontallyFromItemIndex(t, -560, 3, true);


	//verify the Carousel new position is at -450px
	await utils.verifyCarouselWrapperLeftPosition(t, -450, "lte");
	// drag quick reply by taping on the 7th item from the start of the list and moving it right of 560px
	await utils.dragCarouselHorizontallyFromItemIndex(t, 750, 3, false);

	//verify the Carousel new position is superior to 0px
	await utils.verifyCarouselWrapperLeftPosition(t, -200, "gte");


});