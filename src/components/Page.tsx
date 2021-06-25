import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';

const Page = ({ name, path, children }: { name: string, path: string, children: ReactNode }) => {
    const title = `Clustox Position Test – ${name}`;
    const url: string = `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;

    return (
        <>
            <NextSeo
                title={title}
                description="Clustox Position Test - It's a description"
                canonical={url}
                openGraph={{
                    url,
                    title
                }}
            />
            {children}
        </>
    );
};

export default Page;
