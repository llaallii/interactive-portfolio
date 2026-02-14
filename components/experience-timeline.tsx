"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

gsap.registerPlugin(ScrollTrigger)

interface ExperienceItem {
    id: string
    role: string
    company: string
    period: string
    description: string[] // Changed to string array for bullet points
    skills: string[]
}

const experiences: ExperienceItem[] = [
    {
        id: "1",
        role: "R&D Hardware Systems Engineer",
        company: "SHL Medical",
        period: "May 2023 - Present",
        description: [
            "Led system-level integration and verification for 2+ connected electromechanical platforms, supporting compliance with ISO 11608 and IEC 60601-1.",
            "Accelerated design transfer by 15 weeks through structured cross-functional issue resolution.",
            "Owned end-to-end validation workflows for the Elexy Power Unit, ensuring 100% traceability for safety-critical electrical performance.",
            "Designed a sensor-instrumented Mechanical Validation Bench, reducing injection time variance by 75% using DoE.",
            "Built an SBC-based ATE platform cutting test cycle time by 90% (<30s).",
        ],
        skills: ["System Integration", "ISO 11608", "IEC 60601", "Validation", "ATE Design", "DoE"],
    },
    {
        id: "2",
        role: "Research Assistant, Systems & Control Lab",
        company: "National Taipei University of Technology (NTUT)",
        period: "Feb 2021 - Jan 2023",
        description: [
            "Collaborated with a cross-functional team to develop a novel noise reduction method utilizing Non-negative Matrix Factorization (NMF).",
            "Applied advanced signal processing techniques (RPCA and REpet) to characterize acoustic data integrity.",
            "Published research in ICSSE 2022.",
        ],
        skills: ["Signal Processing", "NMF", "Python", "Research", "Publication"],
    },
    {
        id: "3",
        role: "Control Systems Engineering Intern",
        company: "DCM Engineering Products",
        period: "Mar 2019 - Aug 2019",
        description: [
            "Implemented PLC control logic (Siemens Step 7, Ladder Logic) and HMI dashboards.",
            "Supported commissioning, sensor wiring, signal mapping, and troubleshooting documentation.",
        ],
        skills: ["PLC", "Siemens Step 7", "HMI", "Ladder Logic", "Commissioning"],
    },
]

export function ExperienceTimeline() {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const items = gsap.utils.toArray(".experience-item") as HTMLElement[]

        items.forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                x: index % 2 === 0 ? -50 : 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            })
        })
    }, { scope: containerRef })

    return (
        <div ref={containerRef} className="relative space-y-8 max-w-4xl mx-auto px-4">
            {/* Center Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

            {experiences.map((exp, index) => (
                <div
                    key={exp.id}
                    className={`experience-item flex flex-col md:flex-row gap-8 items-start ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                        }`}
                >
                    {/* Content Card */}
                    <div className="flex-1 w-full md:w-1/2">
                        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <div className="flex flex-col gap-1">
                                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-primary" />
                                        {exp.role}
                                    </CardTitle>
                                    <div className="text-muted-foreground font-medium">
                                        {exp.company}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        {exp.period}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="mb-4 text-muted-foreground list-disc list-outside ml-4 space-y-2 text-sm">
                                    {exp.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-2">
                                    {exp.skills.map((skill) => (
                                        <Badge key={skill} variant="outline" className="border-primary/20 text-xs">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Timeline Dot */}
                    <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-background border-2 border-primary shrink-0 mt-6">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>

                    {/* Spacer for the other side */}
                    <div className="flex-1 hidden md:block" />
                </div>
            ))}
        </div>
    )
}
