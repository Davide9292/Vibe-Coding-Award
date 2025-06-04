"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Heart, Star, Calendar, Users, Zap, ExternalLink, Github } from "lucide-react";
import Link from "next/link";

interface WinnerProject {
  id: string;
  title: string;
  description: string;
  author: string;
  demoUrl?: string;
  repoUrl?: string;
  aiTools: string[];
  score?: number;
  votes?: number;
  tags: string[];
}

interface MonthlyWinners {
  id: string;
  month: string;
  year: number;
  winner?: WinnerProject;
  peoplesChoice?: WinnerProject;
  standouts: WinnerProject[];
}

export default function WinnersPage() {
  const [winners, setWinners] = useState<MonthlyWinners[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/winners');
      
      if (!response.ok) {
        throw new Error('Failed to fetch winners');
      }
      
      const data = await response.json();
      setWinners(data.winners || []);
    } catch (err) {
      console.error('Error fetching winners:', err);
      setError('Failed to load winners');
    } finally {
      setLoading(false);
    }
  };

  const WinnerCard = ({ project, type }: { project: WinnerProject; type: 'winner' | 'peoples-choice' | 'standout' }) => (
    <Card className="hover:shadow-lg transition-shadow">
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
          <div className="ml-2">
            {type === 'winner' && (
              <Badge className="bg-yellow-500 text-white">
                <Trophy className="h-3 w-3 mr-1" />
                Winner
              </Badge>
            )}
            {type === 'peoples-choice' && (
              <Badge className="bg-purple-500 text-white">
                <Heart className="h-3 w-3 mr-1" />
                People's Choice
              </Badge>
            )}
            {type === 'standout' && (
              <Badge className="bg-blue-500 text-white">
                <Star className="h-3 w-3 mr-1" />
                Standout
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Author */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>by {project.author}</span>
          </div>

          {/* Score/Votes */}
          {project.score && (
            <div className="text-sm text-gray-600">
              📊 Judge Score: {project.score}/100
            </div>
          )}
          {project.votes && (
            <div className="text-sm text-gray-600">
              ❤️ {project.votes} votes
            </div>
          )}

          {/* AI Tools */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Zap className="h-4 w-4" />
            <span>AI Tools: {project.aiTools.join(", ")}</span>
          </div>

          {/* Tags */}
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

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="vibe" size="sm" className="flex-1" asChild>
              <Link href={`/projects/${project.id}`}>
                View Project
              </Link>
            </Button>
            {project.demoUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
              Celebrating the most innovative and inspiring human-AI collaboration projects. 
              Discover what makes these submissions stand out from the crowd.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchWinners}>Try Again</Button>
            </div>
          )}

          {/* Winners by Month */}
          {!loading && !error && (
            <div className="space-y-12">
              {winners.length === 0 ? (
                <div className="text-center py-12">
                  <Trophy className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No winners announced yet</h3>
                  <p className="text-gray-600 mb-6">
                    Winners will be announced at the end of each month. Stay tuned!
                  </p>
                  <Button variant="vibe" asChild>
                    <Link href="/submit">Submit Your Project</Link>
                  </Button>
                </div>
              ) : (
                winners.map(monthData => (
                  <div key={monthData.id} className="space-y-8">
                    {/* Month Header */}
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {monthData.month} {monthData.year}
                      </h2>
                      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Monthly Winner */}
                    {monthData.winner && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Trophy className="h-6 w-6 text-yellow-500" />
                          <h3 className="text-xl font-semibold text-gray-900">Monthly Winner</h3>
                        </div>
                        <WinnerCard project={monthData.winner} type="winner" />
                      </div>
                    )}

                    {/* People's Choice */}
                    {monthData.peoplesChoice && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Heart className="h-6 w-6 text-purple-500" />
                          <h3 className="text-xl font-semibold text-gray-900">People's Choice</h3>
                        </div>
                        <WinnerCard project={monthData.peoplesChoice} type="peoples-choice" />
                      </div>
                    )}

                    {/* Standout Projects */}
                    {monthData.standouts.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Star className="h-6 w-6 text-blue-500" />
                          <h3 className="text-xl font-semibold text-gray-900">
                            Standout Projects ({monthData.standouts.length})
                          </h3>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {monthData.standouts.map(project => (
                            <WinnerCard key={project.id} project={project} type="standout" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 bg-white rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Want to be featured as a winner?
            </h2>
            <p className="text-gray-600 mb-6">
              Submit your human-AI collaboration project and showcase your innovation to the community.
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