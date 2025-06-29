import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl translate-y-1/2 translate-x-1/4"></div>
      
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Ready to transform your educational experience?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Join thousands of educators and institutions already using our platform to deliver exceptional learning experiences.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="px-8">
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </div>
          
          <div className="mt-10 text-sm text-muted-foreground">
            <p>No credit card required. 14-day free trial. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
