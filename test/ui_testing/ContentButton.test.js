import { Selector, t, ClientFunction } from 'testcafe';
import config from "../Config.js";
import utils from '../Utils';

fixture(`Content Button Tests`)
  .page(config.urlBase);
