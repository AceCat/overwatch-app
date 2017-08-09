import { OverwatchFrontendPage } from './app.po';

describe('overwatch-frontend App', () => {
  let page: OverwatchFrontendPage;

  beforeEach(() => {
    page = new OverwatchFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
