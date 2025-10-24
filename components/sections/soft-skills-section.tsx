'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import portfolioData from '@/data/portfolioData.json'
import { motion } from 'framer-motion'
import {
 Clock,
 Heart,
 Lightbulb,
 MessageSquare,
 RefreshCw,
 Users
} from 'lucide-react'

const skillIcons = {
 'Leadership': Users,
 'Communication': MessageSquare,
 'Résolution de problèmes': Lightbulb,
 'Travail d\'équipe': Heart,
 'Adaptabilité': RefreshCw,
 'Gestion du temps': Clock
}

export default function SoftSkillsSection() {
 return (
  <section id="soft-skills" className="section-padding">
   <div className="section-container">
    <motion.div
     initial={{ opacity: 0, y: 50 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     viewport={{ once: true }}
     className="text-center mb-16"
    >
     <h2 className="heading-2 mb-4">Soft Skills</h2>
     <p className="body-large max-w-2xl mx-auto">
      Compétences humaines et relationnelles qui enrichissent mon approche professionnelle
     </p>
    </motion.div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
     {portfolioData.softSkills.map((skill, index) => {
      const IconComponent = skillIcons[skill.name as keyof typeof skillIcons] || Users

      return (
       <motion.div
        key={skill.name}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
       >
        <Card className="group hover:shadow-lg transition-all duration-300 h-full">
         <CardContent className="p-6">
          <div className="flex items-center mb-4">
           <div className="p-2 rounded-lg bg-primary/10 text-primary mr-3 group-hover:scale-110 transition-transform">
            <IconComponent className="w-5 h-5" />
           </div>
           <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {skill.name}
           </h3>
          </div>

          <p className="text-muted-foreground text-sm mb-4">
           {skill.description}
          </p>

          <div className="space-y-2">
           <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Niveau</span>
            <span className="text-sm text-primary font-semibold">
             {skill.level}%
            </span>
           </div>
           <Progress value={skill.level} className="h-2" />
          </div>
         </CardContent>
        </Card>
       </motion.div>
      )
     })}
    </div>
   </div>
  </section>
 )
}