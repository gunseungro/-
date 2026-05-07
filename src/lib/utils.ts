import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat('ko-KR').format(num);
}

export function formatCurrency(num: number) {
  return `${formatNumber(num)}원`;
}
