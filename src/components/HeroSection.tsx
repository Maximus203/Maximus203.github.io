import { Button } from "@/components/ui/button";
import LazyImage from "@/components/ui/lazy-image";
import { scrollToSection } from "@/lib/utils";
import { motion } from "framer-motion";
import { Code, Globe, MessageCircle, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  const titles = [
    "Frontend",
    "Backend",
    "Full Stack",
    "Sys Admin",
    "Prompt Engineer",
    "Couteau suisse digital",
    "Générateur de contenu",
    "x10 Développeur",
    "Artist",
    "Formateur",
    "Code Ninja",
    "Bug Hunter",
    "Digital Wizard",
    "Tech Magician",

    // Cuisine
    "Digital Sous-Chef",
    "Byte Baker",
    "Syntax Saucier",
    "Code Chef",
    "Algorithm Aromatist",

    // Photographie
    "Shutter Sage",
    "Pixel Pépiniériste",
    "Urban Arborist Lensman",
    "Landscape Luminary",
    "Forest Frame Artist",

    // Idées & Créativité
    "Thoughtsmith",
    "Innovation Instigator",
    "Brainstorm Bard",
    "Idea Incubator",
    "Concept Conjuror",

    // Hybrides & Fun
    "Culinary Coder",
    "Snapshot Sorcerer",
    "Recipe & Render Wrangler",
    "Visionary Vegécoder",
    "Creative Cook-ographer"
  ];

  useEffect(() => {
    const currentWord = titles[currentTitle];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        // Pause avant de commencer à effacer
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        // Passer au titre suivant
        setIsDeleting(false);
        setCurrentTitle((prev) => (prev + 1) % titles.length);
      } else if (!isDeleting) {
        // Ajouter une lettre
        setDisplayText(currentWord.substring(0, displayText.length + 1));
      } else {
        // Supprimer une lettre
        setDisplayText(currentWord.substring(0, displayText.length - 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitle, titles]);

  const handleIconClick = (iconName: string) => {
    // Animation différente pour chaque icône
    console.log(`${iconName} clicked!`);
  };

  return (
    <section id="presentation" className="gradient-bg min-h-screen flex items-center pt-16">
      <div className="section-container section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="mb-4">
              <a href="documents/CV.pdf" download={"Cherif-Diouf-CV"} className="text-primary text-sm font-medium tracking-wide uppercase">
                Curriculum Vitae →
              </a>
            </div>
            <h1 className="heading-1 mb-6">
              <span className="text-primary">Cherif Diouf</span>,
              <span className="block heading-2 mt-2 text-muted-foreground min-h-[1.2em] font-code">
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="body-large mb-8 max-w-2xl">
              Spécialiste en développement web et administration réseau,
              passionné par la technologie et l'innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("projets")}
                className="interactive-scale focus-visible-ring"
              >
                Mes projets
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open("https://wa.me/221773162727", "_blank")}
                className="interactive-scale focus-visible-ring flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Me contacter
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <LazyImage
              src="assets/photo.webp"
              alt="Cherif Diouf - Développeur Full Stack spécialisé en développement web et administration réseau"
              className="rounded-3xl shadow-2xl w-full max-w-md mx-auto animate-float"
            />

            {/* Floating tech icons - simplified */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-4 -left-4 bg-card p-3 rounded-lg shadow-lg"
            >
              <Code className="w-6 h-6 text-primary" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -right-4 bg-card p-3 rounded-lg shadow-lg"
            >
              <Globe className="w-6 h-6 text-primary" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute top-1/2 -right-8 bg-card p-3 rounded-lg shadow-lg"
            >
              <Smartphone className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
