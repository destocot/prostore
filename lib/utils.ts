import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export function formatNumberWithDecimal(n: number): string {
  const [int, decimal] = n.toString().split('.')

  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`
}