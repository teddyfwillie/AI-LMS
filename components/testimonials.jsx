import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarIcon } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Professor of Computer Science',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    content: 'This AI-powered LMS has transformed how I teach my courses. The personalized learning paths and analytics have significantly improved student engagement and outcomes.',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Online Learning Director',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    content: 'We\'ve implemented this platform across our entire institution and have seen remarkable improvements in student satisfaction and completion rates. The AI recommendations are spot on.',
    rating: 5,
  },
  {
    name: 'Emily Chen',
    role: 'Corporate Training Manager',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    content: 'The platform\'s flexibility and customization options have allowed us to create tailored training programs that meet our specific industry needs. Our team loves the intuitive interface.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-muted/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
            Testimonials
          </div>
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">Trusted by educators worldwide</h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            See what educators and institutions are saying about our AI-powered learning management system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border bg-background px-4 py-2 text-sm">
            <span>4.9/5 average rating</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <span>from 500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <StarIcon key={i} className="h-5 w-5 fill-primary text-primary" />
          ))}
        </div>
        
        <blockquote className="flex-grow">
          <p className="text-muted-foreground">{testimonial.content}</p>
        </blockquote>
        
        <div className="flex items-center gap-4 mt-6 pt-6 border-t">
          <Avatar>
            <AvatarImage src={testimonial.image} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{testimonial.name}</div>
            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
