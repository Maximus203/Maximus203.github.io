import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const languages = [
  {
    name: "Français",
    level: "Professionnel",
    proficiency: 5,
    code: "FR"
  },
  {
    name: "Anglais",
    level: "Professionnel",
    proficiency: 4,
    code: "EN"
  }
];

export default function LanguagesSection() {
  return (
    <section id="langues" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Langues</h2>
          <p className="text-xl text-muted-foreground">Mes compétences linguistiques</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {languages.map((language, index) => (
            <motion.div
              key={language.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {language.code}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{language.name}</h3>
                  <p className="text-muted-foreground mb-4">{language.level}</p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${i < language.proficiency
                            ? "bg-primary"
                            : "bg-muted"
                          }`}
                      />
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
