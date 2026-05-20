import { SEO } from "@/seo";
import { Helmet } from "@dr.pogodin/react-helmet";

export default function PageSeo(props: {
  children?: React.ReactNode;
  title: string;
  description?: string;
  image?: string;
}) {
  return (
    <>
      <Helmet>
        <title>{props.title}{SEO.separator}{SEO.siteName}</title>
        {props.description && (
          <meta name="description" content={props.description.toString()} />
        )}
        {props.description && (
          <meta
            name="twitter:description"
            content={props.description.toString()}
          />
        )}
        {props.description && (
          <meta
            property="og:description"
            content={props.description.toString()}
          />
        )}
        {props.image && <meta name="twitter:image" content={props.image} />}
        {props.image && <meta property="og:image" content={props.image} />}
      </Helmet>
      {props.children}
    </>
  );
}