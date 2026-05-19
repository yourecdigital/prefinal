/** Нормализует ввод к 11 цифрам: 7XXXXXXXXXX */
export function normalizeRuPhoneDigits(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  else if (digits.length > 0 && !digits.startsWith("7")) digits = `7${digits}`;
  return digits.slice(0, 11);
}

/** Маска: +7 (XXX) XXX-XX-XX */
export function formatRuPhoneDisplay(input: string): string {
  const digits = normalizeRuPhoneDigits(input);
  const national = digits.startsWith("7") ? digits.slice(1) : digits;

  if (national.length === 0) return "+7 ";

  let formatted = "+7 (";
  formatted += national.slice(0, 3);
  if (national.length <= 3) return formatted;

  formatted += ") ";
  formatted += national.slice(3, 6);
  if (national.length <= 6) return formatted;

  formatted += "-";
  formatted += national.slice(6, 8);
  if (national.length <= 8) return formatted;

  formatted += "-";
  formatted += national.slice(8, 10);
  return formatted;
}

/** Полный российский номер: 11 цифр, код страны 7, вторая цифра 3–9 */
export function isValidRuPhone(input: string): boolean {
  const digits = normalizeRuPhoneDigits(input);
  if (digits.length !== 11 || digits[0] !== "7") return false;
  const second = digits[1];
  return second >= "3" && second <= "9";
}

/** Для отправки в заказ: +7 (900) 123-45-67 */
export function formatRuPhonePretty(input: string): string {
  const digits = normalizeRuPhoneDigits(input);
  if (digits.length !== 11) return formatRuPhoneDisplay(input);
  const n = digits.slice(1);
  return `+7 (${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6, 8)}-${n.slice(8, 10)}`;
}

export function ruPhoneToTel(input: string): string {
  return `+${normalizeRuPhoneDigits(input)}`;
}
