import { EuropaPage } from './app.po';

describe('europa App', function() {
  let page: EuropaPage;

  beforeEach(() => {
    page = new EuropaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
