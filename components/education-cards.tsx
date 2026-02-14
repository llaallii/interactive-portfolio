"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, GraduationCap, MapPin, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface EducationItem {
    id: string
    institution: string
    degree: string
    field: string
    location: string
    period: string
    thesis?: string
    achievements?: string[]
    awards?: string[]
    grants?: string[]
}

const educationData: EducationItem[] = [
    {
        id: "1",
        institution: "National Taipei University of Technology (NTUT)",
        degree: "Master of Science",
        field: "Electrical Engineering",
        location: "Taipei, Taiwan",
        period: "Feb 2021 – Jan 2023",
        thesis: "Noise Reduction Using Non-negative Matrix Factorization with Distributive Penalties on Singing Voices Extracted from RPCA and REpet.",
        awards: ["2021–2023 Taipei Tech International Student Scholarship"],
        grants: ["2021–2023 SVS Project Research Grant, Systems and Control Lab"],
    },
    {
        id: "2",
        institution: "Indian Institute of Technology, Ropar (IIT Ropar)",
        degree: "Bachelor of Science",
        field: "Electrical Engineering",
        location: "Punjab, India",
        period: "April 2016 – August 2020",
        thesis: "nRF52-Based BLE Mesh Networking for Tracking Moving Machines, Robots, and Personnel on Shop Floor",
        achievements: ["Scored Top 20 Percentile in JEE Mains and Advanced (2020)"],
    },
]

export function EducationCards() {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id)
    }

    return (
        <div className="space-y-4">
            {educationData.map((edu) => {
                const isExpanded = expandedId === edu.id

                return (
                    <Card
                        key={edu.id}
                        className={cn(
                            "cursor-pointer transition-all duration-300 hover:border-primary/50",
                            isExpanded ? "border-primary/50 bg-card" : "bg-card/50 backdrop-blur-sm border-border/50"
                        )}
                        onClick={() => toggleExpand(edu.id)}
                    >
                        <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <CardTitle className="text-lg font-bold flex items-center gap-2 mb-1">
                                        <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                                        <span>{edu.institution}</span>
                                    </CardTitle>
                                    <p className="text-primary font-medium">
                                        {edu.degree} in {edu.field}
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{edu.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{edu.period}</span>
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
                                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            )}
                        >
                            <CardContent className="space-y-4 pt-0">
                                {edu.thesis && (
                                    <div>
                                        <h5 className="font-semibold text-sm mb-1">Thesis</h5>
                                        <p className="text-sm text-muted-foreground italic">
                                            "{edu.thesis}"
                                        </p>
                                    </div>
                                )}

                                {edu.awards && edu.awards.length > 0 && (
                                    <div>
                                        <h5 className="font-semibold text-sm mb-2">Awards</h5>
                                        <ul className="space-y-1">
                                            {edu.awards.map((award, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <Badge variant="secondary" className="mt-0.5 text-xs">
                                                        🏆
                                                    </Badge>
                                                    <span>{award}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {edu.grants && edu.grants.length > 0 && (
                                    <div>
                                        <h5 className="font-semibold text-sm mb-2">Grants</h5>
                                        <ul className="space-y-1">
                                            {edu.grants.map((grant, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <Badge variant="secondary" className="mt-0.5 text-xs">
                                                        💰
                                                    </Badge>
                                                    <span>{grant}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {edu.achievements && edu.achievements.length > 0 && (
                                    <div>
                                        <h5 className="font-semibold text-sm mb-2">Achievements</h5>
                                        <ul className="space-y-1">
                                            {edu.achievements.map((achievement, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <Badge variant="secondary" className="mt-0.5 text-xs">
                                                        ⭐
                                                    </Badge>
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </CardContent>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
