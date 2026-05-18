"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen bg-surface relative overflow-hidden flex flex-col">

      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: "#1A7FBF" }} />
      <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: "#FFD43B" }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: "#4CAF8A" }} />

      <div className="flex-1 flex items-center relative pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Texto */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-muted text-primary text-xs font-bold px-4 py-2 rounded-full mb-6">
                🏫 Guardería certificada · Liberia, Guanacaste
              </div>

              <h1 className="text-text font-black leading-tight text-4xl sm:text-5xl md:text-6xl mb-6">
                Donde cada día es<br />
                <span style={{ color: "#1A7FBF" }}>una gran</span>{" "}
                <span style={{ color: "#FFD43B" }}>aventura</span> 🌟
              </h1>

              <p className="text-text-muted text-base md:text-lg max-w-lg leading-relaxed mb-8">
                Brindamos un entorno seguro, cálido y estimulante donde los más pequeños aprenden, juegan y desarrollan
                todo su potencial desde el primer día.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 mb-10">
                {["✅ 100% Seguro", "👩‍🏫 Docentes certificados", "🚌 Servicio de transporte", "🥗 Nutrición balanceada"].map((b) => (
                  <span key={b} className="bg-white border border-border text-text text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">{b}</span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/inscripcion" className="btn-accent text-center text-sm px-8 py-4 rounded-xl font-bold">
                  ✨ Inscribir a mi hijo
                </Link>
                <button
                  onClick={() => { const el = document.getElementById("nosotros"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                  className="btn-outline text-center text-sm px-8 py-4"
                >
                  Conocer más
                </button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  {["👩", "👨", "👩", "👨"].map((e, i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-primary-muted border-2 border-white flex items-center justify-center text-sm">{e}</div>
                  ))}
                </div>
                <div>
                  <p className="text-text font-bold text-sm">+200 familias felices</p>
                  <p className="text-text-muted text-xs">nos confían lo más valioso</p>
                </div>
              </div>
            </div>

            {/* Imagen / Card visual */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ background: "linear-gradient(135deg, #E8F4FC 0%, #F0F9FF 100%)" }}>
                <div className="p-8 text-center">
                  <div className="text-8xl mb-4">🧸</div>
                  <p className="text-primary font-black text-2xl mb-2">Un lugar mágico</p>
                  <p className="text-text-muted text-sm">donde cada sonrisa importa</p>
                </div>
                <div className="grid grid-cols-2 gap-4 p-6 pt-0">
                  {[
                    { icon: "🎨", label: "Arte y creatividad", color: "#FFF3CD" },
                    { icon: "🌿", label: "Área al aire libre", color: "#E8F5EE" },
                    { icon: "📚", label: "Estimulación temprana", color: "#E8F4FC" },
                    { icon: "🥗", label: "Comida nutritiva", color: "#FFF3CD" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl p-4 text-center" style={{ backgroundColor: item.color }}>
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <p className="text-text text-xs font-semibold leading-tight">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 border border-border">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#E8F4FC" }}>⭐</div>
                <div>
                  <p className="text-text font-black text-sm">4.9 / 5.0</p>
                  <p className="text-text-muted text-xs">Calificación de padres</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
