"use client"

import { useRef, useState } from "react"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { sendEmail } from "@/app/actions/send-email"

export function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const result = await sendEmail(formData)

        setIsSubmitting(false)

        if (result.success) {
            setIsSubmitted(true)
            formRef.current?.reset()
        } else {
            setError(result.error || "Failed to send message. Please try again.")
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Get in Touch</CardTitle>
                    <CardDescription className="text-center">
                        Have a project in mind or just want to say hi?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center animate-in fade-in zoom-in duration-500">
                            <CheckCircle className="w-16 h-16 text-green-500" />
                            <h3 className="text-xl font-bold">Message Sent!</h3>
                            <p className="text-muted-foreground">
                                Thanks for reaching out. I'll get back to you as soon as possible.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setIsSubmitted(false)}
                                className="mt-4"
                            >
                                Send another message
                            </Button>
                        </div>
                    ) : (
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                    id="name" 
                                    name="name"
                                    placeholder="Your Name" 
                                    required 
                                    className="bg-background/50" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    name="email"
                                    type="email" 
                                    placeholder="your@email.com" 
                                    required 
                                    className="bg-background/50" 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell me about your project..."
                                    className="min-h-[120px] bg-background/50"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        Sending...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Send Message <Send className="w-4 h-4" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
