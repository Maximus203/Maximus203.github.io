'use client'

import { useTheme } from '@/components/theme-provider'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import portfolioData from '@/data/portfolioData.json'
import { motion } from 'framer-motion'
import { Calendar, GraduationCap } from 'lucide-react'

export default function EducationSection() {
 const { theme } = useTheme()

 // Filter education based on current theme
 const filteredEducation = portfolioData.education.filter(edu =>
  edu.profiles.includes(theme)
 )

 return (
  <section id="etudes" className="section-padding">
   <div className="section-container">
    <motion.div
     initial={{ opacity: 0, y: 50 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     viewport={{ once: true }}
     className="text-center mb-16"
    >
     <h2 className="heading-2 mb-4">Formation</h2>
     <p className="body-large max-w-2xl mx-auto">
      Mon parcours académique et formations spécialisées
     </p>
    </motion.div>

    <div className="max-w-4xl mx-auto">
     {filteredEducation.map((education, index) => (
      <motion.div
       key={education.id}
       initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
       whileInView={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.6, delay: index * 0.1 }}
       viewport={{ once: true }}
       className="relative"
      >
       {/* Timeline line */}
       {index < filteredEducation.length - 1 && (
        <div className="absolute left-8 top-20 w-0.5 h-24 bg-border" />
       )}

       <Card className="mb-8 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
         <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
           <GraduationCap className="w-6 h-6" />
          </div>

          <div className="flex-1">
           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="text-xl font-semibold text-foreground">
             {education.degree}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
             <Calendar className="w-4 h-4 mr-1" />
             {education.period}
            </div>
           </div>

           <p className="text-primary font-medium mb-2">
            {education.institution}
           </p>

           <p className="text-muted-foreground mb-4">
            {education.description}
           </p>

           <div className="flex items-center gap-2">
            <Badge
             variant={education.status === 'obtenu' ? 'default' : 'secondary'}
            >
             {education.status === 'obtenu' ? 'Diplôme obtenu' : 'En cours'}
            </Badge>

            {education.profiles.map(profile => (
             <Badge
              key={profile}
              variant="outline"
              className={profile === theme ? 'bg-primary/10 text-primary border-primary' : ''}
             >
              {profile}
             </Badge>
            ))}
           </div>
          </div>
         </div>
        </CardContent>
       </Card>
      </motion.div>
     ))}
    </div>
   </div>
  </section>
 )
}