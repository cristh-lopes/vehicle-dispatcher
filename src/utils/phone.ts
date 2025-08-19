// utils/phone.ts
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';
import ddiData from '@/assets/ddi.json';

export interface DDIEntry {
  pais: string;
  img: string; // URL absoluta da bandeira (ex.: https://upload.wikimedia.org/...)
  ddi: number; // ex.: 55
  continente: string;
  iso?: string; // opcional no seu JSON (BR, US, PT, ...)
}

/**
 * Converte seu JSON (com chaves "0","1",...) em array tipado.
 */
export function getDDIs(): DDIEntry[] {
  const raw = ddiData as Record<string, any>;
  const arr = Object.keys(raw)
    .map((k) => raw[k])
    .filter(Boolean) as DDIEntry[];

  // Garantimos tipos e removemos duplicatas por DDI (se houver)
  const seen = new Set<number>();
  const out: DDIEntry[] = [];
  for (const item of arr) {
    if (!item || typeof item.ddi !== 'number') continue;
    if (seen.has(item.ddi)) continue;
    seen.add(item.ddi);
    out.push(item);
  }
  // Ordena por código
  out.sort((a, b) => a.ddi - b.ddi);
  return out;
}

/**
 * Mapeamento mínimo DDI -> ISO para formato nacional bonito.
 * Se seu JSON já tiver "iso", isso será usado preferencialmente.
 */
const ISO_BY_DDI: Record<number, string> = {
  1: 'US', // US/CA (padrão US)
  7: 'RU',
  20: 'EG',
  27: 'ZA',
  30: 'GR',
  31: 'NL',
  32: 'BE',
  33: 'FR',
  34: 'ES',
  39: 'IT',
  40: 'RO',
  41: 'CH',
  43: 'AT',
  44: 'GB',
  45: 'DK',
  46: 'SE',
  47: 'NO',
  48: 'PL',
  49: 'DE',
  52: 'MX',
  54: 'AR',
  55: 'BR',
  56: 'CL',
  57: 'CO',
  58: 'VE',
  60: 'MY',
  61: 'AU',
  62: 'ID',
  63: 'PH',
  64: 'NZ',
  65: 'SG',
  66: 'TH',
  81: 'JP',
  82: 'KR',
  84: 'VN',
  86: 'CN',
  90: 'TR',
  91: 'IN',
  92: 'PK',
  93: 'AF',
  94: 'LK',
  95: 'MM',
  98: 'IR',
  211: 'SS',
  212: 'MA',
  213: 'DZ',
  216: 'TN',
  218: 'LY',
  351: 'PT',
  352: 'LU',
  353: 'IE',
  354: 'IS',
  355: 'AL',
  356: 'MT',
  357: 'CY',
  358: 'FI',
  359: 'BG',
  380: 'UA',
  381: 'RS',
  385: 'HR',
  386: 'SI',
  420: 'CZ',
  421: 'SK',
  971: 'AE',
  972: 'IL',
  973: 'BH',
  974: 'QA',
  975: 'BT',
  976: 'MN',
  977: 'NP',
};

export function isoFromDDI(ddi: number, hint?: string): string | undefined {
  return hint || ISO_BY_DDI[ddi];
}

/**
 * Formata para exibição "nacional" usando libphonenumber (ex.: BR => (11) 91234-5678).
 * Se não souber o ISO, devolve os dígitos crus (sem máscara).
 */
export function formatNational(digitsOnly: string, ddi: number, isoHint?: string): string {
  const iso = isoFromDDI(ddi, isoHint);
  if (!digitsOnly) return '';
  if (iso) {
    const typer = new AsYouType(iso as any);
    return typer.input(digitsOnly);
  }
  return digitsOnly;
}

/** Remove tudo que não for dígito. */
export function toDigits(s: string): string {
  return (s || '').replace(/\D/g, '');
}

/** Validação real via libphonenumber-js (E.164). */
export function isValidPhone(digitsOnly: string, ddi: number): boolean {
  if (!digitsOnly) return false;
  const e164 = `+${ddi}${digitsOnly}`;
  const parsed = parsePhoneNumberFromString(e164);
  return Boolean(parsed?.isValid());
}

/** Retorna E.164 pronto para enviar ao backend/DB. */
export function toE164(digitsOnly: string, ddi: number): string {
  return `+${ddi}${digitsOnly}`;
}
