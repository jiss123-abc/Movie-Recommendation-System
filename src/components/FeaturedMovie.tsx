import { motion } from "framer-motion";
import { Play, Star, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturedMovieProps {
  title: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  plot: string;
  backdrop: string;
  director: string;
}

const FeaturedMovie = ({
  title,
  year,
  rating,
  runtime,
  genres,
  plot,
  backdrop,
  director,
}: FeaturedMovieProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[90vh] flex items-end"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={backdrop}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pb-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Featured Film
            </span>
            <div className="flex items-center gap-1 bg-primary/20 rounded-full px-3 py-1">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-bold text-primary">{rating.toFixed(1)}</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-4 leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <span>{year}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {Math.floor(runtime / 60)}h {runtime % 60}m
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>Directed by {director}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {genres.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed line-clamp-3">
            {plot}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" className="gap-2">
              <Play className="w-5 h-5 fill-current" />
              Watch Trailer
            </Button>
            <Button variant="glass" size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              Add to Watchlist
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedMovie;
