"use client"

import { useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ArrowRight } from "lucide-react"

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const headlineRef = useRef<HTMLHeadingElement>(null)
    const subheadlineRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        tl.from(headlineRef.current, {
            y: 100,
            opacity: 0,
            duration: 1,
            delay: 0.2,
        })
            .from(
                subheadlineRef.current,
                {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                },
                "-=0.5"
            )
            .from(
                ctaRef.current,
                {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                },
                "-=0.5"
            )
    }, { scope: containerRef })

    return (
        <section
            ref={containerRef}
            className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        >
            {/* Video Background */}
            <div className="absolute inset-0 -z-20 overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                    poster="/images/hero-circuit-layers.png"
                >
                    <source src="/animations/code-to-system.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_40%)] opacity-10 blur-3xl pointer-events-none" />

            {/* Decorative Images */}
            <div className="absolute top-10 left-10 md:left-20 opacity-20 pointer-events-none hidden md:block">
                <Image
                    src="/images/chip-circuit-icon.png"
                    alt=""
                    width={120}
                    height={120}
                    className="animate-pulse"
                />
            </div>
            <div className="absolute bottom-20 right-10 md:right-20 opacity-15 pointer-events-none hidden md:block">
                <Image
                    src="/images/neon-cube.png"
                    alt=""
                    width={150}
                    height={150}
                    className="animate-pulse delay-700"
                />
            </div>

            <div className="z-10 max-w-4xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-4 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Available for R&D Projects
                </div>

                <h1
                    ref={headlineRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50"
                >
                    RATAN LAL BUNKAR
                </h1>

                <p
                    ref={subheadlineRef}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light"
                >
                    <span className="text-primary font-medium">Hardware Systems Engineer</span> solving complex problems with simple, robust embedded solutions.
                </p>

                <div
                    ref={ctaRef}
                    className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8"
                >
                    <a
                        href="#projects"
                        className="group px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 hover:scale-105 flex items-center gap-2"
                    >
                        View Projects
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 rounded-full border border-border bg-background/50 backdrop-blur-sm text-foreground hover:bg-muted transition-all"
                    >
                        Contact Me
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent" />
            </div>
        </section>
    )
}
