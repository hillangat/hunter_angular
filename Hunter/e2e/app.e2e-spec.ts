import { HunterPage } from './app.po';

describe('hunter App', () => {
  let page: HunterPage;

  beforeEach(() => {
    page = new HunterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
