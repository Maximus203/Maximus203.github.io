import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs))
}

export function scrollToSection(sectionId: string) {
 const element = document.getElementById(sectionId)
 if (element) {
  const offset = 80 // Navigation height
  const elementPosition = element.offsetTop - offset
  window.scrollTo({
   top: elementPosition,
   behavior: 'smooth'
  })
 }
}