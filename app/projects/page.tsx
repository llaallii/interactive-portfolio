import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjectsByCategory, getPublishedProjects } from "@/lib/projects";

export default function ProjectsPage() {
    const allProjects = getPublishedProjects()
    const industrialProjects = getProjectsByCategory("Industrial")
    const researchProjects = getProjectsByCategory("Research")
    const hobbyProjects = getProjectsByCategory("Hobby")

    return (
        <div className="container mx-auto px-4 py-16">
            <SectionHeading 
                title="Projects" 
                subtitle={`A collection of my industrial, research, and hobby work. ${allProjects.length} projects total.`} 
                align="center" 
            />

            <Tabs defaultValue="industrial" className="max-w-6xl mx-auto">
                <div className="flex justify-center mb-8">
                    <TabsList className="grid w-full max-w-xl grid-cols-3">
                        <TabsTrigger value="industrial">
                            Industrial ({industrialProjects.length})
                        </TabsTrigger>
                        <TabsTrigger value="research">
                            Research ({researchProjects.length})
                        </TabsTrigger>
                        <TabsTrigger value="hobby">
                            Hobby ({hobbyProjects.length})
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="industrial">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {industrialProjects.map((project) => (
                            <ProjectCard 
                                key={project.slug} 
                                slug={project.slug}
                                title={project.title}
                                description={project.excerpt}
                                tags={project.tags}
                                image={project.image}
                                links={project.links}
                                category={project.category}
                                role={project.role}
                                duration={project.duration}
                                featured={project.featured}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="research">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {researchProjects.map((project) => (
                            <ProjectCard 
                                key={project.slug} 
                                slug={project.slug}
                                title={project.title}
                                description={project.excerpt}
                                tags={project.tags}
                                image={project.image}
                                links={project.links}
                                category={project.category}
                                role={project.role}
                                duration={project.duration}
                                featured={project.featured}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="hobby">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {hobbyProjects.map((project) => (
                            <ProjectCard 
                                key={project.slug} 
                                slug={project.slug}
                                title={project.title}
                                description={project.excerpt}
                                tags={project.tags}
                                image={project.image}
                                links={project.links}
                                category={project.category}
                                role={project.role}
                                duration={project.duration}
                                featured={project.featured}
                            />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
