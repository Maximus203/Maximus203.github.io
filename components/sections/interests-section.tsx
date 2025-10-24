'use client'

import { Card, CardContent } from '@/components/ui/card'
import portfolioData from '@/data/portfolioData.json'
import { motion } from 'framer-motion'
import { Camera, Code, Heart, Lightbulb, Plane, Utensils } from 'lucide-react'

const interestIcons = {
 'Développement Web': Code,
 'Intelligence Artificielle': Lightbulb,
 'Photographie': Camera,
 'Cuisine': Utensils,
 'Voyage': Plane,
 'Technologie': Code
}

export default function InterestsSection() {
 return (
  <section id="centres-interet" className="section-padding bg-muted/20">
   <div className="section-container">
    <motion.div
     initial={{ opacity: 0, y: 50 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     viewport={{ once: true }}
     className="text-center mb-16"
    >
     <h2 className="heading-2 mb-4">Centres d'Intérêt</h2>
     <p className="body-large max-w-2xl mx-auto">
      Mes passions et activités qui nourrissent ma créativité et mon équilibre personnel
     </p>
    </motion.div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
     {portfolioData.interests.map((interest, index) => {
      const IconComponent = interestIcons[interest.name as keyof typeof interestIcons] || Heart

      return (
       <motion.div
        key={interest.name}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
       >
        <Card className="group hover:shadow-lg transition-all duration-300 h-full">
         <CardContent className="p-6 text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform">
           <IconComponent className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
           {interest.name}
          </h3>
          <p className="text-muted-foreground text-sm">
           {interest.description}
          </p>
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