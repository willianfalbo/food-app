import { FoodAppPage } from './app.po';

describe('Food App', function() {
  let page: FoodAppPage;

  beforeEach(() => {
    page = new FoodAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('mt works!');
  });
});
