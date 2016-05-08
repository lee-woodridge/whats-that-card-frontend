export class Angular2ProjectPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angular2-project-app h1')).getText();
  }
}
