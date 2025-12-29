import { Link } from "react-router-dom";
import { Film, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-300">
              <Film className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-bold text-foreground tracking-tight">
              Filmbox
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/films" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Films
            </Link>
            <Link 
              to="/lists" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Lists
            </Link>
            <Link 
              to="/members" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Members
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
