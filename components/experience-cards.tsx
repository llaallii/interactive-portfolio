"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Briefcase, Calendar, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExperienceItem {
    id: string
    role: string
    company: string
    location: string
    period: string
    description: string[]
    skills: string[]
}

const experienceData: ExperienceItem[] = [
    {
        id: "1",
        role: "R&D Hardware Systems Engineer",
        company: "SHL Medical",
        location: "Taiwan",
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
        location: "Taipei, Taiwan",
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
        location: "India",
        period: "Mar 2019 - Aug 2019",
        description: [
            "Implemented PLC control logic (Siemens Step 7, Ladder Logic) and HMI dashboards.",
            "Supported commissioning, sensor wiring, signal mapping, and troubleshooting documentation.",
        ],
        skills: ["PLC", "Siemens Step 7", "HMI", "Ladder Logic", "Commissioning"],
    },
]

export function ExperienceCards() {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id)
    }

    return (
        <div className="space-y-4">
            {experienceData.map((exp) => {
                const isExpanded = expandedId === exp.id

                return (
                    <Card
                        key={exp.id}
                        className={cn(
                            "cursor-pointer transition-all duration-300 hover:border-primary/50",
                            isExpanded ? "border-primary/50 bg-card" : "bg-card/50 backdrop-blur-sm border-border/50"
                        )}
                        onClick={() => toggleExpand(exp.id)}
                    >
                        <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <CardTitle className="text-lg font-bold flex items-center gap-2 mb-1">
                                        <Briefcase className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span>{exp.role}</span>
                                    </CardTitle>
                                    <p className="text-primary font-medium">{exp.company}</p>
                                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{exp.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{exp.period}</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronDown
                                    className={cn(
                                        "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 mt-1",
                                        isExpanded && "rotate-180"
                                    )}
                                />
                            </div>
                        </CardHeader>

                        <div
                            className={cn(
                                "overflow-hidden transition-all duration-300",
                                isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                            )}
                        >
                            <CardContent className="space-y-4 pt-0">
                                <div>
                                    <h5 className="font-semibold text-sm mb-2">Responsibilities</h5>
                                    <ul className="space-y-2">
                                        {exp.description.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <span className="text-primary mt-1">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-sm mb-2">Skills & Technologies</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map((skill) => (
                                            <Badge key={skill} variant="outline" className="border-primary/20 text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
