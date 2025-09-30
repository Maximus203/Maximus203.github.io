import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { ChevronDown, Github, Linkedin, Menu, X, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { id: "presentation", label: "Présentation" },
  { id: "projets", label: "Projets" },
  {
    id: "parcours", label: "Parcours", dropdown: [
      { id: "etudes", label: "Études" },
      { id: "experiences", label: "Expériences" },
      { id: "certifications", label: "Certifications" }
    ]
  },
  {
    id: "competences", label: "Compétences", dropdown: [
      { id: "competences", label: "Techniques" },
      { id: "soft-skills", label: "Soft Skills" },
      { id: "langues", label: "Langues" }
    ]
  },
];

const socialLinks = [
  { icon: Youtube, url: "https://www.youtube.com/@printf_cherif", label: "YouTube" },
  { icon: Github, url: "https://github.com/Maximus203", label: "GitHub" },
  { icon: Linkedin, url: "https://www.linkedin.com/in/cherif-diouf-59747b17b/", label: "LinkedIn" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const allSectionIds = navItems.flatMap(item =>
        item.dropdown ? item.dropdown.map(sub => sub.id) : [item.id]
      );
      const sections = allSectionIds.map(id => document.getElementById(id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(allSectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const renderNavItem = (item: any) => {
    if (item.dropdown) {
      return (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={() => setOpenDropdown(item.id)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button className="hover:text-primary transition-colors duration-300 px-3 py-2 flex items-center">
            {item.label}
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          {openDropdown === item.id && (
            <div className="absolute top-full left-0 bg-card border border-border rounded-lg shadow-lg py-2 min-w-[150px]">
              {item.dropdown.map((subItem: any) => (
                <button
                  key={subItem.id}
                  onClick={() => handleNavClick(subItem.id)}
                  className="block w-full text-left px-4 py-2 hover:bg-muted hover:text-primary transition-colors"
                >
                  {subItem.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => handleNavClick(item.id)}
        className={`hover:text-primary transition-colors duration-300 px-3 py-2 ${activeSection === item.id ? "text-primary" : "text-foreground"
          }`}
      >
        {item.label}
      </button>
    );
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-primary"><img src="assets/logo.webp" alt="Cherif Diouf" className="h-8" /></div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {navItems.map(renderNavItem)}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2 ml-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-primary transition-colors duration-300"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-card shadow-lg border-b border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.id}>
                  {item.dropdown ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2 text-base font-medium text-muted-foreground">
                        {item.label}
                      </div>
                      {item.dropdown.map((subItem: any) => (
                        <button
                          key={subItem.id}
                          onClick={() => handleNavClick(subItem.id)}
                          className="block w-full text-left px-6 py-2 text-sm hover:text-primary transition-colors"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="block w-full text-left px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}

              {/* Mobile Social Links */}
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:text-primary transition-colors duration-300"
                      title={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
