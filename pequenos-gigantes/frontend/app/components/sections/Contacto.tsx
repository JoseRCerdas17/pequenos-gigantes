export default function Contacto() {
  return (
    <section id="contacto" className="section-padding" style={{ background: "linear-gradient(135deg, #1A7FBF 0%, #0F5A8A 100%)" }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-white font-black text-3xl md:text-4xl mb-4">¿Listo para que tu pequeño sea un Gigante? 🌟</h2>
        <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
          Agendá una visita guiada sin compromiso. Conocé nuestras instalaciones, el equipo y cómo trabajamos día a día.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/inscripcion" className="btn-accent text-sm px-8 py-4 font-bold rounded-xl">✨ Inscribir a mi hijo</a>
          <a href="https://wa.me/50688888888" target="_blank" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold px-8 py-4 rounded-xl text-sm transition-all">
            💬 Agendar visita
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          {[
            { icon: "📍", label: "Dirección", value: "Liberia, Guanacaste, Costa Rica" },
            { icon: "📞", label: "Teléfono / WhatsApp", value: "+506 8888-8888" },
            { icon: "✉️", label: "Email", value: "hola@pequenosgigantes.com" },
          ].map((c) => (
            <div key={c.label} className="bg-white/10 rounded-2xl p-5 text-center">
              <div className="text-2xl mb-2">{c.icon}</div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">{c.label}</p>
              <p className="text-white font-bold text-sm">{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
