// XXX: This file isn't used right now

import 'dart:html';

final List<String> osList = const <String>['macos', 'windows', 'linux'];  // all supported OSs
String osName = 'linux'; // the currently displayed platform

/** Initializes osName and selects the corresponding radio button. */
void detectPlatform() {
  // osName is initially 'linux', since linux strings are unpredictable.
  if (window.navigator.appVersion.contains('Win')) {
    osName = 'windows';
  } else if (window.navigator.appVersion.contains('Mac')) {
    osName = 'macos';
  }
  document.querySelector('#$osName').attributes['checked'] = 'true';
}

/** Shows the text for the chosen platform (and no other). */
void filterPlatformText() {
  // Get all the platform-specific elements.
  osList.forEach((os) {
    bool shouldShow = (os == osName);
    document.querySelectorAll('.$os').forEach((el) {
      el.hidden = !shouldShow; // Show or hide each element.
    });
  });
}

/** Allows the user to choose the OS. */
void registerHandlers() {
  osList.forEach((os) {
    document.querySelector('#$os').onClick.listen((e) {
      osName = os;
      filterPlatformText();
    });
  });
}

/** Ready, set, go! */
void main() {
  detectPlatform();
  filterPlatformText();
  registerHandlers();
}
