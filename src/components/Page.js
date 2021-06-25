import React from 'react';
import { NextSeo } from 'next-seo';

const Page = ({ name, path, children }) => {
  const title = `Clustox Position Test – ${name}`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;

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
