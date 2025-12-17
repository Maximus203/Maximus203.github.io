'use client'

import { useTheme } from '@/components/theme-provider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

export default function ProjectsSection() {
 const { theme } = useTheme()

 // Filter projects based on current theme
 const filteredProjects = portfolioData.projects.filter(project =>
  project.profiles.includes(theme)
 )

 return (
  <section id="projets" className="section-padding">
   <div className="section-container">
    <motion.div
     initial={{ opacity: 0, y: 50 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     viewport={{ once: true }}
     className="text-center mb-16"
    >
     <h2 className="heading-2 mb-4">Mes Projets</h2>
     <p className="body-large max-w-2xl mx-auto">
      Découvrez une sélection de mes réalisations techniques et créatives
     </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
     {filteredProjects.map((project, index) => (
      <motion.div
       key={project.id}
       initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, delay: index * 0.1 }}
       viewport={{ once: true }}
      >
       <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
        <div className="relative overflow-hidden">
         <div className="aspect-video relative">
          <Image
           src={project.image.startsWith('http') ? project.image : `/${project.image}`}
           alt={project.title}
           fill
           className="object-cover group-hover:scale-105 transition-transform duration-300"
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
         </div>
         <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
           {project.year}
          </Badge>
         </div>
        </div>

        <CardContent className="p-6 flex flex-col h-full">
         <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
           {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">
           {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
           {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
             {tech}
            </Badge>
           ))}
           {project.technologies.length > 3 && (
            <Badge variant="outline" className="text-xs">
             +{project.technologies.length - 3}
            </Badge>
           )}
          </div>
         </div>

         <div className="flex gap-2 mt-auto">
          <Dialog>
           <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex-1">
             Détails
             <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
           </DialogTrigger>
           <DialogContent className="max-w-2xl">
            <DialogHeader>
             <DialogTitle>{project.title}</DialogTitle>
             <DialogDescription>
              Projet développé en {project.year}
             </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
             <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
               src={project.image.startsWith('http') ? project.image : `/${project.image}`}
               alt={project.title}
               fill
               className="object-cover"
               sizes="(max-width: 768px) 100vw, 50vw"
              />
             </div>

             <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground">
               {project.description}
              </p>
             </div>

             <div>
              <h4 className="font-semibold mb-2">Technologies utilisées</h4>
              <div className="flex flex-wrap gap-2">
               {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                 {tech}
                </Badge>
               ))}
              </div>
             </div>

             <div>
              <h4 className="font-semibold mb-2">Caractéristiques</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
               <div>
                <span className="text-muted-foreground">Complexité:</span>
                <Badge variant="outline" className="ml-2">
                 {project.complexity}
                </Badge>
               </div>
               <div>
                <span className="text-muted-foreground">Catégorie:</span>
                <Badge variant="outline" className="ml-2">
                 {project.category}
                </Badge>
               </div>
              </div>
             </div>

             <div className="flex gap-2">
              {project.githubLink && (
               <Button asChild>
                <a
                 href={project.githubLink}
                 target="_blank"
                 rel="noopener noreferrer"
                >
                 <Github className="w-4 h-4 mr-2" />
                 Code Source
                </a>
               </Button>
              )}
              {project.liveLink && (
               <Button variant="outline" asChild>
                <a
                 href={project.liveLink}
                 target="_blank"
                 rel="noopener noreferrer"
                >
                 <ExternalLink className="w-4 h-4 mr-2" />
                 Voir en ligne
                </a>
               </Button>
              )}
             </div>
            </div>
           </DialogContent>
          </Dialog>

          {project.githubLink && (
           <Button size="sm" asChild>
            <a
             href={project.githubLink}
             target="_blank"
             rel="noopener noreferrer"
             aria-label={`Voir le code source de ${project.title}`}
            >
             <Github className="w-4 h-4" />
            </a>
           </Button>
          )}
         </div>
        </CardContent>
       </Card>
      </motion.div>
     ))}
    </div>

    {filteredProjects.length === 0 && (
     <div className="text-center py-12">
      <p className="text-muted-foreground">
       Aucun projet disponible pour ce profil.
      </p>
     </div>
    )}
   </div>
  </section>
 )
}