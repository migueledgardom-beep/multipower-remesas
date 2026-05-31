// src/utils/whatsapp.js
// Genera y abre el link de WhatsApp con el mensaje formateado

import useStore from '../store/useStore'

/**
 * Construye el mensaje de WhatsApp con los datos del envío
 */
export function buildWhatsAppMessage({ country, amount, currency, rate, totalBs, formData }) {
  const bsFormatted = totalBs.toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    `🔥 *SOLICITUD MULTIPOWER*\n\n` +
    `📍 País origen: ${country}\n` +
    `💵 Monto enviado: ${amount.toLocaleString()} ${currency}\n` +
    `📈 Tasa: 1 ${currency} = Bs. ${rate}\n\n` +
    `🏦 Banco: ${formData.bank}\n` +
    `🔢 Cuenta: ${formData.account}\n` +
    `👤 Beneficiario: ${formData.name}\n` +
    `🪪 Cédula: ${formData.cedula}\n` +
    `📱 Teléfono: ${formData.phone}\n` +
    `💰 Monto Bs: ${bsFormatted}\n\n` +
    `📎 _Adjunto capture de transferencia_`
  )
}

/**
 * Abre WhatsApp con el mensaje generado
 */
export function openWhatsApp(message) {
  const rates = useStore.getState().rates
  const waNumber = rates?.WHATSAPP_NUMBER || '58412000000'

  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}
