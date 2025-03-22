import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "orientrentcar.uz",
      "create.vista.com",
      "randomuser.me",
      "carmanagement-1-rmyc.onrender.com",
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withPWA(withNextIntl(nextConfig));
