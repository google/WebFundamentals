/**
 * Tab panels are a pattern to limit visible content by separating
 * it into multiple panels. Only one panel is visible at a time, while
 * _all_ corresponding tabs are always visible. To switch from one panel
 * to another, the corresponding tab has to be selected.
 *
 * By either clicking or by using the arrow keys the user changes the
 * selection of the active tab.
 *
 * If JavaScript is disabled, all panels are shown interleaved with the
 * respective tabs. The tabs now function as headings.
 */
(function() {
  /**
   * Define key codes to help with handling keyboard events.
   */
  const KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    HOME: 36,
    END: 35,
  };

  /**
   * `HowtoTabs` is a container element for tabs and panels.
   *
   * All children of `<howto-tabs>` should be either `<howto-tab>` or
   * `<howto-tabpanel>`. This element is stateless, meaning that no values are
   * cached and therefore, changes during runtime work.
   */
  class HowtoTabs extends HTMLElement {
    constructor() {
      super();
    }

    /**
     * `connectedCallback` groups tabs and panels by reordering and makes sure
     * exactly one tab is active.
     */
    connectedCallback() {
      // The element needs to do some manual input event handling to allow
      // switching with arrow keys and Home/End.
      this.addEventListener('keydown', this._onKeyDown);
      this.addEventListener('click', this._onClick);

      this.setAttribute('role', 'tablist');

      // Before the elements starts booting, it waits for
      // the both `<howto-tab>` and `<howto-tabpanel>` to load.
      Promise.all([
        customElements.whenDefined('howto-tabs-tab'),
        customElements.whenDefined('howto-tabs-panel'),
      ]).then(_ => {
        // Acquire all tabs and panels inside the element
        const tabs = this._allTabs();
        const panels = this._allPanels();
        // If there are no tabs, there is no way to switch between panels.
        // Abort.
        if (tabs.length === 0) return;

        // Give each panel a `aria-labelledby` attribute that refers to the tab
        // that controls it.
        tabs.forEach(tab => {
          const panel = tab.nextElementSibling;
          if(panel.tagName !== 'HOWTO-TABS-PANEL') {
            console.error(`Tab #${tab.id} is not a` +
              `sibling of a <howto-tabs-panel>`);
            return;
          }

          tab.setAttribute('aria-controls', panel.id);
          panel.setAttribute('aria-labelledby', tab.id);
        });

        // For progressive enhancement, the markup should alternate between tabs
        // and panels. If JavaScript is disabled, all panels are
        // visible with their respective tab right above them.
        // If JavaScript is enabled, the element groups all children by type.
        // First all the tabs, then all the panels.
        // Calling `appendChild` on an already inserted element _moves_ the
        // element to the last position.
        tabs.forEach(tab => this.appendChild(tab));
        panels.forEach(panel => this.appendChild(panel));


        // The element checks if any of the tabs have been marked as selected.
        // If not, the first tab is now selected.
        const selectedTab =
          tabs.find(tab =>
            tab.getAttribute('aria-selected') === 'true') || tabs[0];

        // Next, we switch to the selected tab. `selectTab` takes care of
        // marking all other tabs as deselected and hiding all other panels.
        this._selectTab(selectedTab);
      });
    }

    /**
     * `_allPanels` returns all the panels in the tab panel. This function could
     * memoize the result if the DOM queries ever become a performance issue.
     * The downside of memoization is that dynamically added tabs and panels
     * will not be handled.
     *
     * This is a method and not a getter, because a getter implies that it is
     * cheap to read.
     */
    _allPanels() {
      return Array.from(this.querySelectorAll('howto-tabs-panel'));
    }
    /**
     * `_allTabs` returns all the tabs in the tab panel.
     */
    _allTabs() {
      return Array.from(this.querySelectorAll('howto-tabs-tab'));
    }

    /**
     * `_panelForTab` returns the panel that the given tab controls.
     */
    _panelForTab(tab) {
      const panelId = tab.getAttribute('aria-controls');
      return this.querySelector(`#${panelId}`);
    }

    /**
     * `_prevTab` returns the tab that comes before the currently selected one,
     * wrapping around when reaching the first one.
     */
    _prevTab() {
      const tabs = this._allTabs();
      // Use `findIndex` to find the index of the currently
      // selected element and subtracts one to get the index of the previous
      // element.
      let newIdx =
        tabs.findIndex(tab =>
          tab.getAttribute('aria-selected') === 'true') - 1;
      // Add `tabs.length` to make sure the index is a positive number
      // and get the modulus to wrap around if necessary.
      return tabs[(newIdx + tabs.length) % tabs.length];
    }

    /**
     * `_firstTab` returns the first tab.
     */
    _firstTab() {
      const tabs = this._allTabs();
      return tabs[0];
    }

    /**
     * `_lastTab` returns the last tab.
     */
    _lastTab() {
      const tabs = this._allTabs();
      return tabs[tabs.length - 1];
    }

    /**
     * `_nextTab` gets the tab that comes after the currently selected one,
     * wrapping around when reaching the last tab.
     */
    _nextTab() {
      const tabs = this._allTabs();
      let newIdx =
        tabs.findIndex(tab =>
          tab.getAttribute('aria-selected') === 'true') + 1;
      return tabs[newIdx % tabs.length];
    }

    /**
     * `reset` marks all tabs as deselected and hides all the panels.
     */
    reset() {
      const tabs = this._allTabs();
      const panels = this._allPanels();

      tabs.forEach(tab => {
        tab.tabIndex = -1;
        tab.setAttribute('aria-selected', 'false');
      });

      panels.forEach(panel => {
        panel.setAttribute('aria-hidden', 'true');
      });
    }

    /**
     * `disconnectedCallback` removes the event listeners that
     * `connectedCallback` added.
     */
    disconnectedCallback() {
      this.removeEventListener('keydown', this._onKeyDown);
      this.removeEventListener('click', this._onClick);
    }

    /**
     * `_selectTab` marks the given tab as selected.
     * Additionally, it unhides the panel corresponding to the given tab.
     */
    _selectTab(newTab) {
      // Deselect all tabs and hide all panels.
      this.reset();

      // Get the panel that the `newTab` is associated with.
      const newPanel = this._panelForTab(newTab);
      // If that panel doesn’t exist, abort.
      if (!newPanel) throw new Error(`No panel with id ${newPanelId}`);

      // Unhide the panel and mark the tab as active.
      newPanel.setAttribute('aria-hidden', 'false');
      newTab.setAttribute('aria-selected', 'true');
      newTab.tabIndex = 0;
      newTab.focus();
    }

    /**
     * `_onKeyDown` handles key presses inside the tab panel.
     */
    _onKeyDown(event) {
      // If the keypress did not originate from a tab element itself,
      // it was a keypress inside the a panel or on empty space. Nothing to do.
      if (event.target.getAttribute('role') !== 'tab') return;
      // Don’t handle modifier shortcuts typically used by assistive technology.
      if (event.altKey) return;

      // The switch-case will determine which tab should be marked as active
      // depending on the key that was pressed.
      let newTab;
      switch (event.keyCode) {
        case KEYCODE.LEFT:
        case KEYCODE.UP:
          newTab = this._prevTab();
          break;

        case KEYCODE.RIGHT:
        case KEYCODE.DOWN:
          newTab = this._nextTab();
          break;

        case KEYCODE.HOME:
          newTab = this._firstTab();
          break;

        case KEYCODE.END:
          newTab = this._lastTab();
          break;
        // Any other key press is ignored and passed back to the browser.
        default:
          return;
      }

      // The browser might have some native functionality bound to the arrow
      // keys, home or end. The element calls `preventDefault` to prevent the
      // browser from taking any actions.
      event.preventDefault();
      // Select the new tab, that has been determined in the switch-case.
      this._selectTab(newTab);
    }

    /**
     * `_onClick` handles clicks inside the tab panel.
     */
    _onClick(event) {
      // If the click was not targeted on a tab element itself,
      // it was a click inside the a panel or on empty space. Nothing to do.
      if (event.target.getAttribute('role') !== 'tab') return;
      // If it was on a tab element, though, select that tab.
      this._selectTab(event.target);
    }
  }
  window.customElements.define('howto-tabs', HowtoTabs);

  // `dashTabCounter` counts the number of `<howto-tab>` instances created. The
  // number is used to generated new, unique IDs.
  let dashTabCounter = 0;
  /**
   * `HowtoTabsTab` is a tab for a `<howto-tabs>` tab panel. `<howto-tabs-tab>`
   * should always be used with `role=heading` in the markup so that the
   * semantics remain useable when JavaScript is failing.
   *
   * A `<howto-tabs-tab>` declares which `<howto-tabs=panel>` it belongs to by
   * using that panel’s ID as the value for the `aria-controls` attribute.
   *
   * A `<howto-tabs-tab>` will automatically generate a unique ID if none
   * is specified.
   */
  class HowtoTabsTab extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      // If this is executed, JavaScript is working and the element
      // changes its role to `tab`.
      this.setAttribute('role', 'tab');
      if (!this.id)
        this.id = `howto-tabs-tab-generated-${dashTabCounter++}`;
    }
  }
  window.customElements.define('howto-tabs-tab', HowtoTabsTab);

  let dashPanelCounter = 0;
  /**
   * `HowtoTabsPanel` is a panel for a `<howto-tabs>` tab panel.
   */
  class HowtoTabsPanel extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'tabpanel');
      if (!this.id)
        this.id = `howto-tabs-panel-generated-${dashPanelCounter++}`;
    }
  }
  window.customElements.define('howto-tabs-panel', HowtoTabsPanel);
})();


