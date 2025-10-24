import portfolioData from '@/data/portfolioData.json'

export default function Footer() {
 return (
  <footer className="py-8 border-t border-border bg-background/50">
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
     <p className="text-muted-foreground">
      &copy; {new Date().getFullYear()} {portfolioData.profile.name}. Tous droits réservés.
     </p>
    </div>
   </div>
  </footer>
 )
}