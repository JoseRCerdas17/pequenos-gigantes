"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const pasos = ["Información del Niño", "Padre o Tutor", "Servicios"];

const alergias = ["Gluten", "Lactosa", "Maní", "Huevo", "Frutos secos", "Polen", "Ninguna"];

export default function Inscripcion() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [cargando, setCargando] = useState(false);

  // Paso 1 - Niño
  const [nombreNino, setNombreNino] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");
  const [pediatra, setPediatra] = useState("");
  const [alergiasSel, setAlergiasSel] = useState<string[]>([]);
  const [condiciones, setCondiciones] = useState("");

  // Paso 2 - Tutor
  const [nombreTutor, setNombreTutor] = useState("");
  const [relacion, setRelacion] = useState("");
  const [telefonoPrincipal, setTelefonoPrincipal] = useState("");
  const [telefonoSecundario, setTelefonoSecundario] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [personasAutorizadas, setPersonasAutorizadas] = useState([{ nombre: "", telefono: "" }]);

  // Paso 3 - Servicios
  const [tipoJornada, setTipoJornada] = useState<"media" | "completa" | "">("");
  const [horaEntrada, setHoraEntrada] = useState("07:00");
  const [horaSalida, setHoraSalida] = useState("18:00");
  const [transporte, setTransporte] = useState(false);
  const [direccionRecogida, setDireccionRecogida] = useState("");
  const [notas, setNotas] = useState("");

  const toggleAlergia = (a: string) => {
    setAlergiasSel((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const addPersonaAutorizada = () =>
    setPersonasAutorizadas((prev) => [...prev, { nombre: "", telefono: "" }]);

  const confirmarInscripcion = async () => {
    if (!nombreTutor || !email || !telefonoPrincipal) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }
    setCargando(true);
    try {
      const res = await fetch(`${API}/inscripciones/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_nino: nombreNino,
          fecha_nacimiento: fechaNacimiento,
          genero,
          pediatra,
          alergias: alergiasSel.join(", "),
          condiciones_medicas: condiciones,
          nombre_tutor: nombreTutor,
          relacion,
          telefono: telefonoPrincipal,
          telefono_secundario: telefonoSecundario,
          email,
          direccion,
          personas_autorizadas: JSON.stringify(personasAutorizadas),
          tipo_jornada: tipoJornada,
          hora_entrada: horaEntrada,
          hora_salida: horaSalida,
          transporte,
          direccion_recogida: direccionRecogida,
          notas,
          estado: "pendiente",
        }),
      });
      if (!res.ok) throw new Error("Error");
      const data = await res.json();
      router.push(`/confirmacion?id=${data.id}&nombre=${encodeURIComponent(nombreNino)}`);
    } catch {
      // Demo: go to confirmation anyway
      router.push(`/confirmacion?nombre=${encodeURIComponent(nombreNino)}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-surface pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-text font-black text-3xl md:text-4xl mb-2">Formulario de Inscripción</h1>
            <p className="text-text-muted text-sm">Complete los pasos para reservar el lugar de su hijo/a.</p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center mb-10 gap-2">
            {pasos.map((p, i) => (
              <div key={p} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${i <= paso ? "text-primary" : "text-text-muted"}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${i < paso ? "bg-primary border-primary text-white" : i === paso ? "border-primary text-primary" : "border-border text-text-muted"}`}>
                    {i < paso ? "✓" : i + 1}
                  </div>
                  <span className="text-xs font-semibold hidden sm:block">{p}</span>
                </div>
                {i < pasos.length - 1 && <div className={`w-8 h-0.5 ${i < paso ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <div className="card p-6 md:p-8">

            {/* PASO 1 - NIÑO */}
            {paso === 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#E8F4FC" }}>🧒</div>
                  <div>
                    <h2 className="text-text font-black text-xl">Datos del Niño/a</h2>
                    <p className="text-text-muted text-xs">Información básica para conocer a nuestro futuro alumno.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Nombre completo *</label>
                    <input type="text" placeholder="Ej. Mateo García López" value={nombreNino} onChange={(e) => setNombreNino(e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary transition-colors bg-surface" />
                  </div>
                  <div>
                    <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Fecha de nacimiento *</label>
                    <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary transition-colors bg-surface" />
                  </div>
                  <div>
                    <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Género</label>
                    <div className="flex gap-4 mt-1">
                      {["Masculino", "Femenino", "Otro"].map((g) => (
                        <label key={g} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="genero" value={g} checked={genero === g} onChange={() => setGenero(g)} className="accent-primary" />
                          <span className="text-text text-sm">{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Pediatra de cabecera</label>
                    <input type="text" placeholder="Nombre del Dr/Dra" value={pediatra} onChange={(e) => setPediatra(e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary transition-colors bg-surface" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-3">Alergias conocidas</label>
                  <div className="flex flex-wrap gap-2">
                    {alergias.map((a) => (
                      <button key={a} type="button" onClick={() => toggleAlergia(a)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all ${alergiasSel.includes(a) ? "bg-primary border-primary text-white" : "bg-surface border-border text-text-muted hover:border-primary"}`}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">❤️ Condiciones médicas importantes</label>
                  <textarea placeholder="Describe cualquier condición médica, medicación actual o cuidados especiales..." value={condiciones} onChange={(e) => setCondiciones(e.target.value)}
                    rows={3} className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary transition-colors bg-surface resize-none" />
                </div>
              </div>
            )}

            {/* PASO 2 - TUTOR */}
            {paso === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#E8F5EE" }}>👨‍👩‍👦</div>
                  <div>
                    <h2 className="text-text font-black text-xl">Padre o Tutor</h2>
                    <p className="text-text-muted text-xs">Información del responsable legal del niño.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Nombre completo *</label>
                    <input type="text" placeholder="Tu nombre completo" value={nombreTutor} onChange={(e) => setNombreTutor(e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary transition-colors bg-surface" />
                  </div>
                  <div>
                    <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Relación con el niño</label>
                    <select value={relacion} onChange={(e) => setRelacion(e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary transition-colors bg-surface">
                      <option value="">Seleccionar...</option>
                      <option>Madre</option><option>Padre</option><option>Abuelo/a</option><option>Tío/a</option><option>Tutor legal</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Teléfono principal *</label>
                    <input type="tel" placeholder="8888-8888" value={telefonoPrincipal} onChange={(e) => setTelefonoPrincipal(e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary transition-colors bg-surface" />
                  </div>
                  <div>
                    <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Teléfono secundario</label>
                    <input type="tel" placeholder="8888-8888" value={telefonoSecundario} onChange={(e) => setTelefonoSecundario(e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary transition-colors bg-surface" />
                  </div>
                  <div>
                    <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Email *</label>
                    <input type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary transition-colors bg-surface" />
                  </div>
                  <div>
                    <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Dirección</label>
                    <input type="text" placeholder="Calle, barrio, ciudad" value={direccion} onChange={(e) => setDireccion(e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary transition-colors bg-surface" />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-text-muted text-xs font-semibold uppercase tracking-wider">Personas autorizadas a recoger</label>
                    <button type="button" onClick={addPersonaAutorizada} className="text-primary text-xs font-bold hover:underline">+ Agregar</button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {personasAutorizadas.map((p, i) => (
                      <div key={i} className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder={`Nombre persona ${i + 1}`} value={p.nombre}
                          onChange={(e) => { const arr = [...personasAutorizadas]; arr[i].nombre = e.target.value; setPersonasAutorizadas(arr); }}
                          className="border border-border rounded-xl px-4 py-2.5 text-text text-sm focus:outline-none focus:border-primary bg-surface" />
                        <input type="tel" placeholder="Teléfono" value={p.telefono}
                          onChange={(e) => { const arr = [...personasAutorizadas]; arr[i].telefono = e.target.value; setPersonasAutorizadas(arr); }}
                          className="border border-border rounded-xl px-4 py-2.5 text-text text-sm focus:outline-none focus:border-primary bg-surface" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PASO 3 - SERVICIOS */}
            {paso === 2 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: "#FFF9E6" }}>⚙️</div>
                  <div>
                    <h2 className="text-text font-black text-xl">Configuración de Servicio</h2>
                    <p className="text-text-muted text-xs">Seleccioná el horario y servicios adicionales.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Hora de entrada</label>
                    <input type="time" value={horaEntrada} onChange={(e) => setHoraEntrada(e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary bg-surface" />
                  </div>
                  <div>
                    <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Hora de salida</label>
                    <input type="time" value={horaSalida} onChange={(e) => setHoraSalida(e.target.value)}
                      className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary bg-surface" />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-3">Tipo de jornada</label>
                  <div className="flex gap-3">
                    {[{ id: "media", label: "Media Jornada" }, { id: "completa", label: "Jornada Completa" }].map((j) => (
                      <button key={j.id} type="button" onClick={() => setTipoJornada(j.id as "media" | "completa")}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${tipoJornada === j.id ? "bg-primary border-primary text-white" : "border-border text-text-muted hover:border-primary"}`}>
                        {j.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transporte toggle */}
                <div className={`rounded-2xl p-5 mb-6 border-2 transition-all ${transporte ? "border-primary bg-primary-muted" : "border-border bg-surface"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: "#E8F4FC" }}>🚌</div>
                      <div>
                        <p className="text-text font-bold text-sm">Servicio de Transporte</p>
                        <p className="text-text-muted text-xs">Ruta puerta a puerta</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setTransporte(!transporte)}
                      className={`w-12 h-6 rounded-full transition-all duration-300 relative ${transporte ? "bg-primary" : "bg-border"}`}>
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${transporte ? "left-6" : "left-0.5"}`} />
                    </button>
                  </div>
                  {transporte && (
                    <div className="mt-4">
                      <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Dirección de recogida</label>
                      <input type="text" placeholder="Calle, número, referencias..." value={direccionRecogida} onChange={(e) => setDireccionRecogida(e.target.value)}
                        className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary bg-white" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Observaciones adicionales</label>
                  <textarea placeholder="Ej: Portería con timbre dañado, dejar con la abuela los viernes..." value={notas} onChange={(e) => setNotas(e.target.value)}
                    rows={3} className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary bg-surface resize-none" />
                </div>

                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
                  <span className="text-yellow-500 text-lg">ℹ️</span>
                  <p className="text-yellow-800 text-xs leading-relaxed">
                    Aseguráte de que toda la información sea correcta antes de enviar. Recibirás un correo de confirmación en breve.
                  </p>
                </div>
              </div>
            )}

            {/* Navegación */}
            <div className="flex justify-between mt-8">
              {paso > 0 ? (
                <button onClick={() => setPaso(paso - 1)} className="btn-outline text-sm px-6 py-3">← Atrás</button>
              ) : <div />}
              {paso < 2 ? (
                <button onClick={() => {
                  if (paso === 0 && !nombreNino) { alert("Ingresá el nombre del niño"); return; }
                  if (paso === 0 && !fechaNacimiento) { alert("Ingresá la fecha de nacimiento"); return; }
                  setPaso(paso + 1);
                }} className="btn-primary text-sm px-8 py-3">
                  Siguiente paso →
                </button>
              ) : (
                <button onClick={confirmarInscripcion} disabled={cargando} className="btn-accent text-sm px-8 py-3 disabled:opacity-50 font-bold rounded-xl">
                  {cargando ? "Enviando..." : "✨ Confirmar y Enviar"}
                </button>
              )}
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { icon: "🔒", label: "Pago 100% Seguro" },
              { icon: "❤️", label: "Cuidado Profesional" },
              { icon: "📅", label: "Plazas Limitadas" },
            ].map((b) => (
              <div key={b.label} className="card p-4 text-center">
                <div className="text-xl mb-1">{b.icon}</div>
                <p className="text-text-muted text-xs font-semibold">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
