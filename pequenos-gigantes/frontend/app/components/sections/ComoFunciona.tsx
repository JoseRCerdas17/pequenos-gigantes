export default function ComoFunciona() {
  const pasos = [
    { num: "1", icon: "📋", title: "Verificación Digital", desc: "El tutor autorizado presenta su código QR al llegar para recoger al niño.", color: "#E8F4FC" },
    { num: "2", icon: "✅", title: "Validación del Personal", desc: "Nuestros colaboradores verifican la identidad antes de entregar al menor.", color: "#E8F5EE" },
    { num: "3", icon: "🔔", title: "Entrega Registrada", desc: "Recibís una notificación automática en cuanto tu hijo sale con su responsable.", color: "#FFF9E6" },
  ];

  return (
    <section id="nosotros" className="section-padding" style={{ backgroundColor: "#F0F7FF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-primary-muted text-primary text-xs font-bold px-4 py-2 rounded-full">Proceso de recogida</span>
          <h2 className="text-text font-black text-3xl md:text-4xl mt-4 mb-4">Recogida segura en 3 pasos</h2>
          <p className="text-text-muted max-w-xl mx-auto">Tu tranquilidad es lo más importante. Tenemos protocolos claros para garantizar que tu hijo siempre esté en buenas manos.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pasos.map((p, i) => (
            <div key={p.title} className="relative">
              {i < pasos.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border z-0" style={{ width: "calc(100% - 4rem)" }} />
              )}
              <div className="card p-6 text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ backgroundColor: p.color }}>
                  {p.icon}
                </div>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black mx-auto mb-3" style={{ backgroundColor: "#1A7FBF" }}>
                  {p.num}
                </div>
                <h3 className="text-text font-black text-lg mb-2">{p.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
