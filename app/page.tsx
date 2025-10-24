import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import CertificationsSection from '@/components/sections/certifications-section'
import EducationSection from '@/components/sections/education-section'
import ExperienceSection from '@/components/sections/experience-section'
import HeroSection from '@/components/sections/hero-section'
import InterestsSection from '@/components/sections/interests-section'
import LanguagesSection from '@/components/sections/languages-section'
import ProjectsSection from '@/components/sections/projects-section'
import SkillsSection from '@/components/sections/skills-section'
import SoftSkillsSection from '@/components/sections/soft-skills-section'

export default function HomePage() {
 return (
  <div className="min-h-screen bg-background text-foreground">
   <Navbar />
   <main>
    <HeroSection />
    <ProjectsSection />
    <EducationSection />
    <ExperienceSection />
    <CertificationsSection />
    <SkillsSection />
    <InterestsSection />
    <SoftSkillsSection />
    <LanguagesSection />
   </main>
   <Footer />
  </div>
 )
}