import puppeteer from 'puppeteer';

export interface TrustMRRStartup {
  name: string;
  founder: string;
  description: string;
  revenue: number;
  mrr: number;
  industry: string;
  stage: string;
  website?: string;
  featured?: boolean;
}

export async function scrapeTrustMRR(): Promise<TrustMRRStartup[]> {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
      headless: true,
    });

    const page = await browser.newPage();
    await page.setDefaultTimeout(20000);
    await page.setDefaultNavigationTimeout(30000);

    // Navigate to TrustMRR leaderboard
    console.log('Fetching TrustMRR leaderboard...');
    await page.goto('https://trustmrr.com', { waitUntil: 'networkidle2' });

    // Extract startup data from the leaderboard table
    const startups = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tbody tr'));
      return rows.map((row) => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 5) return null;

        const name = cells[1]?.textContent?.trim() || '';
        const founder = cells[2]?.textContent?.trim() || '';
        const revenueText = cells[3]?.textContent?.trim() || '0';
        const mrrText = cells[4]?.textContent?.trim() || '0';

        // Parse revenue and MRR (remove $, commas, etc)
        const revenue = parseInt(revenueText.replace(/[^0-9]/g, '')) || 0;
        const mrr = parseInt(mrrText.replace(/[^0-9]/g, '')) || 0;

        return {
          name,
          founder,
          revenue,
          mrr,
          description: `${name} - Verified startup with real MRR data`,
          industry: 'SaaS', // Default, could be improved
          stage: 'Growth', // Default, could be improved
        };
      }).filter(Boolean);
    });

    console.log(`Scraped ${startups.length} startups from TrustMRR`);

    // Try to get individual startup details by scrolling and loading more
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 5);
    });

    await new Promise((r) => setTimeout(r, 2000));

    const moreStartups = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tbody tr'));
      return rows.slice(startups.length).map((row) => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 5) return null;

        const name = cells[1]?.textContent?.trim() || '';
        const founder = cells[2]?.textContent?.trim() || '';
        const revenueText = cells[3]?.textContent?.trim() || '0';
        const mrrText = cells[4]?.textContent?.trim() || '0';

        const revenue = parseInt(revenueText.replace(/[^0-9]/g, '')) || 0;
        const mrr = parseInt(mrrText.replace(/[^0-9]/g, '')) || 0;

        return {
          name,
          founder,
          revenue,
          mrr,
          description: `${name} - Verified startup with real MRR data`,
          industry: 'SaaS',
          stage: 'Growth',
        };
      }).filter(Boolean);
    }) as any[];

    const allStartups = [...startups, ...moreStartups];

    await browser.close();
    return allStartups;
  } catch (error) {
    console.error('TrustMRR scraping error:', error);
    if (browser) await browser.close().catch(() => {});
    throw new Error(`Failed to scrape TrustMRR: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Cache for scraped data (in production, use database)
let cachedStartups: TrustMRRStartup[] | null = null;
let lastScrapedTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function getTrustMRRData(): Promise<TrustMRRStartup[]> {
  const now = Date.now();

  if (cachedStartups && now - lastScrapedTime < CACHE_DURATION) {
    return cachedStartups;
  }

  try {
    cachedStartups = await scrapeTrustMRR();
    lastScrapedTime = now;
    return cachedStartups;
  } catch (error) {
    // Fallback to cached data if available
    if (cachedStartups) return cachedStartups;
    throw error;
  }
}
