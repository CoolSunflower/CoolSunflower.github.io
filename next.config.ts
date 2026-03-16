import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSiteRepo = repository.endsWith(".github.io");
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (isGithubActions && repository && !isUserSiteRepo ? `/${repository}` : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
