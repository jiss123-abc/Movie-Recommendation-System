import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import FeaturedMovie from "@/components/FeaturedMovie";
import MovieCard from "@/components/MovieCard";
import { movies, featuredMovie } from "@/data/movies";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Featured Movie Hero */}
      <FeaturedMovie
        title={featuredMovie.title}
        year={featuredMovie.year}
        rating={featuredMovie.rating}
        runtime={featuredMovie.runtime}
        genres={featuredMovie.genres}
        plot={featuredMovie.plot}
        backdrop={heroBg}
        director={featuredMovie.director}
      />

      {/* Trending Section */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/20">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Trending This Week
            </h2>
          </div>
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.slice(0, 5).map((movie, index) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
              poster={movie.poster}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Popular Films Section */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Popular Films
            </h2>
          </div>
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.slice(3, 8).map((movie, index) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
              poster={movie.poster}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src={heroBg}
              alt="Join Filmbox"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
          </div>
          
          <div className="relative py-16 px-8 md:px-16 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Track films you've watched.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Save those you want to see. Tell your friends what's good. Join a community of film lovers.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button variant="hero" size="lg">
                Get Started — It's Free
              </Button>
              <Button variant="glass" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">F</span>
              </div>
              <span className="font-serif font-bold text-foreground">Filmbox</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">About</a>
              <a href="#" className="hover:text-foreground transition-colors">Help</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © 2024 Filmbox. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
