const fetch = require('node-fetch');

(async () => {
  try {
    console.log('Fetching TrustMRR data...');
    
    // Try to get data from TrustMRR API or public endpoint
    const urls = [
      'https://www.trustmrr.com/api/startups',
      'https://www.trustmrr.com/api/companies',
      'https://api.trustmrr.com/startups',
      'https://www.trustmrr.com/data',
    ];
    
    for (const url of urls) {
      try {
        console.log(`Trying: ${url}`);
        const response = await fetch(url, { timeout: 5000 });
        if (response.ok) {
          const data = await response.json();
          console.log(`Success! Found ${Array.isArray(data) ? data.length : 'data'} items`);
          console.log('Sample:', JSON.stringify(data).substring(0, 200));
          break;
        }
      } catch (e) {
        console.log(`Failed: ${e.message}`);
      }
    }
    
    // Also try scraping the HTML
    console.log('\nTrying HTML scrape...');
    const html = await fetch('https://www.trustmrr.com').then(r => r.text());
    
    // Look for startup data in HTML
    const startupPattern = /"name"\s*:\s*"([^"]+)"/g;
    const matches = [...html.matchAll(startupPattern)];
    console.log(`Found ${matches.length} potential startups in HTML`);
    if (matches.length > 0) {
      console.log('Samples:', matches.slice(0, 5).map(m => m[1]));
    }
    
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
