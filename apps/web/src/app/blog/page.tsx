"use client";

import React from "react";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, BookOpen, PenTool } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-gradient">Vibe Coding</span> Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Insights, tutorials, and stories from the human-AI collaboration community.
            </p>
          </div>

          {/* Coming Soon */}
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <BookOpen className="h-24 w-24 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog Coming Soon</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              We're working on bringing you insightful articles, tutorials, and stories 
              about human-AI collaboration in software development. Stay tuned!
            </p>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="vibe" asChild>
                  <Link href="/projects">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Explore Projects
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/submit">
                    <PenTool className="h-4 w-4 mr-2" />
                    Submit Your Project
                  </Link>
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 mt-6">
                Have an idea for a blog post? We'd love to hear from you!
              </p>
            </div>
          </div>

          {/* What to Expect */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">What to Expect</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tutorials & Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Step-by-step guides on effective human-AI collaboration techniques 
                    and best practices for vibe coding.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Case Studies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Deep dives into winning projects, exploring the collaboration 
                    process and lessons learned.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Stories from developers about their journey with AI tools 
                    and the future of software development.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 