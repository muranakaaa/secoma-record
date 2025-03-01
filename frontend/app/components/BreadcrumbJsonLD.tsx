import Script from "next/script";

type BreadcrumbJsonLDProps = {
  breadCrumbs: { label: string; url: string }[];
};

export const BreadcrumbJsonLD = ({ breadCrumbs }: BreadcrumbJsonLDProps) => {
  const BASE_URL = process.env.NEXT_PUBLIC_FRONT_BASE_URL || "https://secoma-record.com";

  const itemListElement = breadCrumbs.map((breadCrumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": breadCrumb.label,
    "item": `${BASE_URL}${breadCrumb.url}`,
  }));

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement,
  };

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
    />
  );
};

export default BreadcrumbJsonLD;
