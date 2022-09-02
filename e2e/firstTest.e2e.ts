import {device, element, by, expect} from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({permissions: {contacts: 'YES'}});
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('sectionList'))).toBeVisible();
  });
  it('flatlist should visible when type to search input', async () => {
    await element(by.id('search-input')).tap();
    await element(by.id('search-input')).typeText('Anna');
    await expect(element(by.id('cancel-button'))).toBeVisible(100);
    await expect(element(by.id('flatlist'))).toBeVisible(50);
  });
});
