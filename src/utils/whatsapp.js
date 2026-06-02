// src/utils/whatsapp.js

import useStore from '../store/useStore'

/**
 * Construye el mensaje WhatsApp
 */
export function buildWhatsAppMessage({
  country,
  amount,
  currency,
  rate,
  totalBs,
  formData,
}) {
  return `
━━━━━━━━━━━━━━━
🔥 INVERSIONES MULTIPOWER
━━━━━━━━━━━━━━━

🌎 Destino:
${country}

💰 Monto enviado:
${amount} ${currency}

📈 Tasa:
${rate}

🏦 Banco:
${formData.bank}

👤 Beneficiario:
${formData.name}

🪪 Documento:
${formData.cedula}

📱 Teléfono:
${formData.phone}

💳 Cuenta:
${formData.account}

💵 Total recibido:
${Number(totalBs).toLocaleString(
    'es-VE',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}

━━━━━━━━━━━━━━━
`
}

/**
 * Obtiene número WhatsApp según ref
 */
function getWhatsAppByRef(rates, ref) {
  const refKey =
    `REF_${ref.toUpperCase()}`

  return (
    rates?.[refKey] ||
    rates?.REF_MULTIPOWER ||
    '56940668875'
  )
}

/**
 * Abre WhatsApp
 */
export function openWhatsApp(
  message,
  ref = 'multipower'
) {
  const rates = useStore.getState().rates

  const waNumber =
    getWhatsAppByRef(rates, ref)

  const url =
    `https://wa.me/${waNumber}?text=${encodeURIComponent(
      message
    )}`

  window.open(url, '_blank')
}