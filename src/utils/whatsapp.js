// src/utils/whatsapp.js

import useStore from '../store/useStore'

/**

* Construye el mensaje WhatsApp
  */
  export function buildWhatsAppMessage({
  amount,
  currency,
  totalBs,
  destinationCurrency,
  formData,
  }) {
  return `${formData.bank}
  ${formData.name}
  ${formData.cedula}
  ${formData.phone}
  ${formData.account}
  ${Number(amount).toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${currency}
  ${Number(totalBs).toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${destinationCurrency || 'BS'}`
  }

/**

* Obtiene número WhatsApp según ref
  */function getWhatsAppByRef(rates, ref) {

  const refKey =
    `REF_${String(ref).trim().toUpperCase()}`

  console.log('REF ORIGINAL:', ref)
  console.log('REF KEY:', refKey)
  console.log('RATES:', rates)
  console.log('RESULTADO:', rates?.[refKey])

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
