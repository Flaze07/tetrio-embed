import type { Metadata, ResolvingMetadata } from "next";

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

    return {
        title: `${name}`,
        description: `Data user ${name}`,
        openGraph: {
            images: [
                `https://tetr.io/user-content/avatars/${data.data._id}.jpg?rv=${data.data.avatar_revision}`
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