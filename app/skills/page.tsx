import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skillCategories = [
    {
        title: "Hardware Systems Engineering",
        skills: ["System Architecture", "MBSE (SysML/UML)", "HW/FW Bring-up", "electromechanical Integration", "DFM/DFT", "NPD -> NPI"],
    },
    {
        title: "Connectivity & Interfaces",
        skills: ["BLE", "LTE CAT M1", "UART", "SPI", "RS-232/422/485", "Protocol Analysis", "Performance Profiling"],
    },
    {
        title: "System Debug & Reliability",
        skills: ["Root Cause Analysis (RCA)", "Timing Margin Testing", "Log & Packet Analysis", "Oscilloscope Debugging", "Power Management"],
    },
    {
        title: "Validation Platforms",
        skills: ["Python Automation", "Custom Hardware Fixtures", "State Machines", "Data Logging", "Visualization"],
    },
    {
        title: "Embedded & Electromechanical",
        skills: ["Mechatronic Subsystems", "Sensor Fusion", "Real-Time Control", "DoE", "Motor Control"],
    },
    {
        title: "Regulatory & Standards",
        skills: ["ISO 11608", "IEC 60601", "Design Control (21 CFR 820.30)", "ISO 14971", "Risk Management"],
    },
    {
        title: "Tools & Languages",
        skills: ["Python", "C/C++", "Linux", "Git", "Wireshark", "SysML/UML", "JIRA/Confluence", "Teamcenter/Polarion"],
    },
];

export default function SkillsPage() {
    return (
        <div className="container mx-auto px-4 py-16 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-20 right-0 opacity-10 pointer-events-none hidden lg:block">
                <Image
                    src="/images/hero-circuit-layers.png"
                    alt=""
                    width={400}
                    height={400}
                    className="object-contain"
                />
            </div>
            <div className="absolute bottom-20 left-0 opacity-10 pointer-events-none hidden lg:block">
                <Image
                    src="/images/chip-circuit-icon.png"
                    alt=""
                    width={300}
                    height={300}
                    className="object-contain"
                />
            </div>

            <SectionHeading
                title="Technical Skills"
                subtitle="Comprehensive expertise in hardware-software systems."
                align="center"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
                {skillCategories.map((category, index) => (
                    <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors h-full">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-center md:text-left text-primary">
                                {category.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {category.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm bg-secondary/50 hover:bg-primary/20 transition-colors">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
