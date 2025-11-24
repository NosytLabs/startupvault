const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to TrustMRR...');
    await page.goto('https://www.trustmrr.com', { waitUntil: 'load', timeout: 30000 });
    
    // Wait for content to load
    await page.waitForTimeout(3000);
    
    // Try to extract startup data
    const data = await page.evaluate(() => {
      const startups = [];
      
      // Look for startup rows/cards
      const rows = document.querySelectorAll('tr, [data-row], .company-row, [data-company]');
      console.log(`Found ${rows.length} rows`);
      
      // Try different selectors
      if (rows.length === 0) {
        // Try to find any visible startup names
        const allText = document.body.innerText;
        const lines = allText.split('\n').filter(l => l.trim().length > 0);
        return { text: lines.slice(0, 100), count: lines.length };
      }
      
      rows.forEach((row, idx) => {
        if (idx > 100) return; // Limit to first 100
        const cells = row.querySelectorAll('td, span, div');
        const rowData = Array.from(cells).map(c => c.textContent.trim()).filter(t => t.length > 0);
        if (rowData.length > 0) {
          startups.push(rowData);
        }
      });
      
      return { startups, totalRows: rows.length };
    });
    
    console.log('Data extracted:', JSON.stringify(data).substring(0, 1000));
    
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
