import type { Metadata, ResolvingMetadata } from "next";
import { ImageResponse } from "next/og";

export const runtime = 'edge'

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata( { searchParams }: Props, parent: ResolvingMetadata ): Promise<Metadata> {
    const name = searchParams.name;
    
    if(name === undefined) {
        return {
            title: "Goblok",
            description: "Goblok, pake ?name=apapun"
        }
    }

    const res = await fetch(`https://ch.tetr.io/api/users/${name}`);
    const data: any = await res.json();

    if(data.success === false) {
        return {
            title: "Goblok",
            description: "Gak ada user dengan nama ini tolol"
        }
    }

    const generatedImage = new ImageResponse(
        (
            // ImageResponse JSX element
            <div
            style={{
                fontSize: 128,
                background: 'white',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            >
            This is a test
            </div>
        )
    )

    return {
        title: `${name}`,
        description: `Data user ${name}`,
        openGraph: {
            images: [
                generatedImage
            ]
        }
    }
};

export default function Page() {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}