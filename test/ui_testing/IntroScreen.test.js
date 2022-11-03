import { Selector, t, ClientFunction } from 'testcafe';
import config from "../Config.js";
import utils from '../Utils';

fixture(`Intro Screen Tests`)
  .page(config.urlBase);
