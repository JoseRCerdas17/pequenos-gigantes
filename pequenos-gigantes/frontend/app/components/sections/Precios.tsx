import Link from "next/link";

export default function Precios() {
  const planes = [
    {
      nombre: "Media Jornada",
      precio: "₡80,000",
      periodo: "/mes",
      destacado: false,
      features: ["Horario 7:00 – 13:00", "Desayuno incluido", "Actividades básicas", "Reporte diario digital"],
    },
    {
      nombre: "Jornada Completa",
      precio: "₡120,000",
      periodo: "/mes",
      destacado: true,
      badge: "MÁS POPULAR",
      features: ["Horario 7:00 – 18:00", "Desayuno, almuerzo y merienda", "Todas las actividades", "Diario con fotos", "Clase de inglés diaria"],
    },
    {
      nombre: "Plan Premium",
      precio: "₡150,000",
      periodo: "/mes",
      destacado: false,
      features: ["Todo lo de Jornada Completa", "Transporte puerta a puerta", "Clases extracurriculares", "Acceso al portal de padres", "Seguro médico incluido"],
    },
  ];

  return (
    <section id="precios" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-primary-muted text-primary text-xs font-bold px-4 py-2 rounded-full">Planes y Precios</span>
          <h2 className="text-text font-black text-3xl md:text-4xl mt-4 mb-4">Opciones para cada familia</h2>
          <p className="text-text-muted max-w-xl mx-auto">Planes diseñados con flexibilidad para adaptarse a las necesidades de cada familia.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {planes.map((p) => (
            <div key={p.nombre} className={`card p-6 relative ${p.destacado ? "border-2 border-primary shadow-lg" : ""}`}>
              {p.destacado && p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-black px-4 py-1 rounded-full">{p.badge}</span>
                </div>
              )}
              <h3 className="text-text font-black text-xl mb-1">{p.nombre}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-text font-black text-3xl">{p.precio}</span>
                <span className="text-text-muted text-sm">{p.periodo}</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="text-mint font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/inscripcion" className={`block text-center text-sm font-bold py-3 rounded-xl transition-all ${p.destacado ? "btn-primary" : "btn-outline"}`}>
                Elegir plan
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
