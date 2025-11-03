import { defineConfig } from "vite";

export default defineConfig({
  base: "/ep-sonido-iluminacion/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        about: "sobre-nosotros.html",
        servicios: "servicios.html",
        galerias: "galerias.html",
        sonido: "galerias/sonido.html",
        iluminacion: "galerias/iluminacion.html",
        eventos: "galerias/eventos.html",
        calendario: "calendario.html",
        contacto: "contacto.html",
      },
    },
  },
});
