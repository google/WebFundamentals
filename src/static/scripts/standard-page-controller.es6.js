'use strict';

import Debug from './debug';

export default class StandardPage {
  constructor() {
    window.WebFundamentals = {};
    window.WebFundamentals.Debug = new Debug();
  }
}

new StandardPage();
