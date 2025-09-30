import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    link: "#",
    title: "SAP Commercial",
    description: "Application de gestion commerciale pour la SAP (Société Africaine de Pétrole), incluant la gestion des stations, produits et commandes",
    image: "assets/projets/sap-demo.gif",
    technologies: ["React", "Laravel", "PostgreSQL", "Sanctum", "Tailwind CSS", "Spatie"],
    year: "2025"
  },
  {
    link: "https://github.com/Maximus203/my-event-app",
    title: "My Event",
    description: "Application de gestion d'événements avec fonctionnalités de planification et de notifications",
    image: "assets/projets/my-event-demo.gif",
    technologies: ["React", "Node.js", "Express JS", "SQLite", "Tailwind CSS", "Lucide", "Framer Motion"],
    year: "2025"
  },
  {
    link: "https://github.com/Maximus203/image-converter",
    title: "Image - converter",
    description: "Outil de conversion d'images en ligne. Il vous permet de convertir facilement des images aux formats PNG, JPG et JPEG en WebP via une interface web conviviale.",
    image: "assets/projets/image-converter.gif",
    technologies: ["Python", "Dockerfile", "HTML", "CSS"],
    year: "2024"
  },
  {
    link: "https://github.com/Maximus203/Mbaye-laravel-chatbot-app",
    title: "Mbaye - Chatbot",
    description: "Mbaye est là pour aider les utilisateurs en fournissant des réponses instantanées de manière fluide, personnalisée et interactive.",
    image: "assets/projets/mbaye-chatbot-demo.gif",
    technologies: ["Laravel", "Livewire", "Blade", "JavaScript"],
    year: "2024"
  },
  {
    link: "https://github.com/Maximus203/task-manager-estm-l2-glar",
    title: "Système de gestion de tâche",
    description: "Application web de gestion de tâches permettant aux utilisateurs de créer, lister, et supprimer des tâches",
    image: "assets/projets/task-manager-php.gif",
    technologies: ["PHP", "Bootstrap"],
    year: "2025"
  },
  {
    link: "#",
    title: "Archive-ESTM",
    description: "Plateforme d'archivage et de diffusion des mémoires utilisant la technologie Blockchain",
    image: "assets/projets/Archive-ESTM-liste-memoire.webp",
    technologies: ["Blockchain", "React", "Spring Boot"],
    year: "2023"
  },
  {
    link: "#",
    title: "TaskFlow",
    description: "Système de gestion de tâches avec fonctionnalités avancées de priorisation et deadlines",
    image: "assets/projets/TaskFlow.webp",
    technologies: ["Angular", "Laravel", "MySQL"],
    year: "2024"
  },
  {
    link: "#",
    title: "Joko - Messagerie",
    description: "Système de messagerie instantanée moderne avec fonctionnalités temps réel",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Node.js", "Socket.IO"],
    year: "2023"
  },
];

export default function ProjectsSection() {
  return (
    <section id="projets" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Mes projets</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez mes réalisations en développement web et applications métier
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
                    {project.year}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.link !== "#" &&(<a href={project.link} className="text-primary hover:text-primary/80 font-medium inline-flex items-center group">
                    Voir le projet
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </a>)}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
