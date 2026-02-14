import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-20 left-0 opacity-10 pointer-events-none hidden lg:block">
                <Image
                    src="/images/chip-circuit-icon.png"
                    alt=""
                    width={250}
                    height={250}
                    className="object-contain"
                />
            </div>
            <div className="absolute bottom-20 right-0 opacity-10 pointer-events-none hidden lg:block">
                <Image
                    src="/images/circuit-board-closeup.png"
                    alt=""
                    width={350}
                    height={350}
                    className="object-contain"
                />
            </div>

            <SectionHeading
                title="Contact Me"
                subtitle="Let's build something together."
                align="center"
            />

            <div className="grid md:grid-cols-2 gap-12 w-full max-w-4xl mb-12 relative z-10">
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold">Get In Touch</h3>
                    <p className="text-muted-foreground">
                        I am currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <a href="mailto:ratanbunkar2@gmail.com" className="font-medium hover:text-primary transition-colors">ratanbunkar2@gmail.com</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <a href="tel:+886975010438" className="font-medium hover:text-primary transition-colors">+886-975010438</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Linkedin className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">LinkedIn</p>
                                <a href="https://linkedin.com/in/ratanlalbunkar" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary transition-colors">linkedin.com/in/ratanlalbunkar</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Location</p>
                                <p className="font-medium">Taoyuan, Taiwan</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
