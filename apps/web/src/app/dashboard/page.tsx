"use client";

import React, { useState, useEffect } from "react";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Trophy, 
  Heart, 
  Calendar, 
  ExternalLink, 
  Github, 
  Edit, 
  Trash2,
  Plus,
  BarChart3,
  Settings
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// Mock data - in real app this would come from API
const mockUserData = {
  profile: {
    name: "Sarah Chen",
    username: "sarahchen",
    email: "sarah@example.com",
    joinedAt: "2023-12-01",
    bio: "Full-stack developer passionate about AI-human collaboration",
    location: "San Francisco, CA",
    website: "https://sarahchen.dev",
    github: "sarahchen"
  },
  stats: {
    projectsSubmitted: 3,
    totalVotes: 127,
    monthlyWins: 0,
    peoplesChoiceWins: 1,
    standoutProjects: 2
  },
  projects: [
    {
      id: "1",
      title: "AI-Powered Code Review Assistant",
      description: "A VS Code extension that uses GPT-4 to provide intelligent code reviews and suggestions in real-time.",
      status: "SUBMITTED",
      submittedAt: "2024-01-15",
      category: "TOOL_UTILITY",
      votes: 127,
      isWinner: false,
      isPeoplesChoice: true,
      demoUrl: "https://marketplace.visualstudio.com/items?itemName=ai-code-review",
      repoUrl: "https://github.com/sarahchen/ai-code-review"
    },
    {
      id: "2",
      title: "Smart Recipe Generator",
      description: "Input your available ingredients and dietary preferences, and AI will generate custom recipes.",
      status: "DRAFT",
      submittedAt: null,
      category: "WEB_APP",
      votes: 0,
      isWinner: false,
      isPeoplesChoice: false,
      demoUrl: null,
      repoUrl: "https://github.com/sarahchen/smart-recipes"
    }
  ],
  votingHistory: [
    {
      id: "v1",
      projectTitle: "VibeTunes - AI Music Composer",
      projectAuthor: "Alex Rodriguez",
      votedAt: "2024-01-20",
      month: 1,
      year: 2024
    },
    {
      id: "v2",
      projectTitle: "CodeMentor AI",
      projectAuthor: "Jennifer Liu",
      votedAt: "2023-12-28",
      month: 12,
      year: 2023
    }
  ]
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(mockUserData);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">Please sign in to access your dashboard.</p>
            <Button variant="vibe" asChild>
              <Link href={"/auth/signin" as any}>Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userData.profile.name}!
            </h1>
            <p className="text-gray-600">
              Manage your projects, track your votes, and see your impact in the vibe coding community.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{userData.stats.projectsSubmitted}</div>
                <div className="text-sm text-gray-600">Projects</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{userData.stats.totalVotes}</div>
                <div className="text-sm text-gray-600">Total Votes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{userData.stats.monthlyWins}</div>
                <div className="text-sm text-gray-600">Monthly Wins</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-pink-600">{userData.stats.peoplesChoiceWins}</div>
                <div className="text-sm text-gray-600">People's Choice</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{userData.stats.standoutProjects}</div>
                <div className="text-sm text-gray-600">Standouts</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="projects">My Projects</TabsTrigger>
              <TabsTrigger value="voting">Voting History</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
                  <Button variant="vibe" asChild>
                    <Link href="/submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Submit New Project
                    </Link>
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {userData.projects.map(project => (
                    <Card key={project.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <CardDescription className="mt-2">{project.description}</CardDescription>
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
                            <Badge variant="outline">
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>Category: {project.category?.replace('_', ' ')}</span>
                            <span>❤️ {project.votes} votes</span>
                          </div>
                          
                          {project.submittedAt && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>Submitted: {new Date(project.submittedAt).toLocaleDateString()}</span>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            {project.demoUrl && (
                              <Button variant="vibe" size="sm" asChild>
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Demo
                                </a>
                              </Button>
                            )}
                            {project.repoUrl && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Voting History Tab */}
            <TabsContent value="voting">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Voting History</h2>
                
                <div className="space-y-4">
                  {userData.votingHistory.map(vote => (
                    <Card key={vote.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{vote.projectTitle}</h3>
                            <p className="text-sm text-gray-600">by {vote.projectAuthor}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              {new Date(vote.votedAt).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(vote.year, vote.month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Project Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userData.projects.filter(p => p.status === 'SUBMITTED').map(project => (
                          <div key={project.id} className="flex justify-between items-center">
                            <span className="text-sm font-medium">{project.title}</span>
                            <span className="text-sm text-gray-600">{project.votes} votes</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-gray-500">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Analytics charts coming soon!</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <div className="text-gray-900">{userData.profile.name}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                          <div className="text-gray-900">@{userData.profile.username}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <div className="text-gray-900">{userData.profile.email}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <div className="text-gray-900">{userData.profile.location}</div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <div className="text-gray-900">{userData.profile.bio}</div>
                      </div>
                      
                      <div className="flex gap-4 pt-4">
                        <Button variant="vibe">
                          <Settings className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                        <Button variant="outline">
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 