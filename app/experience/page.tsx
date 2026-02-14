import Image from "next/image";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { SectionHeading } from "@/components/section-heading";

export default function ExperiencePage() {
    return (
        <div className="container mx-auto px-4 py-16 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-40 right-0 opacity-10 pointer-events-none hidden lg:block">
                <Image
                    src="/images/neon-cube.png"
                    alt=""
                    width={350}
                    height={350}
                    className="object-contain"
                />
            </div>
            <div className="absolute bottom-40 left-0 opacity-10 pointer-events-none hidden lg:block">
                <Image
                    src="/images/monitoring-cube.png"
                    alt=""
                    width={400}
                    height={400}
                    className="object-contain"
                />
            </div>

            <SectionHeading
                title="Professional Experience"
                subtitle="My journey in the industry."
                align="center"
            />
            <div className="relative z-10">
                <ExperienceTimeline />
            </div>
        </div>
    );
}
