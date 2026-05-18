export default function Footer() {
  return (
    <footer className="bg-text border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Marca */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-lg" style={{ backgroundColor: "#1A7FBF" }}>
                🌟
              </div>
              <div>
                <p className="text-white font-black text-base leading-none">Pequeños Gigantes</p>
                <p className="text-primary-light text-xs font-semibold leading-none mt-0.5">Guardería Infantil</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Un lugar seguro, cálido y estimulante donde cada niño crece feliz y con confianza.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com" target="_blank" aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://wa.me/50688888888" target="_blank" aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.132 1.528 5.881L0 24l6.266-1.641A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.36-.214-3.722.976.993-3.622-.235-.373A9.818 9.818 0 0112 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.421-4.398 9.818-9.818 9.818z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explorar */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-5">Explorar</h4>
            <ul className="flex flex-col gap-3">
              {["Nosotros", "Servicios", "Instalaciones", "Precios", "Contacto"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-white/50 hover:text-white transition-colors text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Horario */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-5">Horario</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex justify-between gap-4">
                <span className="text-white/50 text-sm">Lunes – Viernes</span>
                <span className="text-white text-sm font-bold whitespace-nowrap">7:00 – 18:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-white/50 text-sm">Sábado</span>
                <span className="text-white text-sm font-bold">7:00 – 12:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-white/50 text-sm">Domingo</span>
                <span className="text-white/50 text-sm font-bold">Cerrado</span>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-5">Contacto</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-white/50 text-sm">Liberia, Guanacaste<br />Costa Rica</li>
              <li>
                <a href="https://wa.me/50688888888" target="_blank" className="text-white/50 hover:text-white transition-colors text-sm">+506 8888-8888</a>
              </li>
              <li>
                <a href="mailto:hola@pequenosgigantes.com" className="text-white/50 hover:text-white transition-colors text-sm">hola@pequenosgigantes.com</a>
              </li>
            </ul>
            <a href="/inscripcion" className="btn-accent inline-block text-xs px-5 py-2.5 mt-6">✨ Inscribir ahora</a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-white/30 text-xs">
            Desarrollado por{" "}
            <a href="https://wa.me/50683439232" target="_blank" className="text-primary-light hover:text-white transition-colors font-bold">
              Jose Cerdas Chaves
            </a>
            {" "}· +506 8343-9232
          </p>
        </div>

        <div className="w-full h-px bg-white/10 mt-6 mb-4" />
        <p className="text-center text-white/30 text-xs">
          © 2026 Pequeños Gigantes Guardería Infantil. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
