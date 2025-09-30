import { motion } from "framer-motion";
import { Users, Lightbulb, Target, Clock, Presentation, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const softSkills = [
  {
    title: "Travail d'équipe",
    description: "Collaboration efficace et communication dans des environnements multidisciplinaires",
    icon: Users
  },
  {
    title: "Résolution de problèmes",
    description: "Approche analytique et créative pour résoudre les défis techniques complexes",
    icon: Lightbulb
  },
  {
    title: "Adaptabilité",
    description: "Capacité à s'adapter rapidement aux nouvelles technologies et méthodologies",
    icon: Target
  },
  {
    title: "Gestion du temps",
    description: "Organisation efficace et respect des délais dans la livraison de projets",
    icon: Clock
  },
  {
    title: "Communication",
    description: "Transmission claire d'idées techniques à des audiences variées",
    icon: Presentation
  },
  {
    title: "Apprentissage continu",
    description: "Passion pour l'acquisition de nouvelles compétences et l'évolution technologique",
    icon: TrendingUp
  }
];

export default function SoftSkillsSection() {
  return (
    <section id="soft-skills" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Soft Skills</h2>
          <p className="text-xl text-muted-foreground">
            Mes compétences humaines et relationnelles
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {softSkills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <skill.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                  <p className="text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
