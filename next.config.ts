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
<<<<<<< HEAD
      "127.0.0.1",
      "localhost",
=======
>>>>>>> d1c5e5d5e48c6edc247664865d4636e9d14f2802
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withPWA(withNextIntl(nextConfig));
