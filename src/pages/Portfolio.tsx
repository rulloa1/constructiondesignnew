import Layout from "@/components/layout/Layout";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { projects, categories, getFeaturedProjects, type ProjectCategory } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";

const Portfolio = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>(
    (categoryFromUrl as ProjectCategory) || "All"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryFromUrl && (categories as readonly string[]).includes(categoryFromUrl)) {
      setActiveFilter(categoryFromUrl as ProjectCategory);
    }
  }, [categoryFromUrl]);

  const featured = useMemo(() => getFeaturedProjects(), []);
  const nonFeatured = useMemo(() => projects.filter((p) => !p.featured), []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return nonFeatured;
    return nonFeatured.filter((p) => p.category === activeFilter);
  }, [activeFilter, nonFeatured]);

  const getCategoryCount = (cat: ProjectCategory) => {
    if (cat === "All") return projects.length;
    return projects.filter((p) => p.category === cat).length;
  };

  return (
    <Layout>
      {/* Editorial Hero */}
      <section className="relative bg-charcoal text-cream pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div className="grid grid-cols-4 grid-rows-2 h-full w-full">
            {projects.slice(0, 8).map((p) => (
              <img
                key={p.id}
                src={p.coverImage}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover grayscale"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="text-cream/40 hover:text-gold transition-colors text-[10px] tracking-[0.3em] uppercase font-light mb-12 inline-flex items-center gap-2"
          >
            ← Back
          </button>

          <p className="font-montserrat text-[10px] tracking-[0.4em] text-gold/80 uppercase mb-6">
            The Collection
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] mb-10 max-w-4xl">
            Michael Chandler<br />
            <span className="italic text-gold/90">Portfolio</span>
          </h1>
          <div className="h-px w-24 bg-gold mb-10" />
          <p className="font-montserrat text-base md:text-lg text-cream/60 font-light leading-relaxed max-w-2xl mb-16">
            37+ years. $500M+ portfolio. Every project is a testament to precision,
            craftsmanship, and uncompromising standards.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-3xl">
            {[
              { value: "19", label: "Signature Projects" },
              { value: "37+", label: "Years Excellence" },
              { value: "$500M+", label: "Portfolio Value" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-cormorant text-4xl md:text-6xl font-light text-gold leading-none mb-3">
                  {s.value}
                </div>
                <div className="font-montserrat text-[9px] md:text-[10px] tracking-[0.25em] text-cream/40 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-montserrat text-[10px] tracking-[0.4em] text-gold uppercase mb-4">
                ★ Featured Work
              </p>
              <h2 className="font-cormorant text-4xl md:text-5xl text-charcoal font-light">
                Signature Projects
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {featured.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="group relative block overflow-hidden bg-charcoal"
                  style={{ height: "75vh", minHeight: "560px" }}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Featured badge */}
                  <div className="absolute top-7 left-7 z-10">
                    <span
                      className="inline-flex items-center gap-1.5 px-4 py-2 font-montserrat text-[10px] tracking-[0.25em] uppercase font-semibold"
                      style={{ background: "#D4AF37", color: "#1a1a1a" }}
                    >
                      <Star className="w-3 h-3 fill-current" /> Featured
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-8 md:p-14 text-cream">
                    <p className="font-montserrat text-[10px] tracking-[0.3em] text-gold/90 uppercase mb-3">
                      {project.category}
                    </p>
                    <h3 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light leading-[1] mb-3 group-hover:text-gold transition-colors duration-500">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="font-cormorant italic text-xl md:text-2xl text-cream/80 font-light mb-5">
                        {project.subtitle}
                      </p>
                    )}
                    <div className="h-px w-16 bg-gold/60 mb-5" />
                    <p className="font-montserrat text-sm text-cream/70 font-light mb-3">
                      {project.location}
                    </p>
                    {project.specs && (
                      <p className="font-montserrat text-xs tracking-wider text-cream/50 font-light">
                        {project.specs}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section className="bg-background pt-12 pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="font-montserrat text-[10px] tracking-[0.4em] text-gold uppercase mb-4">
              The Full Archive
            </p>
            <h2 className="font-cormorant text-4xl md:text-5xl text-charcoal font-light">
              All Projects
            </h2>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16">
            {(categories as readonly ProjectCategory[]).map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 md:px-8 py-3 font-montserrat text-[10px] md:text-[11px] tracking-[0.2em] uppercase border transition-all duration-500 ${
                    isActive
                      ? "bg-charcoal text-cream border-charcoal"
                      : "bg-transparent text-charcoal/60 border-charcoal/20 hover:border-charcoal/60 hover:text-charcoal"
                  }`}
                >
                  {cat} <span className="opacity-60 ml-1">({getCategoryCount(cat)})</span>
                </button>
              );
            })}
          </div>

          {/* Project grid */}
          <motion.div
            layout
            className="grid gap-6 md:gap-8"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(400px, 100%), 1fr))" }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  key={project.id}
                >
                  <Link
                    to={`/projects/${project.id}`}
                    className="group block relative overflow-hidden bg-charcoal aspect-[3/4]"
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.08]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Category */}
                    <div className="absolute top-5 left-5 z-10">
                      <span className="font-montserrat text-[9px] tracking-[0.25em] text-gold/90 uppercase font-medium">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover arrow */}
                    <div className="absolute top-5 right-5 z-10 w-10 h-10 border border-cream/30 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-500">
                      <ArrowRight className="w-4 h-4 text-cream" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-7 text-cream">
                      <h3 className="font-cormorant text-2xl md:text-3xl font-light leading-tight mb-2 group-hover:text-gold transition-colors duration-500">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="font-cormorant italic text-base text-cream/75 font-light mb-3">
                          {project.subtitle}
                        </p>
                      )}
                      <div className="h-px w-10 bg-gold/60 mb-3" />
                      {project.specs ? (
                        <p className="font-montserrat text-[11px] tracking-wider text-cream/60 font-light">
                          {project.location} • {project.specs}
                        </p>
                      ) : (
                        <p className="font-montserrat text-[11px] tracking-wider text-cream/60 font-light">
                          {project.location}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <div className="text-center mt-24">
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-charcoal text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-500 font-montserrat text-[11px] tracking-[0.25em] uppercase px-12 py-7 rounded-none"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
