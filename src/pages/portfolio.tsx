import CertificationsSection from "@/components/CertificationsSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import InterestsSection from "@/components/InterestsSection";
import LanguagesSection from "@/components/LanguagesSection";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import SoftSkillsSection from "@/components/SoftSkillsSection";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <EducationSection />
      <ExperienceSection />
      <CertificationsSection />
      <SkillsSection />
      <InterestsSection />
      <SoftSkillsSection />
      <LanguagesSection />

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              &copy; 2024 Cherif Diouf. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
