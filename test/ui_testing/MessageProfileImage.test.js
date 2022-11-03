import { Selector, t, ClientFunction } from 'testcafe';
import config from "../Config.js";
import utils from '../Utils';

fixture(`Message Profile Image Tests`)
  .page(config.urlBase);
