import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";

const featuredProjects = [
  {
    title: "Elexy Power Unit",
    description: "End-to-end validation for an electromechanical autoinjector. Ensured 100% requirements-to-test traceability.",
    tags: ["Validation", "Medical Device", "Safety-Critical"],
    image: "/images/electronics-exploded.png",
    links: {},
  },
  {
    title: "SmartHub",
    description: "BLE data collector for connected health devices. Led system-level integration from prototyping to production.",
    tags: ["BLE", "IoT", "System Integration"],
    image: "/images/iot-system-diagram.png",
    links: {},
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* About Teaser */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden lg:block">
          <Image
            src="/images/electronics-exploded.png"
            alt=""
            width={450}
            height={400}
            className="object-contain"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading title="About Me" align="left" />
          <div className="max-w-3xl">
            <p className="text-xl text-muted-foreground mb-8 text-left leading-relaxed">
              I'm Ratan Lal Bunkar, a Hardware Systems Engineer passionate about building robust embedded solutions.
              I specialize in bridging the gap between hardware and software to create efficient, reliable systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about">
                <Button variant="outline" className="rounded-full">
                  More About Me
                </Button>
              </Link>
              <a href="/Hardware Systems Engineer.pdf" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full">
                  Download CV
                </Button>
              </a>
              <Link href="/skills">
                <Button variant="ghost" className="rounded-full group">
                  View Skills <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <SectionHeading title="Featured Work" align="left" className="mb-0" />
            <Link href="/projects" className="hidden md:block">
              <Button variant="ghost" className="group">
                View All Projects <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/projects">
              <Button variant="outline" className="w-full">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 border-t border-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            poster="/images/hero-circuit-layers.png"
          >
            <source src="/animations/engineering-visualization.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to collaborate?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-8 text-lg h-12">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
