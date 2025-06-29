import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroHeader } from "@/components/hero8-header";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-10"></div>

          <div className="pb-24 pt-24 md:pt-32 md:pb-32 lg:pb-40 lg:pt-44">
            <div className="relative mx-auto max-w-7xl flex flex-col px-6 lg:flex-row lg:items-center lg:gap-12">
              <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left lg:w-1/2">
                <div className="mb-6 inline-flex items-center rounded-full border px-3 py-1 text-sm">
                  <span className="mr-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                    New
                  </span>
                  <span className="text-muted-foreground">
                    Introducing our AI-powered LMS
                  </span>
                </div>

                <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
                  Transform Learning with{" "}
                  <span className="text-primary">AI-Powered</span> Education
                </h1>

                <p className="mt-6 text-pretty text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  Our intelligent learning management system helps educators
                  create engaging courses, personalize learning experiences, and
                  drive better outcomes for students.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="px-6 text-base font-medium"
                  >
                    <Link href="/dashboard">
                      <span className="text-nowrap">Get Started</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="px-6 text-base font-medium"
                  >
                    <Link href="#features">
                      <span className="text-nowrap">See Features</span>
                    </Link>
                  </Button>
                </div>

                <div className="mt-8 hidden lg:block">
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>14-day free trial</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      <span>Cancel anytime</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 lg:mt-0 lg:w-1/2 relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/50 to-purple-500/50 opacity-30 blur-xl"></div>
                <div className="relative rounded-xl border bg-background/80 backdrop-blur-sm shadow-lg overflow-hidden">
                  <Image
                    className="w-full h-auto"
                    src="/landing.png"
                    alt="AI LMS Dashboard"
                    width={600}
                    height={400}
                    priority
                  />
                </div>

                {/* Floating elements for visual interest */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/30 blur-xl"></div>
                <div className="absolute -left-4 -bottom-4 h-32 w-32 rounded-full bg-purple-500/30 blur-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center md:flex-row md:justify-between">
              <div className="mb-6 md:mb-0 md:max-w-xs">
                <p className="text-center md:text-left font-medium">
                  Trusted by leading organizations
                </p>
              </div>
              <div className="relative w-full md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  <div className="flex">
                    <img
                      className="mx-auto h-8 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/nvidia.svg"
                      alt="Nvidia Logo"
                      height="32"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-7 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/column.svg"
                      alt="Column Logo"
                      height="28"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-7 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/github.svg"
                      alt="GitHub Logo"
                      height="28"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-8 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/nike.svg"
                      alt="Nike Logo"
                      height="32"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-8 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                      alt="Lemon Squeezy Logo"
                      height="32"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-7 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/laravel.svg"
                      alt="Laravel Logo"
                      height="28"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-9 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/lilly.svg"
                      alt="Lilly Logo"
                      height="36"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-8 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/openai.svg"
                      alt="OpenAI Logo"
                      height="32"
                      width="auto"
                    />
                  </div>
                </InfiniteSlider>

                <div className="bg-gradient-to-r from-muted/30 absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-gradient-to-l from-muted/30 absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
