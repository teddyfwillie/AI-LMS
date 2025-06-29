import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { BookOpen, BrainCircuit, Layers, LayoutGrid, LineChart, Settings2, Sparkles, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function Features() {
    return (
        <section id="features" className="py-20 md:py-32">
            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                        Features
                    </div>
                    <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">Everything you need to succeed</h2>
                    <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">Our AI-powered learning management system provides all the tools educators and students need for an exceptional learning experience.</p>
                </div>
                
                {/* Feature grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    <FeatureCard 
                        icon={<BrainCircuit className="size-6" />}
                        title="AI-Powered Learning"
                        description="Leverage artificial intelligence to create personalized learning paths and adaptive content that responds to individual student needs."
                    />
                    
                    <FeatureCard 
                        icon={<LayoutGrid className="size-6" />}
                        title="Intuitive Course Builder"
                        description="Easily create and organize courses with our drag-and-drop interface, rich media support, and customizable templates."
                    />
                    
                    <FeatureCard 
                        icon={<LineChart className="size-6" />}
                        title="Advanced Analytics"
                        description="Gain insights into student performance, engagement, and learning patterns with comprehensive analytics and reporting tools."
                    />
                    
                    <FeatureCard 
                        icon={<Users className="size-6" />}
                        title="Collaborative Learning"
                        description="Foster community and teamwork with discussion forums, group projects, peer reviews, and real-time collaboration tools."
                    />
                    
                    <FeatureCard 
                        icon={<BookOpen className="size-6" />}
                        title="Content Library"
                        description="Access a vast library of educational resources, templates, and AI-generated content to enhance your courses."
                    />
                    
                    <FeatureCard 
                        icon={<Layers className="size-6" />}
                        title="Seamless Integration"
                        description="Connect with your favorite tools and platforms through our extensive API and integration capabilities."
                    />
                </div>
                
                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <div className="inline-block rounded-lg bg-muted p-1 mb-8">
                        <div className="flex items-center space-x-1 rounded-md bg-muted p-1">
                            <span className="inline-flex items-center justify-center rounded-md bg-background px-3 py-1.5 text-sm font-medium shadow-sm">For Educators</span>
                            <span className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium">For Students</span>
                            <span className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium">For Institutions</span>
                        </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold md:text-3xl mb-4">Ready to transform your educational experience?</h3>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Join thousands of educators and institutions already using our platform to deliver exceptional learning experiences.</p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild size="lg" className="px-8">
                            <Link href="/dashboard">Start Free Trial</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="px-8">
                            <Link href="/pricing">View Pricing</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

const FeatureCard = ({ icon, title, description, className }) => {
    return (
        <Card className={cn("group transition-all duration-300 hover:shadow-md hover:border-primary/20", className)}>
            <CardHeader className="pb-3">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
                <h3 className="text-xl font-medium">{title}</h3>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}
