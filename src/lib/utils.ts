export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPhone(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 10);
}
