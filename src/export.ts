import { render } from '@react-email/render';
import { Welcome } from './templates/Welcome';
import * as fs from 'fs';
import * as path from 'path';

async function exportEmail() {
  try {
    // Render the Welcome component to HTML
    const html = await render(
      Welcome({
        username: 'John Doe',
        confirmUrl: 'https://example.com/verify?token=abc123',
      })
    );

    // Ensure output directory exists
    const outputDir = path.join(__dirname, '../output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write HTML to file
    const outputPath = path.join(outputDir, 'welcome.html');
    fs.writeFileSync(outputPath, html, 'utf-8');

    console.log(`✓ Email exported to: ${outputPath}`);
    console.log(`✓ File size: ${(html.length / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error('Error exporting email:', error);
    process.exit(1);
  }
}

exportEmail();
