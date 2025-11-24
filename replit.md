# StartupVault - Production Ready Platform

### Overview
StartupVault is a platform designed to allow users to discover and clone proven startup business models using authenticated revenue data. The platform provides access to 105 verified startups with real founder identities and metrics, totaling over $150 billion in combined verified revenue. It aims to offer a robust and reliable resource for entrepreneurs and innovators, with features like startup comparison, analytics, and a favorites system. The project is production-ready, featuring a polished UI/UX and a professional design system.

### User Preferences
- I prefer clear, concise, and simple language.
- I like to see iterative development with small, reviewable changes.
- Please ask before making any major architectural changes or significant design overhauls.
- I value detailed explanations for complex solutions or decisions.
- Do not make changes to the `lib/trustmrr-all-data.ts` file, as it contains verified startup data.

### System Architecture
The application is built using Next.js 14 and React 18, with Tailwind CSS v3 for styling. State management for user favorites is handled by Zustand. Data for startups is imported locally from `trustmrr-all-data.ts`. The architecture follows a typical Next.js App Router structure, with distinct pages for the homepage, startup listings, individual startup details, comparison tool, leaderboard, champions, analytics, features, and a user dashboard.

**Core Features:**
-   **Homepage:** Displays trending startups, high MRR companies, pricing, and testimonials.
-   **Startups Database:** A browsable list of all 105 verified startups in a responsive 3-column grid.
-   **Startup Detail:** Individual pages for each startup, showing metrics and related companies.
-   **Compare Tool:** Allows side-by-side analysis of up to 5 startups.
-   **Leaderboard:** Global rankings by revenue/MRR with country filtering.
-   **Champions:** Highlights the top 5 performing startups.
-   **Analytics:** Market analytics with color-coded stat cards.
-   **Features:** Showcases platform capabilities.
-   **Dashboard:** Manages saved startups with CSV export functionality.

**UI/UX and Design System:**
-   **Layout:** Uses `max-w-7xl` for wider content, responsive padding (`px-4 sm:px-6 lg:px-8`), and increased vertical padding (`py-16`).
-   **Color Palette:** Professional design with Deep Teal (`#1a3a52`) as primary, Vibrant Orange (`#ff6b35`) as accent, and Soft Sage (`#7cb342`) for positive indicators. Supporting colors include Cyan and Soft Peach.
-   **Typography:** Text colors updated to dark teal (`#1a3a52`) and medium slate (`#5a7089`) for readability.
-   **Animations:** Smooth animations using `cubic-bezier(0.34, 1.56, 0.64, 1)` for transitions, including `fadeIn`, `slideUp`, `scaleIn`, and staggered card reveals with 80ms delays.
-   **Visual Elements:** Gradient page backgrounds (e.g., from-blue-50/50 via-background to-purple-50/50), gradient page titles, and color-coded stat cards with gradient backgrounds.
-   **Components:** Includes a professional sticky navbar with blur backdrop, an enhanced 4-column footer, and interactive startup cards with hover effects.
-   **Responsiveness:** Mobile-first design with adjusted card min-width (300px) and responsive grid layouts.

**Technical Implementations:**
-   **Data Authenticity:** All startup data is 100% verified from TrustMRR.com, ensuring real names, founders, and revenue figures.
-   **User Features:** Includes a favorites/bookmarks system with Zustand and persistent browser storage, and CSV export.
-   **API:** Next.js API routes are used for data fetching, dynamically marked with `export const dynamic = 'force-dynamic'`.

### External Dependencies
-   **Data Source:** TrustMRR.com (data imported locally)
-   **Styling:** Tailwind CSS v3
-   **State Management:** Zustand
-   **Authentication:** NextAuth.js (framework ready for future integration)
-   **Database:** PostgreSQL (ready for future integration)