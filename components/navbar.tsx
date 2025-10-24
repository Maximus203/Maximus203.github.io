'use client'

import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { scrollToSection } from '@/lib/utils'
import { ChevronDown, Github, Linkedin, Menu, Monitor, Moon, Palette, Sun, Terminal, X, Youtube } from 'lucide-react'
import { useEffect, useState } from 'react'

const navItems = [
 { id: 'presentation', label: 'Présentation' },
 { id: 'projets', label: 'Projets' },
 {
  id: 'parcours', label: 'Parcours', dropdown: [
   { id: 'etudes', label: 'Études' },
   { id: 'experiences', label: 'Expériences' },
   { id: 'certifications', label: 'Certifications' }
  ]
 },
 {
  id: 'competences', label: 'Compétences', dropdown: [
   { id: 'competences', label: 'Techniques' },
   { id: 'soft-skills', label: 'Soft Skills' },
   { id: 'langues', label: 'Langues' }
  ]
 },
]

const socialLinks = [
 {
  name: 'GitHub',
  url: 'https://github.com/Maximus203/',
  icon: Github
 },
 {
  name: 'LinkedIn',
  url: 'https://www.linkedin.com/in/cherif-diouf-59747b17b/',
  icon: Linkedin
 },
 {
  name: 'YouTube',
  url: 'https://www.youtube.com/@printf_cherif',
  icon: Youtube
 }
]

const themeOptions = [
 {
  value: 'fullstack' as const,
  label: 'Full-Stack',
  icon: Monitor,
  description: 'Vue équilibrée et professionnelle'
 },
 {
  value: 'frontend' as const,
  label: 'Frontend',
  icon: Palette,
  description: 'Vue créative et moderne'
 },
 {
  value: 'backend' as const,
  label: 'Backend',
  icon: Terminal,
  description: 'Vue minimaliste et technique'
 }
]

export default function Navbar() {
 const [isOpen, setIsOpen] = useState(false)
 const [isScrolled, setIsScrolled] = useState(false)
 const { theme, setTheme, isDark, toggleDark } = useTheme()

 useEffect(() => {
  const handleScroll = () => {
   setIsScrolled(window.scrollY > 50)
  }

  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
 }, [])

 const handleNavClick = (id: string) => {
  scrollToSection(id)
  setIsOpen(false)
 }

 const currentTheme = themeOptions.find(option => option.value === theme)

 return (
  <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
   }`}>
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
     {/* Logo/Brand */}
     <div className="flex-shrink-0">
      <button
       onClick={() => handleNavClick('presentation')}
       className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
      >
       Cherif Diouf
      </button>
     </div>

     {/* Desktop Navigation */}
     <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
       item.dropdown ? (
        <DropdownMenu key={item.id}>
         <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-foreground hover:text-primary">
           {item.label}
           <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="start">
          {item.dropdown.map((subItem) => (
           <DropdownMenuItem
            key={subItem.id}
            onClick={() => handleNavClick(subItem.id)}
            className="cursor-pointer"
           >
            {subItem.label}
           </DropdownMenuItem>
          ))}
         </DropdownMenuContent>
        </DropdownMenu>
       ) : (
        <button
         key={item.id}
         onClick={() => handleNavClick(item.id)}
         className="text-foreground hover:text-primary transition-colors"
        >
         {item.label}
        </button>
       )
      ))}
     </div>

     {/* Theme Selector & Controls */}
     <div className="hidden md:flex items-center space-x-4">
      {/* Theme Selector */}
      <DropdownMenu>
       <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
         {currentTheme && <currentTheme.icon className="w-4 h-4 mr-2" />}
         {currentTheme?.label}
        </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent align="end" className="w-56">
        {themeOptions.map((option) => (
         <DropdownMenuItem
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={`cursor-pointer ${theme === option.value ? 'bg-accent' : ''}`}
         >
          <option.icon className="w-4 h-4 mr-2" />
          <div className="flex flex-col">
           <span className="font-medium">{option.label}</span>
           <span className="text-xs text-muted-foreground">{option.description}</span>
          </div>
         </DropdownMenuItem>
        ))}
       </DropdownMenuContent>
      </DropdownMenu>

      {/* Dark Mode Toggle */}
      <Button variant="ghost" size="sm" onClick={toggleDark}>
       {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>

      {/* Social Links */}
      <div className="flex space-x-2">
       {socialLinks.map((link) => (
        <Button
         key={link.name}
         variant="ghost"
         size="sm"
         asChild
        >
         <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
         >
          <link.icon className="w-4 h-4" />
         </a>
        </Button>
       ))}
      </div>
     </div>

     {/* Mobile menu button */}
     <div className="md:hidden">
      <Button
       variant="ghost"
       size="sm"
       onClick={() => setIsOpen(!isOpen)}
       aria-label="Toggle menu"
      >
       {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
     </div>
    </div>

    {/* Mobile Navigation */}
    {isOpen && (
     <div className="md:hidden bg-background border-t border-border">
      <div className="px-2 pt-2 pb-3 space-y-1">
       {navItems.map((item) => (
        item.dropdown ? (
         <div key={item.id} className="space-y-1">
          <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
           {item.label}
          </div>
          {item.dropdown.map((subItem) => (
           <button
            key={subItem.id}
            onClick={() => handleNavClick(subItem.id)}
            className="block w-full text-left px-6 py-2 text-sm text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
           >
            {subItem.label}
           </button>
          ))}
         </div>
        ) : (
         <button
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          className="block w-full text-left px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
         >
          {item.label}
         </button>
        )
       ))}

       {/* Mobile Theme Selector */}
       <div className="border-t border-border pt-3 mt-3">
        <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
         Thème
        </div>
        {themeOptions.map((option) => (
         <button
          key={option.value}
          onClick={() => setTheme(option.value)}
          className={`flex items-center w-full px-6 py-2 text-sm rounded-md transition-colors ${theme === option.value
            ? 'bg-accent text-accent-foreground'
            : 'text-foreground hover:text-primary hover:bg-accent'
           }`}
         >
          <option.icon className="w-4 h-4 mr-2" />
          {option.label}
         </button>
        ))}

        {/* Mobile Dark Mode Toggle */}
        <button
         onClick={toggleDark}
         className="flex items-center w-full px-6 py-2 text-sm text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
        >
         {isDark ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
         {isDark ? 'Mode clair' : 'Mode sombre'}
        </button>
       </div>

       {/* Mobile Social Links */}
       <div className="border-t border-border pt-3 mt-3">
        <div className="flex justify-center space-x-4">
         {socialLinks.map((link) => (
          <a
           key={link.name}
           href={link.url}
           target="_blank"
           rel="noopener noreferrer"
           className="p-2 text-muted-foreground hover:text-primary transition-colors"
           aria-label={link.name}
          >
           <link.icon className="w-5 h-5" />
          </a>
         ))}
        </div>
       </div>
      </div>
     </div>
    )}
   </div>
  </nav>
 )
}