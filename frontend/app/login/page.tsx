"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async () => {
    if (!usuario || !password) { setError("Completa todos los campos"); return; }
    setCargando(true); setError("");
    try {
      const form = new FormData();
      form.append("username", usuario);
      form.append("password", password);
      const res = await fetch(`${API}/auth/login`, { method: "POST", body: form });
      if (!res.ok) { setError("Credenciales incorrectas"); return; }
      const data = await res.json();
      localStorage.setItem("admin_token", data.access_token);
      router.push("/admin");
    } catch { setError("Error de conexión"); }
    finally { setCargando(false); }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="card p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4" style={{ backgroundColor: "#E8F4FC" }}>🌟</div>
          <h1 className="text-text font-black text-2xl">Pequeños Gigantes</h1>
          <p className="text-text-muted text-sm mt-1">Panel de administración</p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Usuario</label>
            <input type="text" placeholder="admin" value={usuario} onChange={(e) => setUsuario(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary bg-surface" />
          </div>
          <div>
            <label className="text-text-muted text-xs font-semibold uppercase tracking-wider block mb-2">Contraseña</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              className="w-full border border-border rounded-xl px-4 py-3 text-text text-sm focus:outline-none focus:border-primary bg-surface" />
          </div>
          {error && <p className="text-red-500 text-xs font-semibold text-center">{error}</p>}
          <button onClick={login} disabled={cargando} className="btn-primary w-full py-3 rounded-xl text-sm disabled:opacity-50">
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </div>
      </div>
    </div>
  );
}
