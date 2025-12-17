'use client'

import { Button } from '@/components/ui/button'
import portfolioData from '@/data/portfolioData.json'
import { scrollToSection } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Code, Globe, MessageCircle, Smartphone } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function HeroSection() {
 const [currentTitle, setCurrentTitle] = useState(0)
 const [isDeleting, setIsDeleting] = useState(false)
 const [displayText, setDisplayText] = useState('')

 const titles = portfolioData.profile.titles

 useEffect(() => {
  const currentFullTitle = titles[currentTitle]
  const shouldDelete = displayText === currentFullTitle && !isDeleting

  if (shouldDelete) {
   setTimeout(() => setIsDeleting(true), 2000)
   return
  }

  const shouldMoveNext = displayText === '' && isDeleting
  if (shouldMoveNext) {
   setIsDeleting(false)
   setCurrentTitle((prev) => (prev + 1) % titles.length)
   return
  }

  const timeout = setTimeout(() => {
   setDisplayText(prev => {
    if (isDeleting) {
     return currentFullTitle.substring(0, prev.length - 1)
    }
    return currentFullTitle.substring(0, prev.length + 1)
   })
  }, isDeleting ? 50 : 100)

  return () => clearTimeout(timeout)
 }, [currentTitle, isDeleting, displayText, titles])

 return (
  <section id="presentation" className="min-h-screen flex items-center justify-center relative overflow-hidden">
   {/* Background Effects */}
   <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

   <div className="section-container section-padding relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
     {/* Content */}
     <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
     >
      <div className="space-y-4">
       <motion.h1
        className="heading-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
       >
        Salut, je suis{' '}
        <span className="text-primary font-bold">
         {portfolioData.profile.name}
        </span>
       </motion.h1>

       <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
       >
        <span className="text-2xl sm:text-3xl text-muted-foreground">
         Je suis{' '}
        </span>
        <span className="text-2xl sm:text-3xl font-semibold text-primary min-w-[200px]">
         {displayText}
         <span className="animate-pulse">|</span>
        </span>
       </motion.div>
      </div>

      <motion.p
       className="body-large max-w-2xl"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, delay: 0.6 }}
      >
       {portfolioData.profile.bio}
      </motion.p>

      {/* Tech Icons */}
      <motion.div
       className="flex space-x-6"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, delay: 0.8 }}
      >
       {[
        { icon: Code, label: 'Développement' },
        { icon: Globe, label: 'Web' },
        { icon: Smartphone, label: 'Mobile' },
        { icon: MessageCircle, label: 'Communication' }
       ].map((item, index) => (
        <motion.div
         key={item.label}
         className="flex flex-col items-center space-y-2 tech-icon"
         whileHover={{ scale: 1.1 }}
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
        >
         <div className="p-3 rounded-full bg-primary/10 text-primary">
          <item.icon className="w-6 h-6" />
         </div>
         <span className="text-xs text-muted-foreground">
          {item.label}
         </span>
        </motion.div>
       ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
       className="flex flex-col sm:flex-row gap-4"
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, delay: 1.2 }}
      >
       <Button
        onClick={() => scrollToSection('projets')}
        size="lg"
        className="interactive-scale"
       >
        Voir mes projets
       </Button>
       <Button
        variant="outline"
        onClick={() => scrollToSection('competences')}
        size="lg"
        className="interactive-scale"
       >
        Mes compétences
       </Button>
      </motion.div>
     </motion.div>

     {/* Profile Image */}
     <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex justify-center lg:justify-end"
     >
      <motion.div
       className="relative"
       animate={{ y: [0, -10, 0] }}
       transition={{ duration: 3, repeat: Infinity }}
      >
       <div className="relative w-80 h-80 lg:w-96 lg:h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl" />
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
         <Image
          src={portfolioData.profile.image.startsWith('http') ? portfolioData.profile.image : `/${portfolioData.profile.image}`}
          alt={`${portfolioData.profile.name} - ${portfolioData.profile.title}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 320px, 384px"
         />
        </div>
       </div>
      </motion.div>
     </motion.div>
    </div>
   </div>

   {/* Scroll Indicator */}
   <motion.div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
   >
    <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
     <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse" />
    </div>
   </motion.div>
  </section>
 )
}