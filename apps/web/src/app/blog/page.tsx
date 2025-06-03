"use client";

import React from "react";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock blog posts
const mockPosts = [
  {
    id: "1",
    title: "The Future of Human-AI Collaboration in Software Development",
    excerpt: "Exploring how the relationship between developers and AI tools is evolving beyond simple code generation to true creative partnership.",
    content: "As we stand at the intersection of human creativity and artificial intelligence, a new paradigm is emerging in software development...",
    author: "Sarah Chen",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    category: "Insights",
    tags: ["AI", "Collaboration", "Future", "Development"],
    featured: true,
    coverImage: "/blog/ai-collaboration.jpg"
  },
  {
    id: "2",
    title: "Building VibeTunes: A Journey of AI-Powered Music Creation",
    excerpt: "How we used Claude and custom ML models to create an AI music composer that adapts to your mood and preferences.",
    content: "When we set out to build VibeTunes, we knew we wanted to create something that went beyond simple music generation...",
    author: "Alex Rodriguez",
    publishedAt: "2024-01-12",
    readTime: "6 min read",
    category: "Case Study",
    tags: ["Music", "AI", "Case Study", "Creative"],
    featured: false,
    coverImage: "/blog/vibetunes.jpg"
  },
  {
    id: "3",
    title: "Best Practices for Documenting Your Vibe Coding Process",
    excerpt: "Learn how to effectively document your human-AI collaboration workflow to maximize learning and improve future projects.",
    content: "One of the most valuable aspects of vibe coding is the learning that happens through the collaboration process...",
    author: "Maria Santos",
    publishedAt: "2024-01-10",
    readTime: "5 min read",
    category: "Tutorial",
    tags: ["Documentation", "Best Practices", "Learning"],
    featured: false,
    coverImage: "/blog/documentation.jpg"
  },
  {
    id: "4",
    title: "The Ethics of AI-Assisted Development",
    excerpt: "Examining the ethical considerations and responsibilities that come with using AI tools in software development.",
    content: "As AI tools become more sophisticated and prevalent in software development, we must carefully consider the ethical implications...",
    author: "Dr. Jennifer Liu",
    publishedAt: "2024-01-08",
    readTime: "10 min read",
    category: "Ethics",
    tags: ["Ethics", "AI", "Responsibility", "Philosophy"],
    featured: false,
    coverImage: "/blog/ethics.jpg"
  },
  {
    id: "5",
    title: "From Idea to Implementation: Rapid Prototyping with AI",
    excerpt: "How AI tools can accelerate the journey from concept to working prototype, enabling faster iteration and experimentation.",
    content: "The traditional software development cycle often involves lengthy planning phases and slow iteration cycles...",
    author: "David Kim",
    publishedAt: "2024-01-05",
    readTime: "7 min read",
    category: "Tutorial",
    tags: ["Prototyping", "AI", "Development", "Speed"],
    featured: false,
    coverImage: "/blog/prototyping.jpg"
  }
];

const categories = ["All", "Insights", "Case Study", "Tutorial", "Ethics"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  
  const filteredPosts = selectedCategory === "All" 
    ? mockPosts 
    : mockPosts.filter(post => post.category === selectedCategory);

  const featuredPost = mockPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-gradient">Vibe Coding</span> Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Insights, tutorials, and stories from the world of human-AI collaboration in software development.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <Card className="mb-12 overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-8">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">✨</div>
                    <p className="text-lg font-semibold">Featured Article</p>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="default" className="bg-blue-600 text-white">
                      {featuredPost.category}
                    </Badge>
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <Button variant="vibe" asChild>
                      <Link href={`/blog/${featuredPost.id}` as any}>
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "vibe" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map(post => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/blog/${post.id}` as any}>
                        Read Article <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <div className="text-6xl">📝</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">
                No articles match the selected category. Try selecting a different category.
              </p>
              <Button variant="vibe" onClick={() => setSelectedCategory("All")}>
                View All Articles
              </Button>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-6 opacity-90">
              Get the latest insights on vibe coding and human-AI collaboration delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 