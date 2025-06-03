"use client";

import React, { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ExternalLink, Github, Calendar, Users, Zap } from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const mockProjects = [
  {
    id: "1",
    title: "AI-Powered Code Review Assistant",
    description: "A VS Code extension that uses GPT-4 to provide intelligent code reviews and suggestions in real-time.",
    category: "TOOL_UTILITY",
    tags: ["VS Code", "GPT-4", "Code Review", "Developer Tools"],
    author: "Sarah Chen",
    submissionDate: "2024-01-15",
    demoUrl: "https://marketplace.visualstudio.com/items?itemName=ai-code-review",
    repoUrl: "https://github.com/sarahchen/ai-code-review",
    aiTools: ["GPT-4", "GitHub Copilot"],
    isWinner: false,
    isPeoplesChoice: true,
    votes: 127
  },
  {
    id: "2", 
    title: "VibeTunes - AI Music Composer",
    description: "Create personalized music tracks using AI that adapts to your mood and preferences. Built with Claude and custom ML models.",
    category: "CREATIVE",
    tags: ["Music", "AI", "Machine Learning", "Web App"],
    author: "Alex Rodriguez",
    submissionDate: "2024-01-12",
    demoUrl: "https://vibetunes.app",
    repoUrl: "https://github.com/alexr/vibetunes",
    aiTools: ["Claude", "Custom ML Models"],
    isWinner: true,
    isPeoplesChoice: false,
    votes: 89
  },
  {
    id: "3",
    title: "Smart Recipe Generator",
    description: "Input your available ingredients and dietary preferences, and AI will generate custom recipes with step-by-step instructions.",
    category: "WEB_APP",
    tags: ["Food", "Recipe", "AI", "React"],
    author: "Maria Santos",
    submissionDate: "2024-01-10",
    demoUrl: "https://smart-recipes.vercel.app",
    repoUrl: "https://github.com/mariasantos/smart-recipes",
    aiTools: ["ChatGPT", "Cursor"],
    isWinner: false,
    isPeoplesChoice: false,
    votes: 64
  }
];

const categories = [
  "All Categories",
  "WEB_APP",
  "MOBILE_APP", 
  "DESKTOP_APP",
  "GAME",
  "TOOL_UTILITY",
  "AI_ML",
  "CREATIVE",
  "EDUCATIONAL",
  "OPEN_SOURCE",
  "OTHER"
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All Categories");
  const [sortBy, setSortBy] = React.useState("newest");

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All Categories" || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      case "oldest":
        return new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime();
      case "popular":
        return b.votes - a.votes;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-gradient">Vibe Coding</span> Projects
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing projects built through human-AI collaboration. 
              See how developers are pushing the boundaries of what's possible.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {sortedProjects.length} of {mockProjects.length} projects
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map(project => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 line-clamp-2">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {project.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-1 ml-2">
                      {project.isWinner && (
                        <Badge variant="default" className="bg-yellow-500 text-white">
                          🏆 Winner
                        </Badge>
                      )}
                      {project.isPeoplesChoice && (
                        <Badge variant="secondary" className="bg-purple-500 text-white">
                          ❤️ People's Choice
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Category & Tags */}
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {project.category.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* AI Tools */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Zap className="h-4 w-4" />
                      <span>AI Tools: {project.aiTools.join(", ")}</span>
                    </div>

                    {/* Author & Date */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(project.submissionDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Votes */}
                    <div className="text-sm text-gray-600">
                      ❤️ {project.votes} votes
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="vibe" size="sm" className="flex-1" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Demo
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
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

          {/* Empty State */}
          {sortedProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button variant="vibe" asChild>
                <Link href="/submit">Submit Your Project</Link>
              </Button>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-12 p-8 bg-white rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to share your vibe coding project?
            </h2>
            <p className="text-gray-600 mb-6">
              Join the community and showcase your human-AI collaboration story.
            </p>
            <Button variant="electric" size="lg" asChild>
              <Link href="/submit">Submit Your Project</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 