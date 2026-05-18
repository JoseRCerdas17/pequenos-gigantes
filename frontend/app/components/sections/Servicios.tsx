export default function Servicios() {
  const servicios = [
    { icon: "🔒", title: "Máxima Seguridad", desc: "Cámaras, control de acceso y protocolos estrictos para que tu hijo esté siempre protegido.", color: "#E8F4FC" },
    { icon: "👩‍🏫", title: "Docentes Calificados", desc: "Personal con formación en educación infantil, primeros auxilios y desarrollo temprano.", color: "#E8F5EE" },
    { icon: "🎨", title: "Actividades Creativas", desc: "Arte, música, teatro y manualidades para estimular la imaginación cada día.", color: "#FFF9E6" },
    { icon: "🥗", title: "Alimentación Premium", desc: "Menú balanceado, fresco y nutritivo supervisado por especialistas en nutrición infantil.", color: "#E8F5EE" },
    { icon: "🚌", title: "Transporte Escolar", desc: "Servicio puerta a puerta seguro, con rutas fijas y notificación a los padres en tiempo real.", color: "#E8F4FC" },
    { icon: "📱", title: "Actualizaciones en Vivo", desc: "Fotos, notas y el diario del día de tu hijo directo a tu teléfono.", color: "#FFF9E6" },
  ];

  return (
    <section id="servicios" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-primary-muted text-primary text-xs font-bold px-4 py-2 rounded-full">¿Por qué elegirnos?</span>
          <h2 className="text-text font-black text-3xl md:text-4xl mt-4 mb-4">Lo mejor para tu pequeño</h2>
          <p className="text-text-muted max-w-xl mx-auto text-base">Nos dedicamos a crear un ambiente donde los niños se sientan seguros, felices y listos para aprender.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((s) => (
            <div key={s.title} className="card p-6 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: s.color }}>
                {s.icon}
              </div>
              <h3 className="text-text font-black text-lg mb-2">{s.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
