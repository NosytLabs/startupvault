const { execSync } = require('child_process');

try {
  console.log('Fetching TrustMRR website...');
  const html = execSync('curl -s "https://www.trustmrr.com" --max-time 10', { encoding: 'utf-8' });
  
  console.log(`Fetched ${html.length} bytes`);
  
  // Look for JSON data in the HTML
  const jsonMatch = html.match(/window\.__INITIAL_STATE__\s*=\s*({.*?});/s);
  if (jsonMatch) {
    const data = JSON.parse(jsonMatch[1]);
    console.log('Found initial state data');
    console.log(JSON.stringify(data).substring(0, 300));
  }
  
  // Look for startup data patterns
  const nameMatches = html.match(/"name"\s*:\s*"([^"]+)"/g) || [];
  console.log(`Found ${nameMatches.length} name patterns`);
  
  // Extract table data
  const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/);
  if (tableMatch) {
    const rows = tableMatch[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/g) || [];
    console.log(`Found ${rows.length} table rows`);
    
    if (rows.length > 0) {
      const cells = rows[0].match(/<td[^>]*>([\s\S]*?)<\/td>/g) || [];
      console.log(`First row has ${cells.length} cells`);
    }
  }
  
} catch (err) {
  console.error('Error:', err.message);
}
