
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="w-full bg-queryosity-blue text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="public/lovable-uploads/df7fd8df-38e7-446b-946a-9fbff4ce864b.png" 
                alt="Queryosity Logo" 
                className="h-10 brightness-0 invert" 
              />
              <span className="text-xl font-semibold">Queryosity</span>
            </div>
            <p className="text-blue-100 mb-6 max-w-md">
              Helping brands stay visible and relevant in the age of AI-powered search engines
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="outline" className="rounded-full border-white/20 hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full border-white/20 hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full border-white/20 hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </Button>
              <Button size="icon" variant="outline" className="rounded-full border-white/20 hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Case Studies</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-blue-100 mb-4 md:mb-0">
            © 2025 Queryosity. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-blue-100 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-blue-100 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-blue-100 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
