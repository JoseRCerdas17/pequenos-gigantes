export default function Galeria() {
  const fotos = [
    { emoji: "🎨", label: "Aula Montessori", bg: "#E8F4FC" },
    { emoji: "🌿", label: "Patio Recreativo", bg: "#E8F5EE" },
    { emoji: "📚", label: "Rincón de Lectura", bg: "#FFF9E6" },
    { emoji: "🍽️", label: "Comedor y Cocina", bg: "#E8F4FC" },
    { emoji: "🎵", label: "Sala de Música", bg: "#FFF0F0" },
    { emoji: "😴", label: "Zona de Descanso", bg: "#F0F0FF" },
  ];

  return (
    <section id="instalaciones" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-primary-muted text-primary text-xs font-bold px-4 py-2 rounded-full">Nuestras instalaciones</span>
          <h2 className="text-text font-black text-3xl md:text-4xl mt-4 mb-4">Espacios diseñados para crecer</h2>
          <p className="text-text-muted max-w-xl mx-auto">Cada rincón fue pensado para inspirar, explorar y jugar con total libertad y seguridad.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fotos.map((f, i) => (
            <div
              key={f.label}
              className={`rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8 ${i === 0 ? "md:col-span-2 md:row-span-2 py-16" : ""}`}
              style={{ backgroundColor: f.bg, minHeight: i === 0 ? 280 : 160 }}
            >
              <div className={`${i === 0 ? "text-7xl" : "text-4xl"} mb-3`}>{f.emoji}</div>
              <p className="text-text font-bold text-sm text-center">{f.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
