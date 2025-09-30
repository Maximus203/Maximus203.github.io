import { motion } from "framer-motion";
import { 
  SiReact, 
  SiAngular, 
  SiJavascript, 
  SiTailwindcss,
  SiSpring,
  SiLaravel,
  SiNodedotjs,
  SiDjango,
  SiPhp,
  SiPython,
  SiTypescript,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFirebase
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Spring Boot", icon: SiSpring, color: "#6DB33F" },
      { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Django", icon: SiDjango, color: "#092E20" }
    ]
  },
  {
    title: "Langages",
    skills: [
      { name: "Java", icon: FaJava, color: "#ED8B00" },
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" }
    ]
  },
  {
    title: "Bases de données",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" }
    ]
  }
];

export default function SkillsSection() {
  const getSkillAnimation = (skillName: string) => {
    const animations: { [key: string]: any } = {
      'React': { 
        rotate: [0, 360], 
        scale: [1, 1.3, 1],
        borderRadius: ["10%", "50%", "10%"]
      },
      'Angular': { 
        rotate: [0, -360], 
        scale: [1, 1.2, 1],
        x: [0, 10, -10, 0]
      },
      'JavaScript': { 
        y: [0, -20, 0], 
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1]
      },
      'TailwindCSS': { 
        scale: [1, 1.2, 1], 
        rotate: [0, 45, -45, 0],
        backgroundColor: ["#0f172a", "#3b82f6", "#0f172a"]
      },
      'Spring Boot': { 
        y: [0, -15, 0], 
        scale: [1, 1.3, 1],
        rotate: [0, 720]
      },
      'Laravel': { 
        rotate: [0, 360], 
        scale: [1, 1.2, 1],
        boxShadow: ["0px 0px 0px rgba(255,45,32,0)", "0px 0px 20px rgba(255,45,32,0.5)", "0px 0px 0px rgba(255,45,32,0)"]
      },
      'Node.js': { 
        x: [0, -10, 10, 0], 
        rotate: [0, -180, 180, 0],
        scale: [1, 1.1, 1]
      },
      'Django': { 
        scale: [1, 1.4, 1], 
        rotate: [0, 360],
        y: [0, -10, 0]
      },
      'Java': { 
        rotate: [0, 540], 
        scale: [1, 1.3, 1],
        borderRadius: ["10%", "50%", "25%", "10%"]
      },
      'PHP': { 
        x: [0, 15, -15, 0], 
        scale: [1, 1.2, 1],
        rotate: [0, 180]
      },
      'Python': { 
        y: [0, -20, 20, 0], 
        rotate: [0, 360],
        scale: [1, 1.2, 1]
      },
      'TypeScript': { 
        rotate: [0, 720], 
        scale: [1, 1.3, 1],
        backgroundColor: ["#0f172a", "#3178C6", "#0f172a"]
      },
      'MySQL': { 
        scale: [1, 1.2, 1], 
        rotate: [0, -360],
        boxShadow: ["0px 0px 0px rgba(68,121,161,0)", "0px 0px 15px rgba(68,121,161,0.6)", "0px 0px 0px rgba(68,121,161,0)"]
      },
      'PostgreSQL': { 
        y: [0, -15, 0], 
        rotate: [0, 360],
        scale: [1, 1.3, 1]
      },
      'MongoDB': { 
        rotate: [0, 180, -180, 0], 
        scale: [1, 1.2, 1],
        borderRadius: ["10%", "40%", "10%"]
      },
      'Firebase': { 
        scale: [1, 1.4, 1], 
        rotate: [0, 720],
        boxShadow: ["0px 0px 0px rgba(255,202,40,0)", "0px 0px 25px rgba(255,202,40,0.7)", "0px 0px 0px rgba(255,202,40,0)"]
      }
    };
    
    return animations[skillName] || { 
      scale: [1, 1.2, 1], 
      rotate: [0, 360],
      transition: { duration: 0.8, ease: "easeInOut" }
    };
  };

  return (
    <section id="competences" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Compétences Techniques</h2>
          <p className="text-xl text-muted-foreground">
            Technologies et outils que je maîtrise
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-primary mb-4">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05 
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="tech-icon bg-background p-4 rounded-lg flex items-center space-x-3 hover:shadow-lg transition-all duration-300"
                  >
                    <skill.icon 
                      className="w-8 h-8" 
                      style={{ color: skill.color }}
                    />
                    <span className="font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
