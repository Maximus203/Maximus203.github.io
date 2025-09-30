import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Building, Building2, Presentation, Settings, Users } from "lucide-react";

const experiences = [
  {
    title: "Responsable Informatique",
    company: "FIDECA",
    period: "2025 - Présent",
    description: "Pilotage de la transformation digitale et gestion des systèmes d'information",
    skills: ["Transformation digitale", "Développement d'applications", "Administration", "Réseaux", "Sécurité"],
    icon: Building,
    type: "1 année"
  },
  {
    title: "Stage informatique",
    company: "FIDECA",
    period: "2024-2025",
    description: "Chargé de la mise en place d'un plan de transformation digitale pour le cabinet d'expertise comptable",
    skills: ["Transformation digitale", "Administration", "Réseaux", "Sécurité"],
    icon: Building,
    type: "6 mois"
  },
  {
    title: "Assistant Responsable Système d'Information",
    company: "ESTM",
    period: "2024-2025",
    description: "Gestion et administration des systèmes d'information de l'établissement",
    skills: ["Administration", "Réseaux", "Sécurité"],
    icon: Users,
    type: "1 année"
  },
  {
    title: "Assistant Support Performance & Projet",
    company: "Orange - Sonatel",
    period: "2022-2024",
    description: "DRPS/DI/STI/SPP - Gestion des performances système et support projets informatiques",
    skills: ["Gestion de projet", "Performance", "Support IT"],
    icon: Building2,
    type: "2 années"
  },
  {
    title: "Formateur Développement Web",
    company: "ESTM",
    period: "2024",
    description: "Formation en développement web statique HTML et CSS (30 heures)",
    skills: ["HTML", "CSS", "Formation"],
    icon: Presentation,
    type: "30 heures"
  },
  {
    title: "Intégrateur de services",
    company: "Integratop IT",
    period: "2022",
    description: "Intégration et configuration de solutions informatiques",
    skills: ["Intégration", "Services IT"],
    icon: Settings,
    type: "1 mois"
  }
];

export default function ExperienceSection() {
  return (
    <section id="experiences" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Expériences</h2>
          <p className="text-xl text-muted-foreground">Mon parcours professionnel</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-2xl transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                        <experience.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary">
                          {experience.company}
                        </h3>
                        <p className="text-muted-foreground">{experience.title}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{experience.period}</Badge>
                  </div>

                  <p className="text-foreground mb-4">{experience.description}</p>

                  <div className="text-sm text-muted-foreground mb-4">
                    Durée: {experience.type}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
