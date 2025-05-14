
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="public/lovable-uploads/df7fd8df-38e7-446b-946a-9fbff4ce864b.png" alt="Queryosity Logo" className="h-10" />
          <span className="text-xl font-semibold text-queryosity-blue">Queryosity</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-600 hover:text-queryosity-blue transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-queryosity-blue transition-colors">
            About
          </Link>
          <Link to="/features" className="text-gray-600 hover:text-queryosity-blue transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-gray-600 hover:text-queryosity-blue transition-colors">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex">
            Log in
          </Button>
          <Button className="bg-queryosity-blue hover:bg-queryosity-dark text-white">
            Sign up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
