import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get('title')?.slice(0, 100) || 'Void Tools';
    const description = searchParams.get('description')?.slice(0, 200) || 'Free Online Web Tools';
    const iconName = searchParams.get('icon') || 'Zap';

    const fontData = await fetch(
      new URL('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff', import.meta.url)
    ).then((res) => res.arrayBuffer());

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
            backgroundColor: '#030712',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #1f2937 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1f2937 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            fontFamily: '"Inter"',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(0,0,0,0) 70%)', // Purple glow
              filter: 'blur(80px)',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '40px 80px',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              background: 'rgba(17, 24, 39, 0.6)',
              boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.5)',
              maxWidth: '900px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                padding: '10px 20px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 10l4 7h-8Z" />
                <path d="M12 4l9.25 16h-18.5Z" opacity="0.5" />
              </svg>
              <span style={{ marginLeft: '12px', fontSize: 20, color: '#e5e7eb', fontWeight: 600, letterSpacing: '1px' }}>
                VOID TOOLS
              </span>
            </div>

            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                background: 'linear-gradient(to bottom right, #ffffff 30%, #a5b4fc 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                lineHeight: 1.1,
                marginBottom: '20px',
                letterSpacing: '-2px',
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: 32,
                color: '#9ca3af',
                lineHeight: 1.4,
                fontWeight: 400,
                maxWidth: '800px',
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 40,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: 18,
              color: '#4b5563',
            }}
          >
            <span>Privacy First</span> • <span>Free Forever</span> • <span>No Uploads</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}