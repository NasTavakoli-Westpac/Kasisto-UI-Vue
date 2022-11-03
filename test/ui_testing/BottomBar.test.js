import { Selector, t, ClientFunction } from 'testcafe';
import config from "../Config.js";
import utils from '../Utils';


fixture(`Bottom Bar Tests`)
  .page(config.urlBase);


test('Can type and send message', async t => {
	await utils.disableWidgetModeAndSplashScreen(t);
	const message = 'What can you do for me?';
	await utils.typeAndSend(t, message);
	await utils.expectLastUserBubbleText(t, message);
});

test('Remove JS And CSS text in message', async t => {
	await utils.disableWidgetModeAndSplashScreen(t);
	const message = '<script type="text/javascript">alert("hi");</script>text that should show<style type="text/css">body{display:none !important;}</style>';
	await utils.typeAndSend(t, message);
	await utils.expectLastUserBubbleText(t, 'text that should show');
});

test('Check Emoji Response', async t => {
	await utils.disableWidgetModeAndSplashScreen(t);
	const message = '😀';
	await utils.typeAndSend(t, message);
	await utils.expectLastUserBubbleText(t,message);
});
