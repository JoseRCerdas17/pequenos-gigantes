export default function Testimonios() {
  const testimonios = [
    { nombre: "Laura Sánchez", rol: "Mamá de Mateo, 3 años", texto: "Desde que Mateo llegó a Pequeños Gigantes cambió completamente. Llegó tímido y ahora no quiere irse a casa. El personal es increíble.", estrellas: 5 },
    { nombre: "Carlos Montero", rol: "Papá de Sofía, 2 años", texto: "Recibimos fotos y actualizaciones todos los días. Saber que Sofía está feliz y bien cuidada nos da una paz enorme para trabajar tranquilos.", estrellas: 5 },
    { nombre: "Diana Ramos", rol: "Mamá de Lucas, 4 años", texto: "La metodología Montessori nos encantó. Al mes, Lucas ya contaba, sabía los colores y era mucho más independiente. ¡Lo recomiendo al 100%!", estrellas: 5 },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: "#F0F7FF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-primary-muted text-primary text-xs font-bold px-4 py-2 rounded-full">Testimonios</span>
          <h2 className="text-text font-black text-3xl md:text-4xl mt-4 mb-4">Lo que dicen nuestras familias</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map((t) => (
            <div key={t.nombre} className="card p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.estrellas }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-6 italic">"{t.texto}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm" style={{ backgroundColor: "#1A7FBF" }}>
                  {t.nombre.charAt(0)}
                </div>
                <div>
                  <p className="text-text font-bold text-sm">{t.nombre}</p>
                  <p className="text-text-muted text-xs">{t.rol}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
