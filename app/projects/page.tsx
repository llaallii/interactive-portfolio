import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const industrialProjects = [
    {
        title: "Elexy Power Unit",
        description: "End-to-end validation for an electromechanical autoinjector. Ensured 100% requirements-to-test traceability for safety-critical electrical performance, timing behavior, and automated injection logic.",
        tags: ["Medical Device", "Validation", "Electromechanical", "Safety-Critical"],
        image: "/images/electronics-exploded.png",
        links: {},
    },
    {
        title: "SmartHub",
        description: "BLE data collector for connected health devices. Led system-level integration and supported defect triage across HW/FW/ME from prototyping through production ramp.",
        tags: ["BLE", "IoT", "System Integration", "Data Collection"],
        image: "/images/iot-system-diagram.png",
        links: {},
    },
    {
        title: "Molly cCap",
        description: "Connected module for smart injection devices. Managed technical trade-offs and cross-functional issue resolution to accelerate design transfer.",
        tags: ["Connected Health", "NPI", "Cross-functional", "System Architecture"],
        image: "/images/code-hardware-fusion.png",
        links: {},
    },
    {
        title: "Mechanical Validation Bench",
        description: "Designed a sensor-instrumented bench to characterize actuator timing pipelines, reducing injection time variance by 75% using Design of Experiments (DoE).",
        tags: ["Test Fixture", "Sensors", "DoE", "Instrumentation"],
        image: "/images/monitoring-cube.png",
        links: {},
    },
    {
        title: "SBC-based ATE Platform",
        description: "Built a Single Board Computer based Automated Test Equipment platform for system V&V, cutting test cycle time by 90% (<30s) while ensuring accurate BLE timestamp capture.",
        tags: ["ATE", "Python", "Automation", "V&V"],
        image: "/images/chip-code-overlay.png",
        links: {},
    },
];

const researchProjects = [
    {
        title: "Noise Reduction using NMF",
        description: "Developed a novel noise reduction method utilizing Non-negative Matrix Factorization (NMF) to isolate clean singing voices from complex backgrounds. Published in ICSSE 2022.",
        tags: ["Signal Processing", "NMF", "Python", "Research"],
        image: "/images/code-particles.png",
        links: { demo: "https://ieeexplore.ieee.org/document/9948446" },
    },
    {
        title: "nRF52-Based BLE Mesh Networking",
        description: "Implemented a BLE Mesh network for tracking moving machines, robots, and personnel on a shop floor. Scored top percentile achievements.",
        tags: ["BLE Mesh", "nRF52", "IoT", "Tracking"],
        image: "/images/circuit-board-closeup.png",
        links: {},
    },
];

const hobbyProjects = [
    {
        title: "Drone Motor Controller",
        description: "High-performance BLDC motor controller design using STM32F407. Implements FOC algorithms for precise speed and torque control.",
        tags: ["STM32F407", "Motor Control", "BLDC", "FOC", "Hardware Design"],
        image: "/images/actuator-components.png",
        links: {},
    },
    {
        title: "Drone HIL/SITL Simulation Platform",
        description: "Heterogeneous single-board solution using STM32MP257. Features Cortex-A35 as companion computer and Cortex-M33 as flight controller, integrated with Gazebo simulation on PC.",
        tags: ["STM32MP257", "HIL/SITL", "Gazebo", "Cortex-A35", "Cortex-M33", "Heterogeneous Computing"],
        image: "/images/robot-arm.png",
        links: {},
    },
];

export default function ProjectsPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <SectionHeading title="Projects" subtitle="A collection of my industrial, research, and hobby work." align="center" />

            <Tabs defaultValue="industrial" className="max-w-6xl mx-auto">
                <div className="flex justify-center mb-8">
                    <TabsList className="grid w-full max-w-xl grid-cols-3">
                        <TabsTrigger value="industrial">Industrial Projects</TabsTrigger>
                        <TabsTrigger value="research">Research & Academic</TabsTrigger>
                        <TabsTrigger value="hobby">Hobby Projects</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="industrial">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {industrialProjects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="research">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {researchProjects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="hobby">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {hobbyProjects.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
