import "dotenv/config";

export default {
  expo: {
    name: "Subite",
    slug: "subite",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#173b66",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: "com.sdv.subite",
      buildNumber: "1.0.0",
      supportsTablet: false,
    },
    android: {
      package: "com.sdv.subite",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/foreground-adaptive-icon.png",
        backgroundColor: "#173b66",
      },
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    },
    androidStatusBar: { style: "light" },
    web: {
      favicon: "./assets/icon.png",
    },
    extra: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
      },
    },
  },
};
