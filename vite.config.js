import { fileURLToPath } from "node:url";

const page = (path) => fileURLToPath(new URL(path, import.meta.url));

export default {
  server: {
    proxy: {
      "/api": "http://127.0.0.1:3000"
    }
  },
  build: {
    rollupOptions: {
      input: {
        home: page("./index.html"),
        checkupCleaning: page("./dental-checkup-cleaning-oroquieta-city/index.html"),
        fillings: page("./dental-fillings-oroquieta-city/index.html"),
        familyDentist: page("./family-dentist-oroquieta-city/index.html"),
        cosmeticDentistry: page("./cosmetic-dentistry-oroquieta-city/index.html"),
        crownsBridges: page("./crowns-bridges-oroquieta-city/index.html")
      }
    }
  }
};
