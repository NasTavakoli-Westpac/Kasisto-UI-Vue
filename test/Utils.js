import { Selector, t, ClientFunction } from 'testcafe';

import config from "./Config.js";


const getStorage = ClientFunction(() => $store.state);
const setStorage = ClientFunction((property, newValue) => $store.state[property] = newValue);
const sendGenericEvent = ClientFunction((type, optionalMetafields) => Kai.Core.sendGenericEvent(type, optionalMetafields));
const setAdditionalRequestHeaders = ClientFunction((headers) => kserver.CoreAPI.setAdditionalRequestHeaders(headers));
const getEnvUrl = ClientFunction(() => ENV.SERVER_CONFIG.SERVER_URL);

async function clickSend(t) {
    await t
        .click('.kai-send-button');
}

async function typeAndSend(t, text) {
    await t
        .typeText(Selector('.kai-input-prompt').nth(-1), text)
        .click('.kai-send-button');
}

async function sendStartSessionEvent(t, text) {
    var api = await sendGenericEvent("START_SESSION", {});
}

async function additionalRequestHeaders(t, assistantName, assistantTarget) {
    var headers = {};
    if (assistantName) {
        headers.assistant_name = assistantName;
    }
    if (assistantTarget) {
        headers.assistant_target = assistantTarget;
    }

    await setAdditionalRequestHeaders(headers);
}

async function setupDebugMode(t) {
     await t
    // typeAndSend(t, '__debug=true');

    // directly set the debug mode to true in the webview config file to avoid loosing time displaying hte debug window everytime
    await setStorage("debug", true);

}

async function disableWidgetModeAndSplashScreen(t) {
    await setStorage("useWidgetMode", false);
    await setStorage("useHeaderBar", false);
    await setStorage("useSplashScreen", false);

}

async function printServerUrl () {
    console.log("SERVER_URL: " + await getEnvUrl());
}
/* ************************************************************************ */
/*                Methods specifics to Text components                    */
/* ************************************************************************ */


async function expectLastUserBubbleText(t, text) {
    await t
        .expect(Selector(".kai-chat-message.kai-right .kai-chat-message-text").nth(-1).innerText).eql(text, "The last User bubble is not displaying the expected message");
}

async function expectNthLastUserBubbleText(t, lastNthChild, text) {
    await t
        .expect(Selector(".kai-chat-message.kai-right .kai-chat-message-text").nth(-lastNthChild).innerText).eql(text, "The nth last User bubble is not displaying the expected message");
}


async function expectLastBotBubbleText(t, text) {
    await t
        .expect(Selector(".kai-chat-message.kai-left .kai-chat-message-text").nth(-1).innerText).eql(text, "The last bot bubble is not displaying the expected message");
}

async function verifyLastBubbleIsFromBot(t) {
    await t
        .expect(Selector(".kai-user-wrapper").nth(-1).hasClass('kai-left-wrapper')).eql(true, "The last bubble message displayed is not from the Bot");
        
}

async function verifyLastBubbleIsFromUser(t) {
    await t
        .expect(Selector(".kai-user-wrapper").nth(-1).hasClass('kai-right-wrapper')).eql(true, "The last bubble message displayed is not from the User");
        
}

/* ************************************************************************ */
/*                Methods specifics to Button components                    */
/* ************************************************************************ */

async function expectSingleBotButton(t) {
    await t
        .expect(Selector('.kai-content-button').visible).ok()
}

async function expectSingleBotButtonText(t, text) {
    await t
        .expect(Selector('.kai-content-button').visible).ok()
        .expect(Selector(".kai-content-button").innerText).eql(text, "The last bot bubble is not displaying the expected message");
}

async function clickSingleBotButtonWithText(t, text) {
    await t
        .click(Selector('.kai-card-button.kai-button').withText(text));
}

/* ************************************************************************ */
/*                Methods specifics to Select components                    */
/* ************************************************************************ */

async function verifyLastSelectErrorMessage(t, expectedMessage) {
    // verify clicking on Submit display insufficient selection message
    await t
        .expect(Selector('.notif-chip').nth(-1).innerText).eql(expectedMessage, "This select component is not displaying the expected message");
}

