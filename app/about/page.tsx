import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

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
                        <Link href="/experience">
                            <Button variant="outline" className="rounded-full px-8">
                                View Experience
                            </Button>
                        </Link>
                        <a href="/Hardware Systems Engineer.pdf" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" className="rounded-full px-8">
                                Download CV
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

            {/* Education Section */}
            <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                    <GraduationCap className="text-primary" /> Education
                </h3>
                <div className="space-y-8">
                    <div className="border-l-2 border-primary/20 pl-8 relative">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                        <h4 className="text-xl font-bold">National Taipei University of Technology (NTUT)</h4>
                        <p className="text-primary">Master of Science in Electrical Engineering</p>
                        <p className="text-sm text-muted-foreground mb-2">Taipei, Taiwan | Feb 2021 – Jan 2023</p>
                        <ul className="list-disc list-outside ml-4 text-muted-foreground space-y-1">
                            <li><strong>Thesis:</strong> "Noise Reduction Using Non-negative Matrix Factorization with Distributive Penalties on Singing Voices Extracted from RPCA and REpet."</li>
                            <li><strong>Awards:</strong> 2021–2023 Taipei Tech International Student Scholarship.</li>
                            <li><strong>Grant:</strong> 2021–2023 SVS Project Research Grant, Systems and Control Lab.</li>
                        </ul>
                    </div>

                    <div className="border-l-2 border-primary/20 pl-8 relative">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                        <h4 className="text-xl font-bold">Indian Institute of Technology, Ropar (IIT Ropar)</h4>
                        <p className="text-primary">Bachelor of Science in Electrical Engineering</p>
                        <p className="text-sm text-muted-foreground mb-2">Punjab, India | April 2016 – August 2020</p>
                        <ul className="list-disc list-outside ml-4 text-muted-foreground space-y-1">
                            <li><strong>Thesis:</strong> "nRF52-Based BLE Mesh Networking for Tracking Moving Machines, Robots, and Personnel on Shop Floor"</li>
                            <li><strong>Achievements:</strong> Scored Top 20 Percentile in JEE Mains and Advanced (2020).</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
