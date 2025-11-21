import { generatePRD, generateMVP, generateTaskList } from '@/lib/doc-generator';
import { allTrustMRRStartups } from '@/lib/trustmrr-all-data';

export async function POST(request: Request) {
  try {
    const { startupId, docType } = await request.json();

    const startup = allTrustMRRStartups.find(s => s.id === startupId);
    if (!startup) {
      return Response.json({ error: 'Startup not found' }, { status: 404 });
    }

    let content = '';
    let filename = '';

    switch (docType) {
      case 'prd':
        content = generatePRD(startup);
        filename = `PRD-${startup.name.replace(/\s+/g, '-')}.md`;
        break;
      case 'mvp':
        content = generateMVP(startup);
        filename = `MVP-${startup.name.replace(/\s+/g, '-')}.md`;
        break;
      case 'tasks':
        content = generateTaskList(startup);
        filename = `Tasks-${startup.name.replace(/\s+/g, '-')}.md`;
        break;
      default:
        return Response.json({ error: 'Invalid doc type' }, { status: 400 });
    }

    return new Response(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating docs:', error);
    return Response.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}
