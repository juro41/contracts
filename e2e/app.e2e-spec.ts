import { ContractsPage } from './app.po';

describe('contracts App', () => {
  let page: ContractsPage;

  beforeEach(() => {
    page = new ContractsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
