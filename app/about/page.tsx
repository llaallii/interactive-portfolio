import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, GraduationCap, Briefcase } from "lucide-react";
import { EducationCards } from "@/components/education-cards";
import { ExperienceCards } from "@/components/experience-cards";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <SectionHeading
                title="About Me"
                subtitle="R&D Hardware Systems Engineer | Connected Health Devices"
                align="center"
            />

            <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto mb-16">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <p>
                        I am a <span className="text-foreground font-medium">Hardware Systems Engineer</span> (MS from NTUT, BS from IIT) with 4+ years of experience owning system integration for ISO 11608 and IEC 60601-compliant connected health platforms.
                    </p>
                    <p>
                        I specialize in defining system architecture and managing technical trade-offs across <span className="text-primary">HW/FW/ME</span> domains from concept through high-volume NPI. My expertise lies in deep-dive Root Cause Analysis (RCA) for power management and safety-critical performance validation.
                    </p>
                    <p>
                        Currently, I am focused on building robust electromechanical solutions, designing automated validation platforms, and ensuring seamless connectivity for medical devices.
                    </p>

                    <div className="pt-4 flex flex-wrap gap-4">
                        <Link href="/contact">
                            <Button className="rounded-full px-8">
                                Let's Talk <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <a href="/Hardware Systems Engineer.pdf" target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="rounded-full px-8">
                                Download CV
                            </Button>
                        </a>
                        <a href="#experience">
                            <Button variant="ghost" className="rounded-full px-8">
                                View Experience <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </a>
                    </div>
                </div>

                <div className="relative aspect-square md:aspect-[4/5] bg-muted rounded-2xl overflow-hidden border border-primary/20">
                    <Image
                        src="/images/profile-cyborg.png"
                        alt="Ratan Lal Bunkar - Hardware Systems Engineer"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
                </div>
            </div>

            {/* Education & Experience Section - Side by Side */}
            <div className="max-w-7xl mx-auto" id="experience">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Education Column */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <GraduationCap className="text-primary" /> Education
                        </h3>
                        <EducationCards />
                    </div>

                    {/* Experience Column */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Briefcase className="text-primary" /> Professional Experience
                        </h3>
                        <ExperienceCards />
                    </div>
                </div>
            </div>
        </div>
    );
}
