import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const education = [
  {
    title: "Master Génie Logiciel et Administration Réseaux",
    institution: "École Supérieure de Technologie et de Management (ESTM)",
    period: "2022-2024",
    mention: "Mention: Très bien avec les félicitations du jury",
    icon: GraduationCap
  },
  {
    title: "Licence Réseaux Télécoms",
    institution: "École Supérieure de Technologie et de Management (ESTM)",
    period: "2017-2021",
    mention: "Mention: Très bien",
    icon: Award
  },
  {
    title: "Baccalauréat",
    institution: "Lycée Seydina Limamoulaye",
    period: "2016-2017",
    mention: "",
    icon: BookOpen
  }
];

export default function EducationSection() {
  return (
    <section id="etudes" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Formation</h2>
          <p className="text-xl text-muted-foreground">Mon parcours académique</p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary"></div>
            
            {education.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center justify-between mb-8 ${
                  index % 2 === 0 ? "" : "flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                  {index % 2 === 0 ? (
                    <div className="bg-background p-6 rounded-lg shadow-lg">
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-2">{item.institution}</p>
                      {item.mention && (
                        <p className="text-sm text-muted-foreground">{item.mention}</p>
                      )}
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-primary">{item.period}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full border-4 border-background z-10">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <div className={`flex-1 ${index % 2 === 0 ? "pl-8" : "pr-8 text-right"}`}>
                  {index % 2 === 0 ? (
                    <span className="text-2xl font-bold text-primary">{item.period}</span>
                  ) : (
                    <div className="bg-background p-6 rounded-lg shadow-lg">
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-2">{item.institution}</p>
                      {item.mention && (
                        <p className="text-sm text-muted-foreground">{item.mention}</p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
