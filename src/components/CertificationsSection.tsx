import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Calendar } from "lucide-react";

const certifications = [
  {
    category: "Coursera",
    certifications: [
      {
        title: "Exception Handling in Java",
        date: "21/05/2024",
        provider: "Coursera"
      },
      {
        title: "PHP & MySQL",
        date: "01/06/2024",
        provider: "Coursera"
      },
      {
        title: "WordPress",
        date: "01/06/2024",
        provider: "Coursera"
      },
      {
        title: "Create your first custom VPC and its components in AWS",
        date: "27/08/2024",
        provider: "Coursera"
      },
      {
        title: "Introduction to Python",
        date: "15/09/2024",
        provider: "Coursera"
      },
      {
        title: "JavaScript Essentials For Beginners",
        date: "15/09/2024",
        provider: "Coursera"
      }
    ]
  },
  {
    category: "OpenClassrooms",
    certifications: [
      {
        title: "Démarrez votre projet avec Python",
        provider: "OpenClassrooms"
      },
      {
        title: "Comprendre le Web",
        provider: "OpenClassrooms"
      },
      {
        title: "Adoptez une architecture MVC en PHP",
        provider: "OpenClassrooms"
      },
      {
        title: "Créez des visuels avec Illustrator",
        provider: "OpenClassrooms"
      },
      {
        title: "Créez votre site web avec HTML5 et CSS3",
        provider: "OpenClassrooms"
      },
      {
        title: "Apprenez à programmer avec JavaScript",
        provider: "OpenClassrooms"
      },
      {
        title: "Concevez votre site web avec PHP et MySQL",
        provider: "OpenClassrooms"
      },
      {
        title: "Gérez du code avec Git et GitHub",
        provider: "OpenClassrooms"
      }
    ]
  },
  {
    category: "Cisco",
    certifications: [
      {
        title: "CCNA Routing and Switching",
        badge: "CCNA",
        date: "12/04/2022",
        provider: "Cisco"
      },
      {
        title: "IT Essentials",
        date: "12/04/2022",
        provider: "Cisco"
      },
      {
        title: "Introduction to IoT",
        date: "18/09/2022",
        provider: "Cisco"
      }
    ]
  },
  {
    category: "Fortinet",
    certifications: [
      {
        title: "NSE 1 Network Security Associate",
        date: "05/04/2022",
        provider: "Fortinet"
      },
      {
        title: "NSE 2 Network Security Associate",
        date: "12/04/2022",
        provider: "Fortinet"
      },
      {
        title: "NSE 3 Network Security Associate",
        date: "02/05/2022",
        provider: "Fortinet"
      }
    ]
  },
  {
    category: "Huawei",
    certifications: [
      {
        title: "Python Programming Basics",
        date: "14/04/2024",
        provider: "Huawei"
      }
    ]
  },
  {
    category: "Force N",
    certifications: [
      {
        title: "Commerce Digital",
        date: "13/07/2024",
        provider: "Force N"
      },
      {
        title: "Informatique et Internet",
        date: "12/07/2024",
        provider: "Force N"
      },
      {
        title: "Intelligence Artificielle pour tous",
        date: "11/08/2024",
        provider: "Force N"
      },
      {
        title: "Marketing Digital",
        date: "13/07/2024",
        provider: "Force N"
      },
      {
        title: "Traitement de données",
        date: "06/07/2024",
        provider: "Force N"
      }
    ]
  },
  {
    category: "LinkedIn Learning",
    certifications: [
      {
        title: "Mieux coopérer avec l'intelligence émotionnelle",
        date: "21/05/2024",
        provider: "LinkedIn Learning"
      }
    ]
  }
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Certifications</h2>
          <p className="text-xl text-muted-foreground">
            Mes certifications professionnelles et formations continues
          </p>
        </motion.div>

        <div className="space-y-8">
          {certifications.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <Award className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-2xl font-semibold">{category.category}</h3>
                    <Badge variant="outline" className="ml-3">
                      {category.certifications.length} certification{category.certifications.length > 1 ? 's' : ''}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.certifications.map((cert, certIndex) => (
                      <motion.div
                        key={certIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: certIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="bg-background p-4 rounded-lg border border-border hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-semibold text-sm mb-2 line-clamp-2">
                          {cert.title}
                        </h4>

                        {(cert as any).date && (
                          <div className="flex items-center text-xs text-muted-foreground mb-2">
                            <Calendar className="w-3 h-3 mr-1" />
                            {(cert as any).date}
                          </div>
                        )}

                        {(cert as any).code && (
                          <div className="text-xs text-primary font-mono">
                            Code: {(cert as any).code}
                          </div>
                        )}

                        {(cert as any).badge && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {(cert as any).badge}
                          </Badge>
                        )}
                      </motion.div>
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