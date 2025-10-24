'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import portfolioData from '@/data/portfolioData.json'
import { motion } from 'framer-motion'

export default function LanguagesSection() {
 return (
  <section id="langues" className="section-padding bg-muted/20">
   <div className="section-container">
    <motion.div
     initial={{ opacity: 0, y: 50 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     viewport={{ once: true }}
     className="text-center mb-16"
    >
     <h2 className="heading-2 mb-4">Langues</h2>
     <p className="body-large max-w-2xl mx-auto">
      Langues parlées pour une communication internationale efficace
     </p>
    </motion.div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
     {portfolioData.languages.map((language, index) => (
      <motion.div
       key={language.name}
       initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, delay: index * 0.1 }}
       viewport={{ once: true }}
      >
       <Card className="group hover:shadow-lg transition-all duration-300 h-full">
        <CardContent className="p-6 text-center">
         <div className="text-4xl mb-4">
          {language.flag}
         </div>
         <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {language.name}
         </h3>
         <Badge
          variant={language.level === 'Natif' ? 'default' : 'secondary'}
          className="text-sm"
         >
          {language.level}
         </Badge>
        </CardContent>
       </Card>
      </motion.div>
     ))}
    </div>
   </div>
  </section>
 )
}