'use client'

import { useTheme } from '@/components/theme-provider'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import portfolioData from '@/data/portfolioData.json'
import { motion } from 'framer-motion'
import { Code, Database, Layers, Wrench } from 'lucide-react'

const categoryIcons = {
 frontend: Code,
 backend: Database,
 database: Database,
 tools: Wrench,
 other: Layers
}

export default function SkillsSection() {
 const { theme } = useTheme()

 const getSkillsForTheme = () => {
  switch (theme) {
   case 'frontend':
    return {
     'Technologies Frontend': portfolioData.skills.frontend,
     'Outils & Design': portfolioData.skills.tools.filter(skill =>
      ['Figma', 'Adobe Illustrator', 'VS Code'].includes(skill.name)
     )
    }
   case 'backend':
    return {
     'Technologies Backend': portfolioData.skills.backend,
     'Bases de données': portfolioData.skills.database,
     'Outils & DevOps': portfolioData.skills.tools.filter(skill =>
      ['Git', 'Docker', 'VS Code', 'Postman'].includes(skill.name)
     ),
     'Système & Réseau': portfolioData.skills.other
    }
   default:
    return {
     'Frontend': portfolioData.skills.frontend.slice(0, 6),
     'Backend': portfolioData.skills.backend.slice(0, 6),
     'Bases de données': portfolioData.skills.database,
     'Outils': portfolioData.skills.tools.slice(0, 6)
    }
  }
 }

 const skillCategories = getSkillsForTheme()

 return (
  <section id="competences" className="section-padding">
   <div className="section-container">
    <motion.div
     initial={{ opacity: 0, y: 50 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     viewport={{ once: true }}
     className="text-center mb-16"
    >
     <h2 className="heading-2 mb-4">Compétences Techniques</h2>
     <p className="body-large max-w-2xl mx-auto">
      Technologies et outils que je maîtrise pour créer des solutions complètes
     </p>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-8">
     {Object.entries(skillCategories).map(([category, skills], categoryIndex) => {
      const IconComponent = categoryIcons[category.toLowerCase() as keyof typeof categoryIcons] || Code

      return (
       <motion.div
        key={category}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
        viewport={{ once: true }}
       >
        <Card className="h-full">
         <CardContent className="p-6">
          <div className="flex items-center mb-6">
           <div className="p-2 rounded-lg bg-primary/10 text-primary mr-3">
            <IconComponent className="w-5 h-5" />
           </div>
           <h3 className="text-xl font-semibold">{category}</h3>
          </div>

          <div className="space-y-4">
           {skills.map((skill: any, index: number) => (
            <motion.div
             key={skill.name}
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.4, delay: index * 0.05 }}
             viewport={{ once: true }}
             className="space-y-2"
            >
             <div className="flex justify-between items-center">
              <span className="font-medium text-sm">{skill.name}</span>
              <Badge variant="outline" className="text-xs">
               {skill.level}%
              </Badge>
             </div>
             <Progress value={skill.level} className="h-2" />
            </motion.div>
           ))}
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