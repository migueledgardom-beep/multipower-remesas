# 🔥 Multipower Remesas — MVP

Calculadora de remesas internacionales con integración WhatsApp.

## Stack
- React 18 + Vite
- TailwindCSS
- Firebase Auth
- Google Sheets (fuente de tasas)
- Deploy: Vercel

## Flujo del usuario
1. **Login** → email + contraseña (Firebase Auth)
2. **Calculadora** → selecciona país, ingresa monto → ve resultado en Bs y USD
3. **Formulario** → datos del beneficiario
4. **WhatsApp** → mensaje generado automáticamente

---

## Configuración en 5 pasos

### 1. Instalar dependencias
```bash
npm install
```

### 2. Crear proyecto Firebase
- Ve a https://console.firebase.google.com
- Crea un proyecto nuevo
- Activa **Authentication > Email/Password**
- Ve a Project Settings > Web App > copia credenciales

### 3. Configurar Google Sheets
Crea una hoja llamada `CONFIG` con esta estructura:

| KEY | VALUE |
|-----|-------|
| BCV_BACKUP | 92.14 |
| CLP_RATE | 0.115 |
| PEN_RATE | 1.22 |
| COP_RATE | 0.026 |
| USD_RATE | 1 |
| BRL_RATE | 18.5 |
| EUR_RATE | 102 |
| MXN_RATE | 5.8 |
| ARS_RATE | 0.062 |

Luego: **Archivo > Compartir > Publicar en la web > CSV > Copiar URL**

### 4. Variables de entorno
```bash
cp .env.example .env
# Edita .env con tus valores reales
```

### 5. Desarrollo local
```bash
npm run dev
```

---

## Deploy en Vercel

1. Conecta el repo en https://vercel.com/new
2. En **Environment Variables**, agrega todas las variables del `.env.example`
3. Deploy automático en cada push a `main`

---

## Actualizar tasas

Solo edita la hoja Google Sheets. La app se actualiza automáticamente cada 5 minutos sin redeploy.

## Cambiar número de WhatsApp

Edita `VITE_WA_NUMBER` en las variables de entorno de Vercel.
