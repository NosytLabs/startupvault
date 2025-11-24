const { BrowserUse } = require('browser-use-sdk');

(async () => {
  const browser = new BrowserUse({
    headless: true,
    timeout: 30000
  });

  try {
    console.log('Starting browser automation...');
    await browser.start();
    
    console.log('Navigating to TrustMRR...');
    await browser.goto('https://www.trustmrr.com');
    
    // Scroll to load all content
    for (let i = 0; i < 5; i++) {
      await browser.scroll(5000);
      await browser.sleep(1000);
    }
    
    // Extract all startup data
    const html = await browser.getPageContent();
    const startupNames = html.match(/[A-Z][a-z\s\d&.'-]+/g) || [];
    
    console.log(`Found ${startupNames.length} potential startups`);
    console.log('Samples:', startupNames.slice(0, 20));
    
    await browser.close();
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
