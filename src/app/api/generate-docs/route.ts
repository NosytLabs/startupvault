import { NextRequest, NextResponse } from 'next/server';
import { generatePRD, generateMVP, generateCursorPrompt, generateTaskList, generateMarkdownPrompt } from '@/lib/doc-generator';

interface GenerateRequest {
  startup: any;
  type?: 'prd' | 'mvp' | 'cursor' | 'tasks' | 'build';
}

export async function POST(request: NextRequest) {
  try {
    const { startup, type = 'cursor' } = (await request.json()) as GenerateRequest;

    if (!startup || !startup.name) {
      return NextResponse.json({ error: 'Invalid startup data' }, { status: 400 });
    }

    let content = '';
    let filename = '';

    switch (type) {
      case 'prd':
        content = generatePRD(startup);
        filename = `${startup.name}_PRD.md`;
        break;
      case 'mvp':
        content = generateMVP(startup);
        filename = `${startup.name}_MVP_Checklist.md`;
        break;
      case 'cursor':
        content = generateCursorPrompt(startup);
        filename = `${startup.name}_Cursor_Prompt.md`;
        break;
      case 'tasks':
        content = generateTaskList(startup);
        filename = `${startup.name}_Task_List.md`;
        break;
      case 'build':
        content = generateMarkdownPrompt(startup);
        filename = `${startup.name}_Build_Instructions.md`;
        break;
      default:
        return NextResponse.json({ error: 'Invalid document type' }, { status: 400 });
    }

    // Return markdown as downloadable file
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename.replace(/\s+/g, '_')}"`,
      },
    });
  } catch (error) {
    console.error('Doc generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate documents' },
      { status: 500 },
    );
  }
}
