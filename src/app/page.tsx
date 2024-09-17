import type { Metadata, ResolvingMetadata } from "next";

export const runtime = 'edge'

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata( { searchParams }: Props, parent: ResolvingMetadata ): Promise<Metadata> {
    const id = searchParams.id;

    return {
        title: "title",
        description: `Page ${id}`,
    }
};

export default function Page() {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}