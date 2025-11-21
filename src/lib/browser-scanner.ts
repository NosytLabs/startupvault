import puppeteer from 'puppeteer';

export interface SiteAnalysis {
  url: string;
  title: string;
  description: string;
  features: string[];
  pricing: string[];
  techStack: string[];
  architecture: {
    framework?: string;
    styling?: string;
    hosting?: string;
    cms?: string;
  };
  cloningGuide: string[];
  rawContent: string;
}

export async function scanWebsite(url: string): Promise<SiteAnalysis> {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
      headless: true,
    });

    const page = await browser.newPage();
    await page.setDefaultTimeout(15000);
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Extract basic info
    const title = await page.title();
    const description = await page.$eval('meta[name="description"]', (el) => el.getAttribute('content')).catch(() => '');

    // Extract all text content
    const rawContent = await page.evaluate(() => {
      return document.body.innerText;
    });

    // Extract features (common patterns)
    const features = await page.evaluate(() => {
      const features: string[] = [];
      
      // Look for feature sections
      const headings = Array.from(document.querySelectorAll('h2, h3, h4'));
      const descriptions = headings
        .map((h) => {
          const text = h.textContent?.trim() || '';
          const next = h.nextElementSibling?.textContent?.trim() || '';
          return text && next ? `${text}: ${next.substring(0, 100)}` : text;
        })
        .filter((t) => t && t.length > 3);

      return descriptions.slice(0, 10);
    });

    // Extract pricing
    const pricing = await page.evaluate(() => {
      const prices: string[] = [];
      const priceElements = document.querySelectorAll('[class*="price"], [class*="plan"], [id*="pricing"]');
      priceElements.forEach((el) => {
        const text = el.textContent?.trim();
        if (text && text.match(/(\$|€|£|\d+)/)) {
          prices.push(text.substring(0, 150));
        }
      });
      return prices.slice(0, 5);
    });

    // Detect tech stack
    const techStack = await page.evaluate(() => {
      const techs: string[] = [];
      const html = document.documentElement.outerHTML;

      // Detect frameworks/libraries from meta tags and scripts
      if (html.includes('next')) techs.push('Next.js');
      if (html.includes('react')) techs.push('React');
      if (html.includes('vue')) techs.push('Vue');
      if (html.includes('angular')) techs.push('Angular');
      if (html.includes('tailwind')) techs.push('Tailwind CSS');
      if (html.includes('bootstrap')) techs.push('Bootstrap');
      if (html.includes('firebase')) techs.push('Firebase');
      if (html.includes('supabase')) techs.push('Supabase');
      if (html.includes('stripe')) techs.push('Stripe');

      // Look for script tags
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      scripts.forEach((s) => {
        const src = s.getAttribute('src') || '';
        if (src.includes('next')) techs.push('Next.js');
        if (src.includes('react')) techs.push('React');
      });

      return Array.from(new Set(techs));
    });

    // Generate cloning guide
    const cloningGuide = generateCloningGuide(title, features, pricing, techStack, rawContent);

    await browser.close();

    return {
      url,
      title,
      description: description || 'No description available',
      features,
      pricing,
      techStack,
      architecture: {
        framework: techStack.find((t) => ['Next.js', 'React', 'Vue', 'Angular'].includes(t)),
        styling: techStack.find((t) => ['Tailwind CSS', 'Bootstrap'].includes(t)),
        hosting: detectHosting(url),
        cms: detectCMS(rawContent),
      },
      cloningGuide,
      rawContent: rawContent.substring(0, 5000),
    };
  } catch (error) {
    throw new Error(`Failed to scan website: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    if (browser) await browser.close().catch(() => {});
  }
}

function generateCloningGuide(title: string, features: string[], pricing: string[], techStack: string[], content: string): string[] {
  const guide: string[] = [];

  guide.push(`1. CORE FEATURES`);
  guide.push(`   - Main value prop: Extract from homepage headline`);
  guide.push(`   - Key features: ${features.slice(0, 3).join(', ') || 'Analysis complete'}`);

  guide.push(`2. TECH STACK`);
  guide.push(`   - Frontend: ${techStack.find((t) => ['Next.js', 'React', 'Vue'].includes(t)) || 'Unknown'}`);
  guide.push(`   - Styling: ${techStack.find((t) => ['Tailwind CSS', 'Bootstrap'].includes(t)) || 'Unknown'}`);
  guide.push(`   - Payment: ${techStack.includes('Stripe') ? 'Stripe' : 'Check for payment integration'}`);

  guide.push(`3. BUSINESS MODEL`);
  if (pricing.length > 0) {
    guide.push(`   - Has pricing: ${pricing.slice(0, 2).join(' | ')}`);
  } else {
    guide.push(`   - Freemium or free model`);
  }

  guide.push(`4. IMPLEMENTATION STEPS`);
  guide.push(`   a) Setup: Install dependencies matching tech stack`);
  guide.push(`   b) Design: Recreate key UI components`);
  guide.push(`   c) Features: Implement core features first`);
  guide.push(`   d) Monetization: Add pricing/payment integration`);
  guide.push(`   e) Launch: Deploy and iterate`);

  guide.push(`5. CLONEABILITY TIPS`);
  guide.push(`   - UI: Copy component patterns, not exact designs`);
  guide.push(`   - UX: Mirror key user flows`);
  guide.push(`   - Business: Adapt pricing for your market`);
  guide.push(`   - Differentiation: Add unique features after MVP`);

  return guide;
}

function detectHosting(url: string): string {
  if (url.includes('vercel.app')) return 'Vercel';
  if (url.includes('netlify.app')) return 'Netlify';
  if (url.includes('herokuapp.com')) return 'Heroku';
  if (url.includes('github.io')) return 'GitHub Pages';
  if (url.includes('replit.dev')) return 'Replit';
  return 'Unknown';
}

function detectCMS(content: string): string | undefined {
  if (content.includes('WordPress')) return 'WordPress';
  if (content.includes('Webflow')) return 'Webflow';
  if (content.includes('Framer')) return 'Framer';
  if (content.includes('Notion')) return 'Notion';
  return undefined;
}
