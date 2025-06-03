import React from "react";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              <span className="block">Vibe Coding</span>
              <span className="block text-gradient">Award</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
              Celebrating excellence in AI-driven development and human-AI collaboration. 
              Discover, showcase, and celebrate the future of coding.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="vibe" size="lg" asChild>
                <Link href="/submit">Submit Your Project</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/about">
                  Learn about Vibe Coding <span aria-hidden="true">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What is Vibe Coding?
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              A revolutionary approach to software development where humans and AI collaborate 
              as creative partners in the coding process.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                    <span className="text-white font-bold">AI</span>
                  </div>
                  AI-Powered Development
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Leverage cutting-edge AI tools to generate, refine, and optimize code 
                    while maintaining creative control over the development process.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-600">
                    <span className="text-white font-bold">🤝</span>
                  </div>
                  Human-AI Collaboration
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Experience the perfect balance between human creativity and AI efficiency, 
                    where both contribute their unique strengths to the development process.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600">
                    <span className="text-white font-bold">⚡</span>
                  </div>
                  Rapid Innovation
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Build faster, iterate quicker, and bring ideas to life with unprecedented 
                    speed while maintaining high quality and innovative solutions.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to showcase your vibe coding project?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join the community of innovative developers pushing the boundaries of 
              human-AI collaboration in software development.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="electric" size="lg" asChild>
                <Link href="/submit">Get Started</Link>
              </Button>
              <Button variant="ghost" size="lg" className="text-white hover:text-gray-300" asChild>
                <Link href="/winners">
                  View Winners <span aria-hidden="true">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 