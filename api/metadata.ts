import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { slug, public_id } = req.query;

    // If no params, just redirect to home or show error
    if (!slug && !public_id) {
        return res.status(200).send('InviteEra dynamic metadata ready. Please provide a slug or public_id.');
    }

    const apiUrl = process.env.VITE_API_URL || "https://invitation-backend-production-0274.up.railway.app";
    let fetchUrl = '';

    if (public_id) {
        fetchUrl = `${apiUrl}/api/invitation-data/public_id/${public_id}`;
    } else {
        fetchUrl = `${apiUrl}/api/invitation-data/slug/${slug}`;
    }

    let data: any = null;
    try {
        const response = await fetch(fetchUrl);
        if (response.ok) {
            data = await response.json();
        }
    } catch (error) {
        console.error('[Metadata Debug] Error fetching:', error);
    }

    const title = data?.invitation_title || 'You are Invited! | InviteEra';
    const description = data?.invitation_message || data?.invitation_tag_line || 'Join us for a special celebration.';

    // Use host from request
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['host'];
    const baseUrl = `${protocol}://${host}`;

    const ogImageParam = public_id ? `public_id=${public_id}` : `slug=${slug}`;
    const ogImageUrl = `${baseUrl}/api/og?${ogImageParam}`;
    const invitationUrl = public_id ? `${baseUrl}/public/${public_id}` : `${baseUrl}/${slug}`;

    // Return a minimal HTML page with meta tags and an iframe
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${ogImageUrl}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${invitationUrl}">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${ogImageUrl}">

    <style>
        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
        iframe { width: 100%; height: 100%; border: none; }
    </style>
</head>
<body>
    <!-- We add bypass=true to avoid recursive loops if the iframe hits the same metadata route -->
    <iframe src="${invitationUrl}${invitationUrl.includes('?') ? '&' : '?'}bypass=true" title="Invitation"></iframe>
</body>
</html>
  `;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
}
