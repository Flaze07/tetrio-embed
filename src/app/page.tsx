import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Page',
    description: 'This is a page',
};

export default function Page() {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}