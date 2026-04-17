import { useLayoutEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const StrategicExecution = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    const mm = gsap.matchMedia();
    let revealText: SplitType | null = null;

    const ctx = gsap.context(() => {
      gsap.from(".hero-el", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      mm.add("(min-width: 768px)", () => {
        const container = document.querySelector(".scrolly-container") as HTMLElement | null;
        const panels = gsap.utils.toArray<HTMLElement>(".panel");

        if (!container || panels.length === 0) {
          return;
        }

        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: ".portfolio-wrapper",
            pin: true,
            scrub: 1,
            end: () => `+=${container.offsetWidth}`,
          },
        });
      });

      revealText = new SplitType(".reveal-text", { types: "lines, words, chars" });

      gsap.from(revealText.chars, {
        scrollTrigger: {
          trigger: "#expertise-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        rotateX: -45,
        duration: 0.8,
        stagger: 0.015,
        ease: "back.out(1.5)",
      });

      gsap.fromTo(
        ".expertise-item",
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: "#expertise-section",
            start: "top 40%",
          },
          opacity: 1,
          y: -20,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }, pageRef);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      revealText?.revert();
      mm.revert();
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-gray-50 text-gray-900 antialiased selection:bg-gray-900 selection:text-white"
    >
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between p-6 text-white mix-blend-difference">
        <div className="text-xl font-bold tracking-tighter">MC.</div>
        <div className="hidden space-x-8 text-sm font-medium tracking-wide md:block">
          <a href="#home" className="transition-opacity hover:opacity-70">
            HOME
          </a>
          <a href="#portfolio" className="transition-opacity hover:opacity-70">
            PORTFOLIO
          </a>
          <a href="#expertise-section" className="transition-opacity hover:opacity-70">
            EXPERTISE
          </a>
          <a href="#contact" className="transition-opacity hover:opacity-70">
            CONTACT
          </a>
        </div>
      </nav>

      <section id="home" className="hero-section flex h-screen flex-col justify-center px-8 md:px-24">
        <p className="hero-el mb-4 text-sm uppercase tracking-widest text-gray-500">
          Strategic Construction Executive
        </p>
        <h1 className="hero-el mb-8 max-w-5xl text-5xl font-bold leading-tight tracking-tighter md:text-8xl">
          A Unique Perspective On <br />
          <span className="text-gray-400">Strategic Execution.</span>
        </h1>
        <div className="hero-el mt-8 grid max-w-3xl grid-cols-1 gap-8 border-t border-gray-200 pt-8 sm:grid-cols-3">
          <div>
            <p className="text-4xl font-bold tracking-tight">$500M+</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-gray-500">Portfolio Managed</p>
          </div>
          <div>
            <p className="text-4xl font-bold tracking-tight">37+</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-gray-500">Years Experience</p>
          </div>
          <div>
            <p className="text-4xl font-bold tracking-tight">100%</p>
            <p className="mt-2 text-xs uppercase tracking-widest text-gray-500">On-Time Delivery</p>
          </div>
        </div>
      </section>

      <section id="portfolio" className="portfolio-wrapper overflow-hidden bg-white">
        <div className="scrolly-container flex w-full flex-col md:w-[400vw] md:flex-row md:flex-nowrap">
          <div className="panel flex h-screen w-full flex-col justify-center px-8 md:w-screen md:px-24">
            <h2 className="text-4xl font-bold tracking-tighter md:text-7xl">
              Crafting Legacy
              <br />
              Through Visionary Design.
            </h2>
          </div>

          <div className="panel flex h-screen w-full flex-col justify-center gap-10 px-8 md:w-screen md:flex-row md:items-center md:gap-16 md:px-24">
            <div className="h-[40vh] w-full overflow-hidden rounded-2xl bg-gray-200 md:h-[60vh] md:w-1/2">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Carmel Valley New</h3>
              <p className="text-lg text-gray-600">Custom Residence • Carmel Valley, CA</p>
            </div>
          </div>

          <div className="panel flex h-screen w-full flex-col justify-center gap-10 px-8 md:w-screen md:flex-row md:items-center md:gap-16 md:px-24">
            <div className="h-[40vh] w-full overflow-hidden rounded-2xl bg-gray-200 md:h-[60vh] md:w-1/2">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1541888082470-bf2252a1cd34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Carmel Knolls</h3>
              <p className="text-lg text-gray-600">Civil Development • Carmel, CA</p>
            </div>
          </div>

          <div className="panel flex h-screen w-full flex-col justify-center gap-10 px-8 md:w-screen md:flex-row md:items-center md:gap-16 md:px-24">
            <div className="h-[40vh] w-full overflow-hidden rounded-2xl bg-gray-200 md:h-[60vh] md:w-1/2">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Development Civil</h3>
              <p className="text-lg text-gray-600">Construction • SE Texas</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="expertise-section"
        className="flex min-h-screen flex-col justify-center bg-gray-50 px-8 py-24 md:px-24 md:py-32"
      >
        <div className="max-w-5xl">
          <p className="mb-6 text-sm font-medium uppercase tracking-widest text-gray-500">Core Expertise</p>
          <h2 className="reveal-text mb-8 text-4xl font-bold leading-tight tracking-tighter md:text-7xl">
            Comprehensive Construction Solutions. Strategic oversight for complex projects.
          </h2>
          <div className="mt-20 grid grid-cols-1 gap-x-16 md:grid-cols-2">
            <div className="expertise-item border-t border-gray-200 py-8">
              <h4 className="mb-2 text-xl font-bold tracking-tight">Structural Design-Build</h4>
              <p className="text-gray-500">
                End-to-end management of complex structural developments from architecture to execution.
              </p>
            </div>
            <div className="expertise-item border-t border-gray-200 py-8">
              <h4 className="mb-2 text-xl font-bold tracking-tight">Premium Residential</h4>
              <p className="text-gray-500">
                Delivering boutique quality at an institutional scale for high-end coastal estates.
              </p>
            </div>
            <div className="expertise-item border-t border-gray-200 py-8">
              <h4 className="mb-2 text-xl font-bold tracking-tight">Global Logistics</h4>
              <p className="text-gray-500">
                Navigating international logistics for offshore and remote multimillion-dollar locations.
              </p>
            </div>
            <div className="expertise-item border-t border-gray-200 py-8">
              <h4 className="mb-2 text-xl font-bold tracking-tight">Project Recovery</h4>
              <p className="text-gray-500">
                Technical turnaround management for stalled or under-performing developments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="flex h-[70vh] flex-col items-center justify-center bg-white px-6 text-center"
      >
        <h2 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">
          Ready to Elevate Your Next Development?
        </h2>
        <button
          type="button"
          className="mt-8 rounded-full bg-gray-900 px-8 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl"
        >
          Start Inquiry
        </button>
      </section>
    </div>
  );
};

export default StrategicExecution;