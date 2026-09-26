import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.paydaymate.app",
  appName: "Payday Mate",
  webDir: "dist/public",
  server: {
    url: "https://paydaymate-yvjh5tf4.manus.space",
    cleartext: false,
  },
};

export default config;
