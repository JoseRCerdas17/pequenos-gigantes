"use client";
import { useState } from "react";
import Link from "next/link";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const navbarHeight = document.querySelector("nav")?.offsetHeight || 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - navbarHeight - 12, behavior: "smooth" });
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-lg" style={{ backgroundColor: "#1A7FBF" }}>
              🌟
            </div>
            <div>
              <p className="text-text font-black text-base leading-none">Pequeños Gigantes</p>
              <p className="text-primary text-xs font-semibold leading-none mt-0.5">Guardería Infantil</p>
            </div>
          </Link>

          {/* Links escritorio */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("nosotros")} className="text-text-muted hover:text-primary transition-colors text-sm font-semibold">Nosotros</button>
            <button onClick={() => scrollToSection("servicios")} className="text-text-muted hover:text-primary transition-colors text-sm font-semibold">Servicios</button>
            <button onClick={() => scrollToSection("instalaciones")} className="text-text-muted hover:text-primary transition-colors text-sm font-semibold">Instalaciones</button>
            <button onClick={() => scrollToSection("precios")} className="text-text-muted hover:text-primary transition-colors text-sm font-semibold">Precios</button>
            <button onClick={() => scrollToSection("contacto")} className="text-text-muted hover:text-primary transition-colors text-sm font-semibold">Contacto</button>
            <Link href="/inscripcion" className="btn-accent text-sm px-5 py-2.5">✨ Inscribir a mi hijo</Link>
          </div>

          {/* Hamburguesa */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-1.5 p-2">
            <span className={`block w-6 h-0.5 bg-text transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-text transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-text transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="flex flex-col px-4 pb-6 gap-4 bg-white border-t border-border">
          <button onClick={() => { scrollToSection("nosotros"); setIsOpen(false); }} className="text-text-muted py-2 text-sm font-semibold text-left">Nosotros</button>
          <button onClick={() => { scrollToSection("servicios"); setIsOpen(false); }} className="text-text-muted py-2 text-sm font-semibold text-left">Servicios</button>
          <button onClick={() => { scrollToSection("instalaciones"); setIsOpen(false); }} className="text-text-muted py-2 text-sm font-semibold text-left">Instalaciones</button>
          <button onClick={() => { scrollToSection("precios"); setIsOpen(false); }} className="text-text-muted py-2 text-sm font-semibold text-left">Precios</button>
          <Link href="/inscripcion" onClick={() => setIsOpen(false)} className="btn-accent text-center text-sm">✨ Inscribir a mi hijo</Link>
        </div>
      </div>
    </nav>
  );
}
