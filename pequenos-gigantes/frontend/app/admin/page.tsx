"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Inscripcion {
  id: number;
  nombre_nino: string;
  fecha_nacimiento: string;
  alergias: string | null;
  condiciones_medicas: string | null;
  nombre_tutor: string;
  telefono: string;
  email: string;
  tipo_jornada: string | null;
  transporte: boolean;
  estado: string;
  creado_en: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const SIDEBAR = ["Dashboard", "Inscripciones", "Asistencia", "Transporte", "Pagos"];

function calcularEdad(fecha: string) {
  if (!fecha) return "";
  const hoy = new Date();
  const nac = new Date(fecha);
  const diff = hoy.getFullYear() - nac.getFullYear();
  return `${diff} año${diff !== 1 ? "s" : ""}`;
}

export default function Admin() {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [vistaActual, setVistaActual] = useState("Inscripciones");
  const [seleccionada, setSeleccionada] = useState<Inscripcion | null>(null);
  const router = useRouter();

  const cargar = useCallback(async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) return;
    try {
      const res = await fetch(`${API}/inscripciones/`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setInscripciones(Array.isArray(data) ? data : []);
    } catch { setInscripciones([]); }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) { router.push("/login"); return; }
    fetch(`${API}/auth/verificar`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => { if (!res.ok) { localStorage.removeItem("admin_token"); router.push("/login"); } })
      .catch(() => { localStorage.removeItem("admin_token"); router.push("/login"); });
  }, [router]);

  useEffect(() => { cargar().finally(() => setCargando(false)); }, [cargar]);

  const cambiarEstado = async (id: number, estado: string) => {
    const token = localStorage.getItem("admin_token");
    await fetch(`${API}/inscripciones/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ estado }),
    });
    await cargar();
    if (seleccionada?.id === id) setSeleccionada((prev) => prev ? { ...prev, estado } : null);
  };

  const filtradas = inscripciones
    .filter((i) => filtro === "todos" || i.estado === filtro)
    .filter((i) => !busqueda || i.nombre_nino.toLowerCase().includes(busqueda.toLowerCase()) || i.nombre_tutor.toLowerCase().includes(busqueda.toLowerCase()));

  const stats = {
    total: inscripciones.length,
    pendientes: inscripciones.filter((i) => i.estado === "pendiente").length,
    confirmados: inscripciones.filter((i) => i.estado === "confirmado").length,
    transporte: inscripciones.filter((i) => i.transporte).length,
  };

  const estadoBadge = (estado: string) => {
    if (estado === "confirmado") return "badge-success";
    if (estado === "cancelado") return "badge-alert";
    return "badge-warning";
  };

  return (
    <div className="flex h-screen bg-surface overflow-hidden" style={{ fontFamily: "var(--font-sans)" }}>

      {/* Sidebar */}
      <div className="w-56 bg-text flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ backgroundColor: "#1A7FBF" }}>🌟</div>
            <div>
              <p className="text-white font-black text-xs leading-none">Pequeños Gigantes</p>
              <p className="text-white/40 text-xs mt-0.5">Panel Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {SIDEBAR.map((item) => (
            <button key={item} onClick={() => setVistaActual(item)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${vistaActual === item ? "bg-primary text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
              {item === "Dashboard" && "📊 "}
              {item === "Inscripciones" && "👶 "}
              {item === "Asistencia" && "✅ "}
              {item === "Transporte" && "🚌 "}
              {item === "Pagos" && "💳 "}
              {item}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => { localStorage.removeItem("admin_token"); router.push("/login"); }}
            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-all">
            🚪 Cerrar sesión
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-text font-black text-xl">{vistaActual}</h1>
            <p className="text-text-muted text-xs">Pequeños Gigantes · {new Date().toLocaleDateString("es-CR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-text-muted text-sm">Admin Principal</span>
            <div className="w-9 h-9 rounded-full bg-primary-muted flex items-center justify-center text-primary font-black text-sm">A</div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total inscritos", value: stats.total, icon: "👶", color: "#E8F4FC" },
              { label: "Pendientes", value: stats.pendientes, icon: "⏳", color: "#FFF9E6" },
              { label: "Confirmados", value: stats.confirmados, icon: "✅", color: "#E8F5EE" },
              { label: "Con transporte", value: stats.transporte, icon: "🚌", color: "#E8F4FC" },
            ].map((s) => (
              <div key={s.label} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: s.color }}>{s.icon}</div>
                </div>
                <p className="text-text font-black text-2xl">{s.value}</p>
                <p className="text-text-muted text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input type="text" placeholder="Buscar niño o tutor..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
              className="flex-1 border border-border rounded-xl px-4 py-2.5 text-text text-sm focus:outline-none focus:border-primary bg-white" />
            <div className="flex gap-2">
              {["todos", "pendiente", "confirmado", "cancelado"].map((f) => (
                <button key={f} onClick={() => setFiltro(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all capitalize ${filtro === f ? "bg-primary border-primary text-white" : "border-border text-text-muted hover:border-primary"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="flex gap-4">

            {/* Table */}
            <div className="flex-1 card overflow-hidden">
              {cargando ? (
                <div className="p-12 text-center text-text-muted text-sm">Cargando inscripciones...</div>
              ) : filtradas.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-4xl mb-3">🧒</p>
                  <p className="text-text-muted text-sm">No hay inscripciones que mostrar</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="bg-surface border-b border-border">
                    <tr>
                      <th className="text-left px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider">Niño / Edad</th>
                      <th className="text-left px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider">Tutor</th>
                      <th className="text-left px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider">Horario</th>
                      <th className="text-left px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider">Estado</th>
                      <th className="text-left px-4 py-3 text-text-muted text-xs font-bold uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtradas.map((ins) => (
                      <tr key={ins.id} onClick={() => setSeleccionada(ins)}
                        className={`cursor-pointer hover:bg-surface transition-colors ${seleccionada?.id === ins.id ? "bg-primary-muted" : ""}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary-muted flex items-center justify-center text-primary font-black text-sm">
                              {ins.nombre_nino.charAt(0)}
                            </div>
                            <div>
                              <p className="text-text font-bold">{ins.nombre_nino}</p>
                              <p className="text-text-muted text-xs">{calcularEdad(ins.fecha_nacimiento)}</p>
                            </div>
                            {ins.alergias && ins.alergias !== "Ninguna" && ins.alergias.trim() !== "" && (
                              <span className="badge-alert">⚠️ {ins.alergias.split(",")[0]}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-text text-sm">{ins.nombre_tutor}</p>
                          <p className="text-text-muted text-xs">{ins.telefono}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-text text-sm capitalize">{ins.tipo_jornada || "—"}</p>
                          {ins.transporte && <span className="badge-pending">🚌 Transporte</span>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={estadoBadge(ins.estado)}>{ins.estado}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            {ins.estado === "pendiente" && (
                              <button onClick={() => cambiarEstado(ins.id, "confirmado")}
                                className="text-xs font-bold text-mint hover:underline">Confirmar</button>
                            )}
                            {ins.estado !== "cancelado" && (
                              <button onClick={() => cambiarEstado(ins.id, "cancelado")}
                                className="text-xs font-bold text-red-500 hover:underline">Cancelar</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Detail panel */}
            {seleccionada && (
              <div className="w-72 card p-5 flex flex-col gap-4 h-fit flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-text font-black text-sm">Ficha del niño</h3>
                  <button onClick={() => setSeleccionada(null)} className="text-text-muted hover:text-text text-lg leading-none">×</button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-muted flex items-center justify-center text-primary font-black text-lg">
                    {seleccionada.nombre_nino.charAt(0)}
                  </div>
                  <div>
                    <p className="text-text font-black text-sm">{seleccionada.nombre_nino}</p>
                    <p className="text-text-muted text-xs">{calcularEdad(seleccionada.fecha_nacimiento)}</p>
                  </div>
                </div>
                {seleccionada.alergias && seleccionada.alergias !== "Ninguna" && seleccionada.alergias.trim() !== "" && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-red-600 text-xs font-bold mb-1">⚠️ NOTA MÉDICA</p>
                    <p className="text-red-700 text-xs">Alergias: {seleccionada.alergias}</p>
                    {seleccionada.condiciones_medicas && <p className="text-red-700 text-xs mt-1">{seleccionada.condiciones_medicas}</p>}
                  </div>
                )}
                <div className="flex flex-col gap-2 text-xs">
                  {[
                    { label: "Tutor", value: seleccionada.nombre_tutor },
                    { label: "Teléfono", value: seleccionada.telefono },
                    { label: "Email", value: seleccionada.email },
                    { label: "Jornada", value: seleccionada.tipo_jornada || "—" },
                    { label: "Transporte", value: seleccionada.transporte ? "Sí ✅" : "No" },
                    { label: "Estado", value: seleccionada.estado },
                  ].map((f) => (
                    <div key={f.label} className="flex justify-between border-b border-border pb-2">
                      <span className="text-text-muted font-semibold">{f.label}</span>
                      <span className="text-text font-bold capitalize">{f.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {seleccionada.estado === "pendiente" && (
                    <button onClick={() => cambiarEstado(seleccionada.id, "confirmado")}
                      className="btn-primary text-xs py-2 w-full rounded-xl">✅ Confirmar inscripción</button>
                  )}
                  <a href={`https://wa.me/${seleccionada.telefono}`} target="_blank"
                    className="block text-center text-xs font-bold py-2 rounded-xl border-2 border-border text-text-muted hover:border-primary hover:text-primary transition-all">
                    💬 Llamar tutor
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
