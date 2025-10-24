'use client'

import { useTheme } from '@/components/theme-provider'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import portfolioData from '@/data/portfolioData.json'
import { motion } from 'framer-motion'
import { Building, Calendar, MapPin } from 'lucide-react'

export default function ExperienceSection() {
 const { theme } = useTheme()

 // Filter experience based on current theme
 const filteredExperience = portfolioData.experience.filter(exp =>
  exp.profiles.includes(theme)
 )

 return (
  <section id="experiences" className="section-padding bg-muted/20">
   <div className="section-container">
    <motion.div
     initial={{ opacity: 0, y: 50 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     viewport={{ once: true }}
     className="text-center mb-16"
    >
     <h2 className="heading-2 mb-4">Expérience Professionnelle</h2>
     <p className="body-large max-w-2xl mx-auto">
      Mon parcours professionnel et les missions que j'ai eu l'opportunité de réaliser
     </p>
    </motion.div>

    <div className="max-w-4xl mx-auto">
     {filteredExperience.map((experience, index) => (
      <motion.div
       key={experience.id}
       initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
       whileInView={{ opacity: 1, x: 0 }}
       transition={{ duration: 0.6, delay: index * 0.1 }}
       viewport={{ once: true }}
       className="relative"
      >
       {/* Timeline line */}
       {index < filteredExperience.length - 1 && (
        <div className="absolute left-8 top-20 w-0.5 h-24 bg-border" />
       )}

       <Card className="mb-8 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
         <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-primary/10 text-primary shrink-0">
           <Building className="w-6 h-6" />
          </div>

          <div className="flex-1">
           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="text-xl font-semibold text-foreground">
             {experience.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
             <Calendar className="w-4 h-4 mr-1" />
             {experience.period}
            </div>
           </div>

           <div className="flex items-center gap-2 mb-2">
            <p className="text-primary font-medium">
             {experience.company}
            </p>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center text-muted-foreground text-sm">
             <MapPin className="w-3 h-3 mr-1" />
             {experience.location}
            </div>
           </div>

           <p className="text-muted-foreground mb-4">
            {experience.description}
           </p>

           <div className="flex flex-wrap gap-2 mb-4">
            {experience.skills.map((skill) => (
             <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
             </Badge>
            ))}
           </div>

           <div className="flex items-center gap-2">
            <Badge variant="outline">
             {experience.duration}
            </Badge>

            <Badge variant={experience.type === 'job' ? 'default' : 'secondary'}>
             {experience.type === 'job' ? 'Emploi' : 'Formation'}
            </Badge>

            {experience.profiles.map(profile => (
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