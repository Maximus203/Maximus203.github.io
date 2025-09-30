import { motion } from "framer-motion";
import { Code, Shield, Network, BookOpen } from "lucide-react";

const interests = [
  {
    title: "Développement",
    description: "Exploration de nouvelles technologies et frameworks",
    icon: Code
  },
  {
    title: "Cybersécurité",
    description: "Veille technologique en sécurité informatique",
    icon: Shield
  },
  {
    title: "Réseaux",
    description: "Administration et optimisation des infrastructures",
    icon: Network
  },
  {
    title: "Formation",
    description: "Transmission de connaissances et mentorat",
    icon: BookOpen
  }
];

export default function InterestsSection() {
  return (
    <section id="centres-interet" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Centres d'intérêt</h2>
          <p className="text-xl text-muted-foreground">Mes passions et loisirs</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300"
              >
                <interest.icon className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{interest.title}</h3>
              <p className="text-muted-foreground">{interest.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
