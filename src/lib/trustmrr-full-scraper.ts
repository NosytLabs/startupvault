import puppeteer from 'puppeteer';

export interface TrustMRRStartup {
  name: string;
  description: string;
  revenue: number;
  mrr: number;
  founder: string;
  industry: string;
  stage: string;
  website?: string;
}

export async function scrapeAllTrustMRRStartups(): Promise<TrustMRRStartup[]> {
  let browser;
  const startups: TrustMRRStartup[] = [];

  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
      headless: true,
    });

    const page = await browser.newPage();
    await page.setDefaultTimeout(30000);
    await page.setDefaultNavigationTimeout(40000);

    console.log('Starting TrustMRR scrape...');
    await page.goto('https://trustmrr.com', { waitUntil: 'networkidle2' });

    // Scroll and load all data
    let previousHeight = 0;
    let attempts = 0;
    const maxAttempts = 50;

    while (attempts < maxAttempts) {
      const newHeight = await page.evaluate(() => document.body.scrollHeight);

      if (newHeight === previousHeight) {
        console.log('Reached end of page');
        break;
      }

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await new Promise((r) => setTimeout(r, 2000));

      previousHeight = newHeight;
      attempts++;
      console.log(`Scroll attempt ${attempts}, page height: ${newHeight}`);
    }

    // Extract all startup rows from the table
    const data = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tbody tr'));
      console.log(`Found ${rows.length} startup rows`);

      return rows
        .map((row) => {
          try {
            const cells = row.querySelectorAll('td');
            if (cells.length < 4) return null;

            // Extract data from cells
            const nameCell = cells[1]?.textContent?.trim() || '';
            const founderCell = cells[2]?.textContent?.trim() || '';
            const revenueCell = cells[3]?.textContent?.trim() || '';
            const mrrCell = cells[4]?.textContent?.trim() || '';

            if (!nameCell) return null;

            // Parse revenue and MRR (remove $, commas, etc)
            const revenue = parseInt(revenueCell.replace(/[^0-9]/g, '')) || 0;
            const mrr = parseInt(mrrCell.replace(/[^0-9]/g, '')) || 0;

            return {
              name: nameCell,
              founder: founderCell || 'Unknown',
              revenue,
              mrr,
              description: `${nameCell} - Verified on TrustMRR`,
              industry: 'SaaS', // Default, could be enhanced
              stage: revenue > 10000000 ? 'Scale' : mrr > 100000 ? 'Growth' : 'Early',
              website: undefined,
            };
          } catch (e) {
            console.error('Error parsing row:', e);
            return null;
          }
        })
        .filter((s): s is Omit<TrustMRRStartup, 'website'> | null => s !== null);
    });

    startups.push(...(data as TrustMRRStartup[]));
    console.log(`Successfully scraped ${startups.length} startups`);

    // Try to get detailed info for each startup (enhanced with founder URLs)
    console.log('Fetching founder profiles...');
    for (let i = 0; i < Math.min(startups.length, 10); i++) {
      try {
        const startup = startups[i];
        // Try to find founder page or company website
        await page.goto(`https://trustmrr.com/founder/${startup.founder.toLowerCase()}`, {
          waitUntil: 'networkidle0',
          timeout: 15000,
        }).catch(() => null);

        const founderData = await page.evaluate(() => {
          const bio = document.querySelector('[class*="bio"]')?.textContent || '';
          const website = Array.from(document.querySelectorAll('a'))
            .find((a) => a.href.includes('http') && !a.href.includes('trustmrr'))
            ?.href;
          return { bio, website };
        }).catch(() => ({}));

        if (founderData.website) {
          startup.website = founderData.website;
        }
      } catch (err) {
        // Silently continue
      }
    }

    await browser.close();
    return startups;
  } catch (error) {
    console.error('TrustMRR scraping error:', error);
    if (browser) await browser.close().catch(() => {});
    throw new Error(`Failed to scrape TrustMRR: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Cache for scraped data
let cachedStartups: TrustMRRStartup[] | null = null;
let lastScrapedTime = 0;
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

export async function getAllTrustMRRStartups(forceRefresh = false): Promise<TrustMRRStartup[]> {
  const now = Date.now();

  if (!forceRefresh && cachedStartups && now - lastScrapedTime < CACHE_DURATION) {
    console.log(`Using cached data: ${cachedStartups.length} startups`);
    return cachedStartups;
  }

  try {
    console.log('Scraping fresh TrustMRR data...');
    cachedStartups = await scrapeAllTrustMRRStartups();
    lastScrapedTime = now;
    return cachedStartups;
  } catch (error) {
    if (cachedStartups) {
      console.log('Using cached data due to scrape error');
      return cachedStartups;
    }
    throw error;
  }
}
