import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="w-full py-6 md:py-12 border-t border-border/50 bg-background">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col gap-2 text-center md:text-left">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Ratan Lal Bunkar. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Built with Next.js, Tailwind CSS & GSAP.
                    </p>
                </div>

                <div className="flex gap-6">
                    <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="https://linkedin.com/in/ratanlalbunkar" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link href="mailto:ratanbunkar2@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
