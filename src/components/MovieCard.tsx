import { motion } from "framer-motion";
import { Star, Heart, Eye } from "lucide-react";

interface MovieCardProps {
  title: string;
  year: number;
  rating: number;
  poster: string;
  index?: number;
}

const MovieCard = ({ title, year, rating, poster, index = 0 }: MovieCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative cursor-pointer"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-secondary">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-4 mb-2">
              <button className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors">
                <Star className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1 text-accent hover:text-accent/80 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Rating badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
          <Star className="w-3 h-3 text-primary fill-primary" />
          <span className="text-xs font-semibold text-foreground">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="mt-3">
        <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{year}</p>
      </div>
    </motion.div>
  );
};

export default MovieCard;
