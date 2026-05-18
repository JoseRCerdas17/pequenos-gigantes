import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Servicios from "./components/sections/Servicios";
import ComoFunciona from "./components/sections/ComoFunciona";
import Galeria from "./components/sections/Galeria";
import Testimonios from "./components/sections/Testimonios";
import Precios from "./components/sections/Precios";
import Contacto from "./components/sections/Contacto";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Servicios />
      <ComoFunciona />
      <Galeria />
      <Testimonios />
      <Precios />
      <Contacto />
      <Footer />
    </main>
  );
}
