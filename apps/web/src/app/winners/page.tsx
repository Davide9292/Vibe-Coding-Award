"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Heart, Star, Calendar, Users, Zap, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const mockWinners = [
  {
    id: "1",
    month: "January",
    year: 2024,
    winner: {
      id: "w1",
      title: "VibeTunes - AI Music Composer",
      description: "Create personalized music tracks using AI that adapts to your mood and preferences. Built with Claude and custom ML models.",
      author: "Alex Rodriguez",
      demoUrl: "https://vibetunes.app",
      repoUrl: "https://github.com/alexr/vibetunes",
      aiTools: ["Claude", "Custom ML Models"],
      score: 92,
      tags: ["Music", "AI", "Machine Learning", "Web App"]
    },
    peoplesChoice: {
      id: "p1",
      title: "AI-Powered Code Review Assistant",
      description: "A VS Code extension that uses GPT-4 to provide intelligent code reviews and suggestions in real-time.",
      author: "Sarah Chen",
      demoUrl: "https://marketplace.visualstudio.com/items?itemName=ai-code-review",
      repoUrl: "https://github.com/sarahchen/ai-code-review",
      aiTools: ["GPT-4", "GitHub Copilot"],
      votes: 127,
      tags: ["VS Code", "GPT-4", "Code Review", "Developer Tools"]
    },
    standouts: [
      {
        id: "s1",
        title: "Smart Recipe Generator",
        description: "Input your available ingredients and dietary preferences, and AI will generate custom recipes with step-by-step instructions.",
        author: "Maria Santos",
        demoUrl: "https://smart-recipes.vercel.app",
        repoUrl: "https://github.com/mariasantos/smart-recipes",
        aiTools: ["ChatGPT", "Cursor"],
        tags: ["Food", "Recipe", "AI", "React"]
      },
      {
        id: "s2",
        title: "AI Study Buddy",
        description: "An intelligent tutoring system that adapts to your learning style and provides personalized study plans.",
        author: "David Kim",
        demoUrl: "https://ai-study-buddy.com",
        repoUrl: "https://github.com/davidkim/ai-study-buddy",
        aiTools: ["OpenAI API", "Langchain"],
        tags: ["Education", "AI", "Learning", "Tutoring"]
      }
    ]
  },
  {
    id: "2",
    month: "December",
    year: 2023,
    winner: {
      id: "w2",
      title: "CodeMentor AI",
      description: "An AI-powered coding mentor that provides real-time guidance, code reviews, and learning paths for developers.",
      author: "Jennifer Liu",
      demoUrl: "https://codementor-ai.dev",
      repoUrl: "https://github.com/jenniferliu/codementor-ai",
      aiTools: ["GPT-4", "Claude", "Custom Fine-tuning"],
      score: 89,
      tags: ["Education", "Coding", "Mentorship", "AI"]
    },
    peoplesChoice: {
      id: "p2",
      title: "AI Art Gallery",
      description: "A collaborative platform where humans and AI create art together, blending creativity with machine learning.",
      author: "Carlos Mendez",
      demoUrl: "https://ai-art-gallery.com",
      repoUrl: "https://github.com/carlosmendez/ai-art-gallery",
      aiTools: ["DALL-E", "Midjourney", "Stable Diffusion"],
      votes: 156,
      tags: ["Art", "Creativity", "AI", "Collaboration"]
    },
    standouts: [
      {
        id: "s3",
        title: "Smart Home Assistant",
        description: "An intelligent home automation system that learns your preferences and optimizes energy usage.",
        author: "Emma Thompson",
        demoUrl: "https://smart-home-ai.com",
        repoUrl: "https://github.com/emmathompson/smart-home-ai",
        aiTools: ["TensorFlow", "Custom ML Models"],
        tags: ["IoT", "Smart Home", "AI", "Energy"]
      }
    ]
  }
];

export default function WinnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-gradient">Vibe Coding</span> Winners
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Celebrating the most innovative projects that showcase the power of human-AI collaboration.
            </p>
          </div>

          {/* Winners Timeline */}
          <div className="space-y-12">
            {mockWinners.map((cycle, index) => (
              <div key={cycle.id} className="relative">
                {/* Timeline Line */}
                {index < mockWinners.length - 1 && (
                  <div className="absolute left-8 top-24 w-0.5 h-full bg-gradient-to-b from-blue-200 to-purple-200 -z-10" />
                )}
                
                {/* Month Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-lg">
                    {cycle.month.slice(0, 3)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{cycle.month} {cycle.year}</h2>
                    <p className="text-gray-600">Monthly Award Winners</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 ml-20">
                  {/* Monthly Winner */}
                  <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="h-6 w-6 text-yellow-600" />
                        <Badge variant="default" className="bg-yellow-600 text-white">
                          Monthly Winner
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{cycle.winner.title}</CardTitle>
                      <CardDescription>{cycle.winner.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span>{cycle.winner.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-semibold">{cycle.winner.score}/100</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Zap className="h-4 w-4" />
                          <span>AI Tools: {cycle.winner.aiTools.join(", ")}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {cycle.winner.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button variant="vibe" size="sm" className="flex-1" asChild>
                            <a href={cycle.winner.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Demo
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={cycle.winner.repoUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* People's Choice */}
                  <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="h-6 w-6 text-purple-600" />
                        <Badge variant="default" className="bg-purple-600 text-white">
                          People's Choice
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{cycle.peoplesChoice.title}</CardTitle>
                      <CardDescription>{cycle.peoplesChoice.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span>{cycle.peoplesChoice.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-purple-500" />
                            <span className="font-semibold">{cycle.peoplesChoice.votes} votes</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Zap className="h-4 w-4" />
                          <span>AI Tools: {cycle.peoplesChoice.aiTools.join(", ")}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {cycle.peoplesChoice.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button variant="electric" size="sm" className="flex-1" asChild>
                            <a href={cycle.peoplesChoice.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Demo
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={cycle.peoplesChoice.repoUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Standout Projects */}
                {cycle.standouts.length > 0 && (
                  <div className="ml-20 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Star className="h-5 w-5 text-blue-600" />
                      Standout Projects
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {cycle.standouts.map(project => (
                        <Card key={project.id} className="border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <CardDescription className="text-sm">{project.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center gap-1 text-sm">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span>{project.author}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Zap className="h-4 w-4" />
                                <span>AI Tools: {project.aiTools.join(", ")}</span>
                              </div>
                              
                              <div className="flex flex-wrap gap-1">
                                {project.tags.slice(0, 3).map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex gap-2 pt-1">
                                <Button variant="outline" size="sm" className="flex-1" asChild>
                                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    Demo
                                  </a>
                                </Button>
                                <Button variant="ghost" size="sm" asChild>
                                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4" />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Want to be the next winner?</h2>
            <p className="text-lg mb-6 opacity-90">
              Submit your vibe coding project and join the ranks of innovative developers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/submit">Submit Your Project</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="/projects">Browse Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 