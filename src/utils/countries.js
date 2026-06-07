// src/utils/countries.js
// Mapeo de países con moneda y clave de tasa en Google Sheets

export const COUNTRIES = [
  { name: 'Chile', flag: '🇨🇱', currency: 'CLP' },

  { name: 'Venezuela', flag: '🇻🇪', currency: 'BS' },

  { name: 'México', flag: '🇲🇽', currency: 'MXN' },

  { name: 'Argentina', flag: '🇦🇷', currency: 'ARS' },

  {
    name: 'República Dominicana',
    flag: '🇩🇴',
    currency: 'DOP',
  },

  { name: 'Colombia', flag: '🇨🇴', currency: 'COP' },

  { name: 'Perú', flag: '🇵🇪', currency: 'PEN' },

  {
    name: 'Estados Unidos',
    flag: '🇺🇸',
    currency: 'USD',
  },

  { name: 'Panamá', flag: '🇵🇦', currency: 'USD' },

  { name: 'España', flag: '🇪🇸', currency: 'EUR' },

  { name: 'Ecuador', flag: '🇪🇨', currency: 'USD' },

  { name: 'Brasil', flag: '🇧🇷', currency: 'BRL' },
]

export const BANKS_BY_COUNTRY = {
  Venezuela: [
    'Banco de Venezuela',
    'Banesco',
    'Mercantil',
    'Provincial (BBVA)',
    'Bicentenario',
    'Del Tesoro',
    'Activo',
    'BNC',
    'Bancamiga',
    'Otro',
  ],

  Chile: [
    'BancoEstado',
    'Banco de Chile',
    'Santander',
    'BCI',
    'Scotiabank',
    'Itaú',
    'Banco Falabella',
    'Banco Security',
    'Otro',
  ],

  Colombia: [
    'Bancolombia',
    'Davivienda',
    'BBVA Colombia',
    'Banco de Bogotá',
    'Banco de Occidente',
    'Nequi',
    'Daviplata',
    'Otro',
  ],

  Perú: [
    'BCP',
    'Interbank',
    'BBVA Perú',
    'Scotiabank Perú',
    'Banco Pichincha',
    'Otro',
  ],

  México: [
    'BBVA México',
    'Banorte',
    'Santander México',
    'Citibanamex',
    'HSBC México',
    'Otro',
  ],

  Argentina: [
    'Banco Nación',
    'Banco Galicia',
    'Banco Santander',
    'BBVA Argentina',
    'Banco Macro',
    'Otro',
  ],

  Brasil: [
    'Banco do Brasil',
    'Itaú',
    'Bradesco',
    'Santander Brasil',
    'Caixa',
    'Otro',
  ],

  España: [
    'Santander',
    'BBVA',
    'CaixaBank',
    'Sabadell',
    'Bankinter',
    'Otro',
  ],

  Ecuador: [
    'Banco Pichincha',
    'Banco Guayaquil',
    'Produbanco',
    'Banco del Pacífico',
    'Otro',
  ],

  Panamá: [
    'Banco General',
    'Banistmo',
    'BAC Panamá',
    'Caja de Ahorros',
    'Otro',
  ],

  'Estados Unidos': [
    'Bank of America',
    'Chase',
    'Wells Fargo',
    'Citibank',
    'US Bank',
    'Otro',
  ],

  'República Dominicana': [
    'Banreservas',
    'Banco Popular',
    'BHD',
    'Scotiabank RD',
    'Otro',
  ],
}