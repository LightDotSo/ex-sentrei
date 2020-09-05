import {DefaultSeo} from "next-seo";
import * as React from "react";

export default function SeoDefault(): JSX.Element {
  return (
    <DefaultSeo
      description="Bond. Focus. Work. -A dedicated video conferencing tool that helps you get things done-"
      titleTemplate="Sentrei | %s"
      openGraph={{
        type: "website",
        locale: "en_US",
        url: "https://sentrei.com",
        site_name: "sentrei.com",
      }}
      twitter={{
        handle: "@sentrei_com",
        site: "@sentrei_com",
        cardType: "summary_large_image",
      }}
    />
  );
}
