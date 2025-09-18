"use client";

import { siteConfig } from "@/config/site.config";
import { usePathname } from "next/navigation";

const PageContent = () => {
  const pathname = usePathname();

  const pageContent =
    siteConfig.pageContent[pathname as keyof typeof siteConfig.pageContent]
      .content;

  if (!pageContent) {
    return (
      <p className="text-lg text-center max-w-2xl">Page content not found</p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg text-center max-w-2xl">{pageContent}</p>
    </div>
  );
};

export default PageContent;
