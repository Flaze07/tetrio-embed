import type { NextRequest } from "next/server";
import { ImageResponse } from "next/og";

export default async function GET(req: NextRequest, { params }: { params: { name: string } }) {
    const { name } = params;

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 64,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <h1>Hello {name}</h1>
            </div>
        ),
        {
            width: 1800,
            height: 600
        }
    );
}