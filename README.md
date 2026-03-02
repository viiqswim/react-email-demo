# React Email Demo

Component-based email template system built with React Email. Write email templates using React components with TypeScript, then export them as production-ready HTML with inline styles.

## Overview

This project demonstrates creating HTML emails using React Email's component library. Templates are written in TypeScript/React and compiled to standalone HTML files suitable for email clients and services like AWS SES.

React Email handles inline style conversion automatically, ensuring compatibility with email clients that don't support external CSS. The output is a single HTML file with all styles inlined.

## Prerequisites

- Node.js >= 18
- npm (comes with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
cd react-email-demo
npm install
```

## Usage

### Edit the Template

Modify the email template at `src/templates/Welcome.tsx`. This file contains a React component that defines the email structure and styling:

```typescript
export const Welcome = ({
  username = 'there',
  confirmUrl = 'https://example.com/verify',
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to our platform!</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-10 max-w-xl">
            <Heading className="text-3xl">Welcome, {username}!</Heading>
            {/* ... more components */}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
```

Available components from `@react-email/components`:
- `Html`, `Head`, `Body` - Document structure
- `Container`, `Section` - Layout
- `Heading`, `Text`, `Button`, `Link` - Content
- `Img`, `Hr` - Media and dividers
- `Tailwind` - Tailwind CSS support (automatic pixel conversion)

### Customize Template Data

Edit `src/export.ts` to change the data passed to the template:

```typescript
const html = await render(Welcome({ 
  username: 'Jane Smith',
  confirmUrl: 'https://yoursite.com/verify-email?token=abc123'
}));
```

### Export to HTML

Run the export script to generate the HTML file:

```bash
npm run export
```

This creates `output/welcome.html` with all styles inlined. The file is ready to upload to AWS SES or any email service.

## AWS SES Upload

### Step 1: Access AWS Console

Log in to the AWS Management Console and navigate to Amazon SES (Simple Email Service).

### Step 2: Create Email Template

1. In the left sidebar, click **Email Templates** under **Configuration**
2. Click **Create template** button
3. Fill in the form:
   - **Template name**: `react-email-welcome` (or any unique identifier)
   - **Subject**: `Welcome to Our Platform`

### Step 3: Upload HTML

1. Open `output/welcome.html` in a text editor
2. Copy the entire HTML content
3. Paste into the **HTML part** field in the AWS console
4. (Optional) Add plain text version in **Text part** field

### Step 4: Save and Test

1. Click **Create template** at the bottom
2. Test by clicking **Send test email** from the template details page
3. Enter a verified email address and click **Send test email**

### Step 5: Use in Production

Send emails programmatically using AWS SDK:

```javascript
const ses = new AWS.SES({ region: 'us-east-1' });

await ses.sendTemplatedEmail({
  Source: 'noreply@yoursite.com',
  Destination: { ToAddresses: ['user@example.com'] },
  Template: 'react-email-welcome',
  TemplateData: JSON.stringify({
    username: 'Jane Smith',
    confirmUrl: 'https://yoursite.com/verify?token=abc123'
  })
}).promise();
```

Note: Variables like `{{username}}` must be replaced in the HTML before upload, or use SES template variables by modifying the template structure.

## Limitations

### File Size Limit (40KB)

AWS SES enforces a 40KB limit on email templates (HTML + text parts combined). Current template size: ~3.65KB.

**Workarounds**:
- Keep templates simple and focused
- Avoid large embedded images (use hosted URLs instead)
- Remove unused Tailwind classes
- Minify HTML before upload (consider using a tool like `html-minifier`)

### Images Must Be Hosted

Email clients don't support embedded/base64 images reliably. Use the `<Img>` component with external URLs:

```typescript
<Img 
  src="https://yourcdn.com/logo.png" 
  alt="Company Logo"
  width="150"
/>
```

Host images on:
- AWS S3 + CloudFront
- CDN service (Cloudinary, Imgix)
- Your web server

### Inline Styles (Automatic)

React Email automatically inlines all styles. You don't need to worry about this, but be aware that:
- External stylesheets won't work
- CSS-in-JS is converted to inline styles
- Tailwind classes are converted to inline styles

### Email Client Compatibility

Not all CSS properties work in email clients:
- Avoid `position: absolute/fixed`
- Use tables for complex layouts (or React Email's `Container` component)
- Test in major clients: Gmail, Outlook, Apple Mail
- Preview service: [Litmus](https://litmus.com) or [Email on Acid](https://www.emailonacid.com)

## Project Structure

```
react-email-demo/
├── src/
│   ├── templates/
│   │   └── Welcome.tsx          # Main email template
│   └── export.ts                # Export script
├── output/
│   └── welcome.html             # Generated HTML (gitignored)
├── package.json
└── tsconfig.json
```

## Dependencies

- **@react-email/components** (1.0.8) - Email-specific React components
- **@react-email/render** (2.0.4) - Server-side rendering
- **react** (19.2.4) - React library
- **typescript** (5.9.3) - Type safety

## Next Steps

- Add more templates in `src/templates/`
- Create a build script that exports all templates
- Set up automated testing with email preview screenshots
- Integrate with your backend email service
