'use strict';

function NavDrawer() {
  this.IS_DRAWER_OPEN = 'is-visible';
  this.drawer_ = document.querySelector('.mdl-layout__drawer');
  var drawerButton = document.querySelector('.wf-header__menu-btn');
  var obfuscator = document.querySelector('.mdl-layout__obfuscator');

  if (!this.drawer_) {
    throw new Error('Couldn\'t find an element with the class ' +
      'name \'mdl-layout__drawer\'');
  }
  if (!drawerButton) {
    throw new Error('Couldn\'t find an element with the class ' +
      'name \'wf-header__menu-btn\'');
  }

  drawerButton.addEventListener('click',
    this.drawerToggleHandler_.bind(this));
  if (obfuscator) {
    obfuscator.addEventListener('click',
      this.drawerToggleHandler_.bind(this));
  }
}

NavDrawer.prototype.drawerToggleHandler_ = function() {
  this.drawer_.classList.toggle(this.IS_DRAWER_OPEN);
};

/**
    **/

function init() {
  new NavDrawer();
}

document.addEventListener('DOMContentLoaded', init);

if (document.readyState !== 'loading') {
  init();
}
