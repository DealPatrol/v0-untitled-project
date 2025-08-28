import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters except +
  const cleanPhone = phone.replace(/[\s\-().]/g, "")
  // Basic international phone number validation
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(cleanPhone)
}

export function validateZipCode(zipCode: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/
  return zipRegex.test(zipCode)
}

export function generateQRCodeUrl(memorialId: string): string {
  return `${process.env.NEXT_PUBLIC_SITE_URL || "https://memorialqr.com"}/qr/${memorialId}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}

export function getInitials(firstName?: string, lastName?: string): string {
  const first = firstName?.charAt(0)?.toUpperCase() || ""
  const last = lastName?.charAt(0)?.toUpperCase() || ""
  return `${first}${last}` || "?"
}

export function calculateAge(birthDate: string, deathDate?: string): number {
  const birth = new Date(birthDate)
  const death = deathDate ? new Date(deathDate) : new Date()
  const ageInMs = death.getTime() - birth.getTime()
  return Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365.25))
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "")

  // Format as (XXX) XXX-XXXX for US numbers
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  // Return original if not a standard US number
  return phone
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function getRelativeTime(date: string | Date): string {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
  return `${Math.floor(diffInSeconds / 31536000)} years ago`
}
