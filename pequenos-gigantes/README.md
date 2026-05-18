# 🌟 Pequeños Gigantes — Guardería Infantil

Página web completa para guardería infantil con formulario de inscripción, portal de padres y panel de administración.

## Stack
- **Frontend**: Next.js 15 + Tailwind CSS v4 → Vercel
- **Backend**: FastAPI + SQLAlchemy → Railway
- **DB**: PostgreSQL → Railway
- **Email**: Resend

## Estructura
```
pequenos-gigantes/
├── frontend/          # Next.js 15
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── inscripcion/page.tsx  # Formulario multi-step
│   │   ├── confirmacion/page.tsx # Confirmación
│   │   ├── admin/page.tsx        # Panel admin
│   │   └── login/page.tsx        # Login admin
│   └── components/
│       ├── layout/               # Navbar, Footer
│       ├── sections/             # Hero, Servicios, etc.
│       └── ui/                   # WhatsAppButton
└── backend/           # FastAPI
    ├── main.py
    ├── models/inscripcion.py
    ├── routers/inscripciones.py
    ├── routers/auth.py
    └── emails.py
```

## Setup local

### Frontend
```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
# → http://localhost:3000
```

### Backend
```bash
cd backend
cp .env.example .env
# Editar .env con tus variables
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
# → http://localhost:8000
```

## Variables de entorno

### Frontend (.env.local)
| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL del backend |

### Backend (.env)
| Variable | Descripción |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string de Railway |
| `SECRET_KEY` | Clave para JWT |
| `ADMIN_USERNAME` | Usuario del panel admin |
| `ADMIN_PASSWORD` | Contraseña del panel admin |
| `RESEND_API_KEY` | API key de Resend para emails |
| `FRONTEND_URL` | URL del frontend para links en emails |

## Deploy

### Vercel (Frontend)
1. Push a GitHub
2. Importar en Vercel
3. Agregar `NEXT_PUBLIC_API_URL` en variables de entorno

### Railway (Backend + DB)
1. Crear proyecto en Railway
2. Agregar PostgreSQL plugin
3. Deploy del backend
4. Agregar variables de entorno

## Admin panel
- URL: `/admin`
- Login: `/login`
- Credenciales por defecto: `admin` / `password_temporal` *(cambiar en producción)*

## Desarrollado por
Jose Cerdas Chaves · +506 8343-9232
