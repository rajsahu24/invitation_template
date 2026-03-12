import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const publicId = searchParams.get('public_id');
    const slug = searchParams.get('slug');

    if (!publicId && !slug) {
      return new Response('Missing public_id or slug', { status: 400 });
    }

    const apiUrl = process.env.VITE_API_URL || "https://invitation-backend-production-0274.up.railway.app";
    let fetchUrl = '';
    
    if (publicId && publicId !== 'default') {
      fetchUrl = `${apiUrl}/api/invitation-data/public_id/${publicId}`;
    } else if (slug && slug !== 'default') {
      fetchUrl = `${apiUrl}/api/invitation-data/slug/${slug}`;
    }

    let data: any;
    if (publicId === 'default' || slug === 'default' || !fetchUrl) {
        data = {
            invitation_title: 'InviteEra Digital Invitations',
            invitation_type: 'Event',
            metadata: {
                wedding_date: 'Select your date',
                wedding_location: 'Share your location'
            }
        };
    } else {
        const response = await fetch(fetchUrl);
        if (response.ok) {
            data = await response.json();
        } else {
            data = {
                invitation_title: 'InviteEra Digital Invitations',
                invitation_type: 'Event',
                metadata: {
                    wedding_date: 'Join us!',
                    wedding_location: 'Special Location'
                }
            };
        }
    }

    const title = data.invitation_title || 'You are Invited!';
    const type = data.invitation_type || 'Wedding';
    const metadata = data.metadata || {};
    
    let mainText = '';
    if (type.toLowerCase() === 'wedding') {
      const bride = metadata.bride_name || 'Bride';
      const groom = metadata.groom_name || 'Groom';
      mainText = `${bride} & ${groom}`;
    } else {
      mainText = title;
    }

    const subText = metadata.wedding_date || data.invitation_tag_line || '';
    const location = metadata.wedding_location || '';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            backgroundImage: 'radial-gradient(circle at 50% 50%, #fdfbfb 0%, #ebedee 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #d4af37',
              padding: '40px 60px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: '#d4af37',
                marginBottom: 20,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}
            >
              {type} Invitation
            </div>
            <div
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: 20,
                textAlign: 'center',
                fontFamily: 'serif',
              }}
            >
              {mainText}
            </div>
            <div
              style={{
                fontSize: 28,
                color: '#7f8c8d',
                marginBottom: 10,
              }}
            >
              {subText}
            </div>
            <div
              style={{
                fontSize: 22,
                color: '#95a5a6',
                fontStyle: 'italic',
              }}
            >
              {location}
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              fontSize: 18,
              color: '#bdc3c7',
            }}
          >
            Create yours at InviteEra.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
