'use client'

import { useTheme } from '@/components/theme-provider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from '@/components/ui/dialog'
import portfolioData from '@/data/portfolioData.json'
import { motion } from 'framer-motion'
import { Award, Calendar, ExternalLink } from 'lucide-react'

export default function CertificationsSection() {
 const { theme } = useTheme()

 return (
  <section id="certifications" className="section-padding bg-muted/20">
   <div className="section-container">
    <motion.div
     initial={{ opacity: 0, y: 50 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     viewport={{ once: true }}
     className="text-center mb-16"
    >
     <h2 className="heading-2 mb-4">Certifications</h2>
     <p className="body-large max-w-2xl mx-auto">
      Mes certifications et formations continues pour rester à jour avec les dernières technologies
     </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
     {portfolioData.certifications.map((organizationGroup, index) => {
      // Filter certifications for current theme
      const filteredCertifications = organizationGroup.certifications.filter(cert =>
       !cert.profiles || cert.profiles.includes(theme)
      )

      if (filteredCertifications.length === 0) return null

      return (
       <motion.div
        key={organizationGroup.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
       >
        <Dialog>
         <DialogTrigger asChild>
          <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
           <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary w-fit">
             <Award className="w-8 h-8" />
            </div>
            <CardTitle className="group-hover:text-primary transition-colors">
             {organizationGroup.category}
            </CardTitle>
           </CardHeader>
           <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
             {filteredCertifications.length} certification{filteredCertifications.length > 1 ? 's' : ''}
            </p>
            <Badge variant="outline" className="mb-2">
             Cliquez pour voir les détails
            </Badge>
           </CardContent>
          </Card>
         </DialogTrigger>

         <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
           <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Certifications {organizationGroup.category}
           </DialogTitle>
           <DialogDescription>
            {filteredCertifications.length} certification{filteredCertifications.length > 1 ? 's' : ''} obtenue{filteredCertifications.length > 1 ? 's' : ''}
           </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
           {filteredCertifications.map((cert, certIndex) => (
            <motion.div
             key={`${cert.title}-${certIndex}`}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.3, delay: certIndex * 0.1 }}
             className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
             <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm sm:text-base">
               {cert.title}
              </h4>
              {cert.date && (
               <div className="flex items-center text-muted-foreground text-xs sm:text-sm">
                <Calendar className="w-3 h-3 mr-1" />
                {cert.date}
               </div>
              )}
             </div>

             <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
               {cert.provider}
              </Badge>

              {/* Show relevant profiles */}
              {cert.profiles && (
               <div className="flex gap-1">
                {cert.profiles.map(profile => (
                 <Badge
                  key={profile}
                  variant="outline"
                  className={`text-xs ${profile === theme ? 'bg-primary/10 text-primary border-primary' : ''
                   }`}
                 >
                  {profile}
                 </Badge>
                ))}
               </div>
              )}
             </div>
            </motion.div>
           ))}
          </div>

          <div className="flex justify-end pt-4 border-t">
           <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Voir les certificats
           </Button>
          </div>
         </DialogContent>
        </Dialog>
       </motion.div>
      )
     })}
    </div>

    {/* Summary Stats */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6, delay: 0.3 }}
     viewport={{ once: true }}
     className="mt-12 text-center"
    >
     <div className="inline-flex items-center gap-4 bg-background border rounded-lg p-4">
      <div className="text-center">
       <div className="text-2xl font-bold text-primary">
        {portfolioData.certifications.reduce((total, org) =>
         total + org.certifications.filter(cert =>
          !cert.profiles || cert.profiles.includes(theme)
         ).length, 0
        )}
       </div>
       <div className="text-sm text-muted-foreground">
        Certifications
       </div>
      </div>
      <div className="h-8 w-px bg-border" />
      <div className="text-center">
       <div className="text-2xl font-bold text-primary">
        {portfolioData.certifications.filter(org =>
         org.certifications.some(cert =>
          !cert.profiles || cert.profiles.includes(theme)
         )
        ).length}
       </div>
       <div className="text-sm text-muted-foreground">
        Organismes
       </div>
      </div>
     </div>
    </motion.div>
   </div>
  </section>
 )
}