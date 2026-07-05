import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  /** Path relative to /public, e.g. "og-home.jpg" */
  image?: string;
  /** Canonical path, e.g. "/planos". Defaults to current pathname. */
  path?: string;
  type?: "website" | "article";
}

const SITE_URL = "https://brasilstartups.org";
const DEFAULT_IMAGE = "og-image.jpg";

export const SEO = ({
  title,
  description,
  image = DEFAULT_IMAGE,
  path,
  type = "website",
}: SEOProps) => {
  const url = `${SITE_URL}${path ?? (typeof window !== "undefined" ? window.location.pathname : "/")}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}/${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;
