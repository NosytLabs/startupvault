const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting TrustMRR scraper...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://www.trustmrr.com', { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('Page loaded, waiting for content...');
    
    // Wait for startup cards/table to load
    await page.waitForTimeout(3000);
    
    // Try to extract all startup data from the page
    const startups = await page.evaluate(() => {
      const items = [];
      
      // Try multiple selectors to find startup data
      const rows = document.querySelectorAll('[data-startup], [data-company], .startup-row, tr, .company-card');
      
      if (rows.length === 0) {
        console.log('Trying alternative selectors...');
        // Get all visible text that looks like startup data
        const links = document.querySelectorAll('a');
        links.forEach(link => {
          const text = link.textContent.trim();
          if (text.length > 0 && text.length < 100) {
            items.push({ name: text, href: link.href });
          }
        });
      } else {
        rows.forEach(row => {
          const cells = row.querySelectorAll('td, div');
          if (cells.length > 0) {
            items.push({
              name: cells[0]?.textContent.trim() || '',
              revenue: cells[1]?.textContent.trim() || '',
              mrr: cells[2]?.textContent.trim() || '',
              founder: cells[3]?.textContent.trim() || '',
            });
          }
        });
      }
      
      return items;
    });
    
    console.log(`Found ${startups.length} items`);
    console.log('Sample:', startups.slice(0, 5));
    
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
