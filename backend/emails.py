import resend
import os

resend.api_key = os.getenv("RESEND_API_KEY")

def enviar_confirmacion_inscripcion(nombre_tutor: str, email: str, nombre_nino: str, inscripcion_id: int):
    try:
        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
        resend.Emails.send({
            "from": "Pequeños Gigantes <inscripciones@pequenosgigantes.com>",
            "to": email,
            "subject": f"✅ Solicitud de inscripción recibida — {nombre_nino}",
            "html": f"""
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#F8FBFF;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;margin-top:20px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#1A7FBF 0%,#0F5A8A 100%);padding:40px 32px;text-align:center;">
      <p style="color:rgba(255,255,255,0.8);font-size:12px;letter-spacing:2px;margin:0 0 8px;text-transform:uppercase;">Guardería Infantil</p>
      <h1 style="color:#ffffff;font-size:28px;font-weight:900;margin:0;">Pequeños Gigantes 🌟</h1>
      <p style="color:rgba(255,255,255,0.7);font-size:12px;margin:8px 0 0;">Liberia, Guanacaste · Costa Rica</p>
    </div>
    <div style="background:#E8F5EE;padding:20px 32px;text-align:center;">
      <div style="display:inline-block;background:#4CAF8A;color:#fff;font-weight:900;font-size:12px;letter-spacing:2px;padding:8px 24px;border-radius:20px;text-transform:uppercase;">
        🎉 Solicitud Recibida
      </div>
      <p style="color:#2D5A3D;font-size:14px;margin:12px 0 0;">Hola <strong>{nombre_tutor}</strong>, recibimos la solicitud de inscripción de <strong>{nombre_nino}</strong>.</p>
    </div>
    <div style="padding:32px;">
      <p style="color:#1A2B3C;font-size:14px;line-height:1.7;margin:0 0 20px;">
        Nos pondremos en contacto contigo en las próximas <strong>24 horas</strong> para confirmar la disponibilidad de cupo y coordinar una visita a nuestras instalaciones.
      </p>
      <div style="background:#F8FBFF;border-radius:12px;padding:20px;border:1px solid #E2EEF7;margin-bottom:24px;">
        <p style="color:#6B8299;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">Número de solicitud</p>
        <p style="color:#1A7FBF;font-size:24px;font-weight:900;margin:0;">#{inscripcion_id}</p>
      </div>
      <div style="background:#FFF9E6;border-left:3px solid #FFD43B;padding:16px;border-radius:0 8px 8px 0;margin-bottom:24px;">
        <p style="color:#6B5B00;font-size:13px;margin:0;line-height:1.6;">
          <strong>¿Tienes preguntas?</strong> Escríbenos por WhatsApp al <a href="https://wa.me/50688888888" style="color:#1A7FBF;">+506 8888-8888</a> o responde este email.
        </p>
      </div>
    </div>
    <div style="background:#F8FBFF;padding:20px 32px;text-align:center;border-top:1px solid #E2EEF7;">
      <p style="color:#6B8299;font-size:12px;margin:0;">© 2026 Pequeños Gigantes Guardería Infantil · Todos los derechos reservados</p>
    </div>
  </div>
</body>
</html>
            """
        })
    except Exception as e:
        print(f"Error enviando email: {e}")