async function verifyLastSelectErrorMessageIsShown(t, isShown) {
    // Verify Select Error message is not shown
    await t
        .expect(Selector('.notif-chip').nth(-1)).eql(isShown, "This select component error message is not having the expected status");
}

async function verifySelectCarouselNthCardNthButtonActivationStatus(t, nthItem, nthButton, isActivated) {
    // verify clicking on the button make it "selected" using the kai_card_button_active class
    await t
        .expect(Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').nth(nthItem).find('.kai-card-button').nth(nthButton).hasClass('kai_card_button_active')).eql(isActivated, "This selectCarousel card is not having the expected status");
}

async function verifySelectListNthCardNthButtonActivationStatus(t, nthItem, nthButton, isActivated) {
    // verify clicking on the button make it "selected" using the kai_card_button_active class
    await t
        .expect(Selector('.kai-card-large-template .kai-card-large-container.wrapper').nth(nthItem).find('.button.list-button.kai-card-button').nth(nthButton).hasClass('kai_card_button_active')).eql(isActivated, "This selectList item is not having the expected status");
}

async function verifySelectListNthCardNthInlineButtonActivationStatus(t, nthItem, nthButton, isActivated) {
    // verify clicking on the button make it "selected" using the kai_card_button_active class
    await t
        .expect(Selector('.kai-card-large-template .kai-card-large-container.wrapper').nth(nthItem).find('.list-inline-button-item').nth(nthButton).hasClass('kai_card_button_active')).eql(isActivated, "This selectList item is not having the expected status");
}

async function verifySelectChecklistNthCardNthButtonActivationStatus(t, nthItem, nthButton, isActivated) {
    // verify clicking on the check box make it "checked"
    await t
        .expect(Selector('.kai-multi-select-container .desktop-view>div').nth(nthItem).find('label>input').nth(nthButton).checked).eql(isActivated, "This selectChecklist checkbox is not having the expected status");
}



/* ************************************************************************ */


/* ************************************************************************ */
/*                Methods specifics to Card components                  */
/* ************************************************************************ */



async function verifyButtonCountForCard(t, expectedCount) {
    await t
        //.expect(Selector('.kai-card-wrapper').nth(-1).find('.kai-card-item').count).eql(expectedCount, "The number of buttons on this card is incorrect");
        .expect(Selector('.kai-card-item').count).eql(expectedCount, "The number of buttons on this card is incorrect");

}

/* ************************************************************************ */
/*                Methods specifics to Carousel components                  */
/* ************************************************************************ */

async function verifyCarouselCardCount(t, expectedCount) {
    await t
        .expect(Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').count).eql(expectedCount, "The number of cards in this carousel is incorrect");

}

async function clickCarouselCardButtonWithText(t, text){
    await t
    .click(Selector(".kai-card-wraper .kai-card-item .kai-card-item-footer .kai-card-button-container .kai-card-button").withText(text));
}

async function clickOnCarouselCardIndexButtonIndex(t, itemIndex, buttonIndex) {
    // Click on Carousel nth item and nth button
    await t
        .click(Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').nth(itemIndex).find('.kai-card-button').nth(buttonIndex));
}

async function verifyCarouselButtonCountForCard(t, itemIndex, expectedButtonCount) {
    // Click on Carousel nth item and nth button
    await t
        .expect(Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').nth(itemIndex).find('.kai-card-button').count).eql(expectedButtonCount, "The number of buttons for this carousel card is incorrect");
}

async function verifyAllCarouselCardsHeightAreMatching(t) {
    // Click on Carousel nth item and nth button
    const count = await Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').count;
    var referenceHeight;
    var isMatching = true;
    for (var i = 0; i < count; i++) {
        if (i == 0) {
            referenceHeight = await Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').nth(i).getBoundingClientRectProperty('height');
        } else {
            var height = await Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').nth(i).getBoundingClientRectProperty('height');
            if (referenceHeight != height) {
                isMatching = false;
            }
        }
    }
    await t
        .expect(isMatching).eql(true, "The carousel cards height is not meeting the expectation");
}

async function clickOnCarouselPagerDotIndex(t, dotIndex) {
    await t
        .click(Selector('.kai-card-carousel-pager').nth(-1).find('.kai-card-carousel-pager-item').nth(dotIndex));
}

async function verifyCarouselDotCount(t, expectedCount) {
    await t
        .expect(Selector('.kai-card-carousel-pager').nth(-1).find('.kai-card-carousel-pager-item').count).eql(expectedCount, "The number of dots for this carousel pager is incorrect");
}

async function verifyCarouselDotIndexStatus(t, dotIndex, isActivated) {
    await t
        .expect(Selector('.kai-card-carousel-pager').nth(-1).find('.kai-card-carousel-pager-item').nth(dotIndex).hasClass('active')).eql(isActivated, "This carousel dot is not having the expected status");
}

async function clickOnCarouselLeftArrow(t) {
    // Click on selectCarousel left arrow to move carousel left
    await t
        .click(Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel-nav-left-container'));
}

async function clickOnCarouselRightArrow(t) {
    // Click on selectCarousel right arrow to move carousel right
    await t
        .click(Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel-nav-right-container'));
}

async function changeCardSizeMode(cardMode) {
    await setStorage("cardSizeMode", cardMode);
}

async function verifyCarouselWrapperLeftPosition(t, expectedLeftPosition, optionalComparisonSign) {
    const CarouselSelector = Selector('.kai-card-carousel-wrapper .transition');
    // console.log(await CarouselSelector.getBoundingClientRectProperty('left'));
    if (optionalComparisonSign && optionalComparisonSign == 'lte') {
        await t
            .expect(CarouselSelector.getBoundingClientRectProperty('left')).lte(expectedLeftPosition);
    } else if (optionalComparisonSign && optionalComparisonSign == 'gte') {
        await t
            .expect(CarouselSelector.getBoundingClientRectProperty('left')).gte(expectedLeftPosition);
    } else {
        await t
            .expect(CarouselSelector.getBoundingClientRectProperty('left')).eql(expectedLeftPosition);
    }
}

async function dragCarouselHorizontallyFromItemIndex(t, dragOffsetX, itemIndex, useIndexFromEndOfList) {

    if (useIndexFromEndOfList) {
        itemIndex = -1 * itemIndex;
    }
    await t
        .drag(Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').nth(itemIndex), dragOffsetX, 0);
}

async function clickOnCarouselCardIndexExpandButton(t, itemIndex) {
    // Click on Carousel nth item and nth button
    await t
        .click(Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').nth(itemIndex).find('.card-expand-button-wrapper').nth(-1));
}

async function verifyExcpandButtonForCard(t, itemIndex) {
    // Verify an expand button is present on the caroousel card at index
    await t
        .expect(Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').nth(itemIndex).find('.card-expand-button-wrapper').count).eql(1, "The number of expand button for this card is not equat to 1");
}

async function verifyCarouselCardIndexExpand(t, itemIndex) {
    var heightIncreased = false;
    var initialHeight = await Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').nth(itemIndex).find('.kai-card-item-footer').getBoundingClientRectProperty('height');
    await verifyExcpandButtonForCard(t, itemIndex);

    await clickOnCarouselCardIndexExpandButton(t, itemIndex);

    var newHeight = await Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').nth(itemIndex).find('.kai-card-item-footer').getBoundingClientRectProperty('height');
    if (initialHeight < newHeight) {
        heightIncreased = true;
    }

    await t.expect(heightIncreased).eql(true, "The carousel cards is not expanding correctly.");

}

async function verifyCarouselCardIndexCollapse(t, itemIndex) {
    var heightDecrease = false;
    var initialHeight = await Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').nth(itemIndex).find('.kai-card-item-footer').getBoundingClientRectProperty('height');
    await verifyExcpandButtonForCard(t, itemIndex);

    await clickOnCarouselCardIndexExpandButton(t, itemIndex);

    var newHeight = await Selector('.kai-card-carousel-wrapper').nth(-1).find('.kai-card-carousel .kai-card-item').nth(itemIndex).find('.kai-card-item-footer').getBoundingClientRectProperty('height');
    if (initialHeight > newHeight) {
        heightDecrease = true;
    }

    await t.expect(heightDecrease).eql(true, "The carousel cards is not collapsing correctly.");

}

/* ************************************************************************ */

/* ************************************************************************ */
/*                Methods specifics to List components                      */
/* ************************************************************************ */

async function verifyListItemCount(t, expectedCount) {
    await t
        .expect(Selector('.kai-card-large-template .item.kai-card-large-template').count).eql(expectedCount, "The number of items in this List is incorrect");
}


async function clickOnListItemIndexButtonIndex(t, itemIndex, buttonIndex) {
    // Click on List nth item and nth button
    await t
        .click(Selector('.kai-card-large-template .kai-card-large-container.wrapper').nth(itemIndex).find('.button.list-button.kai-card-button').nth(buttonIndex));
}

async function clickOnListItemIndexInlineButtonIndex(t, itemIndex, buttonIndex) {
    await t.click(Selector('.kai-card-large-item.kai-card-large-container').nth(itemIndex).find('.list-inline-button-item').nth(buttonIndex));
}

async function clickOnListGroupedItemIndexButtonIndex(t, itemIndex, buttonIndex) {
    // Click on List nth item and nth button
    await t
        .click(Selector('.kai-card-large-template section').nth(itemIndex).find('.list-inline-button-item').nth(buttonIndex));
}

async function changeListInlineButtonMode(inLine) {
    await setStorage("inlineButtonModeForList", inLine);
}



/* ************************************************************************ */

/* ************************************************************************ */
/*                Methods specifics to SelectChecklist components              */
/* ************************************************************************ */

async function verifySelectChecklistItemCount(t, expectedCount) {
    await t
        .expect(Selector('.kai-multi-select-container .desktop-view>div').count).eql(expectedCount, "The number of items in this selectChecklist is incorrect");
}


async function clickOnSelectChecklistItemIndexButtonIndex(t, itemIndex, buttonIndex) {
    // Click on List nth item and nth button
    await t
        .click(Selector('.kai-multi-select-container .desktop-view>div').nth(itemIndex).find('label').nth(buttonIndex));
}


/* ************************************************************************ */




/* ************************************************************************ */
/*                Methods specifics to Quick Reply components               */
/* ************************************************************************ */

async function verifyQuickReplyItemCount(t, expectedCount) {
    await t
        .expect(Selector(".quickreplies .kai-quick-reply-item").count).eql(expectedCount, 'The number of items in this quick reply is incorrect');

}

async function verifyQuickReplyDotCount(t, expectedCount) {
    await t
        .expect(Selector(".quickreplies .kai-card-carousel-pager-item").count).eql(expectedCount, "The number of dots for this quick reply pager is incorrect");
}

async function clickQuickReplyWithText(t, text) {
    await t
        .click(Selector(".quickreplies .kai-card-carousel-wrapper .kai-quick-reply-item .kai-quick-reply-label").withText(text));
}

async function verifyQuickReplyWrapperLeftPosition(t, expectedLeftPosition, optionalComparisonSign) {
    const quickReplySelector = Selector('.quickreplies .transition');
    if (optionalComparisonSign && optionalComparisonSign == 'lte') {
        await t
            .expect(quickReplySelector.getBoundingClientRectProperty('left')).lte(expectedLeftPosition);
    } else if (optionalComparisonSign && optionalComparisonSign == 'gte') {
        await t
            .expect(quickReplySelector.getBoundingClientRectProperty('left')).gte(expectedLeftPosition);
    } else {
        await t
            .expect(quickReplySelector.getBoundingClientRectProperty('left')).eql(expectedLeftPosition);
    }
}

async function dragQuickReplyHorizontallyFromItemIndex(t, dragOffsetX, itemIndex, useIndexFromEndOfList) {

    if (useIndexFromEndOfList) {
        itemIndex = -1 * itemIndex;
    }
    await t
        .drag(Selector('.quickreplies .kai-quick-reply-item').nth(itemIndex), dragOffsetX, 0);
}

/* ************************************************************************ */
/*                Multiple Misc specifics components                    */
/* ************************************************************************ */

async function verifyTextBubbleItemCount(t, expectedCount) {
    await t
        .expect(Selector('#kai-core-components').nth(-1).find('.kai-left-wrapper').count).eql(expectedCount, "The number of multiple bot bubble text incorrect");

}

async function verifyButtonItemCount(t, expectedCount) {
    await t
        .expect(Selector('#kai-core-components').nth(-1).find('.kai-button-template').count).eql(expectedCount, "The number of multiple buttons incorrect");

}

async function verifyCardItemCount(t, expectedCount) {
    await t
        .expect(Selector('#kai-core-components').nth(-1).find('.card-single-wrapper').count).eql(expectedCount, "The number of multiple buttons incorrect");

}

/* ************************************************************************ */
/*                Default Misc components check                   */
/* ************************************************************************ */


async function clickButtonPickerVerifyText(t, text) {
    await t
       .click(Selector('.kai-card-button.kai-button').withText(text));
}

async function verifyCarouselSelect(t, count) {
       for(let i=0; i<count; i++){ 
        await t 
        .click(Selector('.kai-card-item').nth(i)) 
        } 
}

async function verifyListSelect(t, count) {
    for(let i=0; i<count; i++){ 
     await t 
     .click(Selector('.kai-card-large-item').nth(i)) 
     } 
}

async function clickSelectChecklist(t, text) {
    await t
        .click(Selector('.kai-multi-select-container .desktop-view>div'))
        .click(Selector('.kai-multi-select-container .desktop-view>div').find('span').withText(text))
        .expect(Selector('.kai-multi-select-container .desktop-view>div').find('input').value).eql('2345');
}

async function testLocationPickerComponent(t, text) {
    await t
        .click('.pac-target-input')
        .pressKey('ctrl+a delete') 
        .typeText('.pac-target-input', text)
        .click('#validatePosition');    
}

async function testDatePickerComponent(t, date) {
    await t
    .click(Selector('.webview--app > div.dateCalendar-module.dc-fx-3.dc-visible > div > div.dateCalendar-inner-container > div > div.datepicker-days > table').find('.day').withText(date))
    .click('.submit-button');    
}

async function clearSelectOptionIndex(t, index) {
    await t
    .click(Selector('.selected-delete-icon').nth(index));
}


/* ************************************************************************ */



export default {
    clickSend,
    typeAndSend,
    setupDebugMode,
    expectLastUserBubbleText,
    expectNthLastUserBubbleText,
    expectLastBotBubbleText,
    verifyLastBubbleIsFromBot,
    verifyLastBubbleIsFromUser,
    expectSingleBotButton,
    expectSingleBotButtonText,
    clickSingleBotButtonWithText,
    verifyCardItemCount,
    verifyButtonItemCount,
    verifyTextBubbleItemCount,
    verifyQuickReplyItemCount,
    verifyQuickReplyDotCount,
    clickQuickReplyWithText,
    clickCarouselCardButtonWithText,
    verifyQuickReplyWrapperLeftPosition,
    dragQuickReplyHorizontallyFromItemIndex,
    verifyLastSelectErrorMessage,
    verifyLastSelectErrorMessageIsShown,
    verifySelectCarouselNthCardNthButtonActivationStatus,
    verifySelectListNthCardNthButtonActivationStatus,
    verifySelectListNthCardNthInlineButtonActivationStatus,
    verifySelectChecklistNthCardNthButtonActivationStatus,
    verifyCarouselCardCount,
    verifyButtonCountForCard,
    clickOnCarouselCardIndexButtonIndex,
    verifyAllCarouselCardsHeightAreMatching,
    verifyCarouselButtonCountForCard,
    verifyCarouselDotCount,
    clickOnCarouselPagerDotIndex,
    verifyCarouselDotIndexStatus,
    clickOnCarouselLeftArrow,
    clickOnCarouselRightArrow,
    changeCardSizeMode,
    verifyCarouselWrapperLeftPosition,
    dragCarouselHorizontallyFromItemIndex,
    verifyListItemCount,
    clickOnListItemIndexButtonIndex,
    clickOnListItemIndexInlineButtonIndex,
    clickOnListGroupedItemIndexButtonIndex,
    changeListInlineButtonMode,
    verifySelectChecklistItemCount,
    clickOnSelectChecklistItemIndexButtonIndex,
    clickOnCarouselCardIndexExpandButton,
    verifyExcpandButtonForCard,
    verifyCarouselCardIndexExpand,
    verifyCarouselCardIndexCollapse,
    printServerUrl,
    sendStartSessionEvent,
    additionalRequestHeaders,
    clickButtonPickerVerifyText,
    verifyCarouselSelect,
    verifyListSelect,
    clickSelectChecklist,
    testLocationPickerComponent,
    testDatePickerComponent,
    clearSelectOptionIndex,
    disableWidgetModeAndSplashScreen
}
