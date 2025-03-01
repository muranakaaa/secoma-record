import Script from "next/script";

type BreadCrumbItem = {
  label: string;
  url: string;
};

type Props = {
  breadCrumbs: BreadCrumbItem[];
};

const BreadcrumbJsonLD = ({ breadCrumbs }: Props) => {
  const itemListElement = breadCrumbs.map((breadCrumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": breadCrumb.label,
    "item": `${process.env.NEXT_PUBLIC_BASE_URL}${breadCrumb.url}`,
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
