import { Selector, t, ClientFunction } from 'testcafe';
import config from "../Config.js";
import utils from '../Utils';

fixture(`Quick Replies Tests`)
	.page(config.urlBase);


test('Quick Replies Display', async t => {
	// await t.setTestSpeed(0.8);
	await utils.setupDebugMode(t);
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, '__quickreplies');

	const quickReplyCount = 7;
	const quickReplyDotCount = 0;

	// Count 11 quick reply items
	await utils.verifyQuickReplyItemCount(t, quickReplyCount);
	// Count 0 pager dots as the dot pagination has been removed for quickreply component
	await utils.verifyQuickReplyDotCount(t, quickReplyDotCount);


	// // Verity the quick reply count on the overall page is still equal to 8 after displaying another set of quick replies,
	// // because quick replies should be removed everytime a new CAPI response is received
	await utils.typeAndSend(t, '__quickreplies');
	await utils.verifyQuickReplyItemCount(t, quickReplyCount);

});

test('Click Quick Reply', async t => {
	await utils.setupDebugMode(t);
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, '__quickreplies');

	const message = 'Spending patterns';
	const displayText = 'Spending patterns display';

	await utils.clickQuickReplyWithText(t, message);
	await utils.expectLastUserBubbleText(t, displayText);
	await t.wait(3000);
	// await utils.verifyLastBubbleIsFromBot(t); this test won't work with api_version 3.2 and the new  POSTBACK payload
});

test('Quick Reply Scroll ', async t => {

	await utils.setupDebugMode(t);
	await utils.disableWidgetModeAndSplashScreen(t);
	await utils.typeAndSend(t, '__quickreplies');

	//verify the quick reply initial position is at the initial left margin of 50px
	await utils.verifyQuickReplyWrapperLeftPosition(t, 40);
	// draq quick reply by taping on the 4rd item starting from the end of the list and moving it  left of -560px
	await utils.dragQuickReplyHorizontallyFromItemIndex(t, -320, 5, true);


	//verify the quick reply neww position is at -330px
	await utils.verifyQuickReplyWrapperLeftPosition(t, -300, "lte");
	// drag quick reply by taping on the 7th item from the start of the list and moving it right of 560px
	await utils.dragQuickReplyHorizontallyFromItemIndex(t, 300, 5, false);

	//verify the quick reply neww position is superior to 0px
	await utils.verifyQuickReplyWrapperLeftPosition(t, 0, "gte");
});

