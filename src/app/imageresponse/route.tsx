import type { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const name = request.nextUrl.searchParams.get('name') || 'World';
    
    return new ImageResponse(
        (
            <div>
                <h1>Hello {name}</h1>
            </div>
        )
    )
}

// export async function GET(request) {
//     return  new ImageResponse(
//        (
//          <div
//            style={{
//              fontSize: 128,
//              background: 'white',
//              width: '100%',
//              height: '100%',
//              display: 'flex',
//              textAlign: 'center',
//              alignItems: 'center',
//              justifyContent: 'center',
//            }}
//          >
//            Hello world!
//          </div>
//        ),
//        {
//          width: 1200,
//          height: 600,
//        },
//      );
//  }