"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function ConfirmacionContent() {
  const params = useSearchParams();
  const nombre = params.get("nombre") || "tu hijo/a";
  const id = params.get("id");

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="card p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl" style={{ backgroundColor: "#E8F5EE" }}>
          🎉
        </div>
        <h2 className="text-text font-black text-2xl mb-2">¡Inscripción Recibida!</h2>
        {id && <p className="text-text-muted text-xs mb-2">Número de solicitud: <span className="font-bold text-primary">#{id}</span></p>}
        <p className="text-text-muted text-sm mb-6 leading-relaxed">
          Hemos recibido la solicitud de inscripción de <strong className="text-text">{nombre}</strong>.
          Nos pondremos en contacto contigo en las próximas 24 horas para confirmar el cupo.
        </p>
        <div className="bg-surface rounded-2xl p-4 mb-6 text-left flex flex-col gap-3 border border-border">
          <p className="text-text-muted text-xs font-bold uppercase tracking-wider">¿Qué sigue?</p>
          {[
            { icon: "📧", text: "Revisá tu email, te enviamos un resumen de la solicitud" },
            { icon: "📞", text: "Te llamamos para confirmar disponibilidad de cupo" },
            { icon: "🏫", text: "Coordinamos una visita guiada a nuestras instalaciones" },
          ].map((s) => (
            <div key={s.text} className="flex items-start gap-3">
              <span className="text-lg">{s.icon}</span>
              <p className="text-text text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <a href="https://wa.me/50688888888" target="_blank"
            className="btn-primary w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
            💬 Escribir por WhatsApp
          </a>
          <Link href="/" className="btn-outline w-full py-3 text-sm">Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}

export default function Confirmacion() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Cargando...</p></div>}>
        <ConfirmacionContent />
      </Suspense>
      <Footer />
    </main>
  );
}
