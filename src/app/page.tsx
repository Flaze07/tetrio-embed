import type { Metadata, ResolvingMetadata } from "next";

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
    title: 'Page',
};

export async function generateMetadata( { searchParams }: Props, parent: ResolvingMetadata ): Promise<Metadata> {
    const id = searchParams.id;

    return {
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