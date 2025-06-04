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

interface UserProfile {
  name?: string;
  username?: string;
  email?: string;
  joinedAt: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
}

interface UserStats {
  projectsSubmitted: number;
  totalVotes: number;
  monthlyWins: number;
  peoplesChoiceWins: number;
  standoutProjects: number;
}

interface UserProject {
  id: string;
  title: string;
  description: string;
  status: string;
  submittedAt?: string;
  category?: string;
  votes: number;
  isWinner: boolean;
  isPeoplesChoice: boolean;
  demoUrl?: string;
  repoUrl?: string;
}

interface VoteHistoryItem {
  id: string;
  projectTitle: string;
  projectAuthor: string;
  votedAt: string;
  month: number;
  year: number;
}

interface UserData {
  profile: UserProfile;
  stats: UserStats;
  projects: UserProject[];
  votingHistory: VoteHistoryItem[];
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserData();
    } else if (status !== "loading") {
      setLoading(false);
    }
  }, [session, status]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/dashboard');
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your dashboard</h1>
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'Failed to load dashboard'}</p>
            <Button onClick={fetchUserData}>Try Again</Button>
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
              Welcome back, {userData.profile.name || userData.profile.username || 'Developer'}!
            </h1>
            <p className="text-gray-600">
              Manage your projects and track your vibe coding journey.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">{userData.stats.projectsSubmitted}</div>
                <div className="text-sm text-gray-600">Projects Submitted</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">{userData.stats.totalVotes}</div>
                <div className="text-sm text-gray-600">Total Votes</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-yellow-600">{userData.stats.monthlyWins}</div>
                <div className="text-sm text-gray-600">Monthly Wins</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-pink-600">{userData.stats.peoplesChoiceWins}</div>
                <div className="text-sm text-gray-600">People's Choice</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">{userData.stats.standoutProjects}</div>
                <div className="text-sm text-gray-600">Standout Projects</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Projects Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Your Projects ({userData.projects.length})
                    </CardTitle>
                    <Button asChild>
                      <Link href="/submit">
                        <Plus className="h-4 w-4 mr-1" />
                        New Project
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {userData.projects.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You haven't submitted any projects yet.</p>
                      <Button asChild>
                        <Link href="/submit">Submit Your First Project</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userData.projects.map(project => (
                        <Card key={project.id}>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-lg">{project.title}</CardTitle>
                                <CardDescription className="line-clamp-2">
                                  {project.description}
                                </CardDescription>
                              </div>
                              <div className="flex flex-col gap-1 ml-4">
                                <Badge variant={
                                  project.status === 'SUBMITTED' ? 'default' : 
                                  project.status === 'DRAFT' ? 'outline' : 'secondary'
                                }>
                                  {project.status}
                                </Badge>
                                {project.isWinner && (
                                  <Badge className="bg-yellow-500 text-white">
                                    🏆 Winner
                                  </Badge>
                                )}
                                {project.isPeoplesChoice && (
                                  <Badge className="bg-purple-500 text-white">
                                    ❤️ People's Choice
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between text-sm text-gray-600">
                                {project.category && (
                                  <span>Category: {project.category.replace('_', ' ')}</span>
                                )}
                                <span>❤️ {project.votes} votes</span>
                              </div>
                              
                              {project.submittedAt && (
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Calendar className="h-4 w-4" />
                                  <span>Submitted: {new Date(project.submittedAt).toLocaleDateString()}</span>
                                </div>
                              )}
                              
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1" asChild>
                                  <Link href={`/projects/${project.id}/edit` as any}>
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                  </Link>
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
                  )}
                </CardContent>
              </Card>

              {/* Voting History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Recent Votes ({userData.votingHistory.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userData.votingHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">You haven't voted for any projects yet.</p>
                      <Button asChild>
                        <Link href="/projects">Explore Projects</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {userData.votingHistory.slice(0, 5).map(vote => (
                        <div key={vote.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{vote.projectTitle}</div>
                            <div className="text-sm text-gray-600">by {vote.projectAuthor}</div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(vote.votedAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                      {userData.votingHistory.length > 5 && (
                        <div className="text-sm text-gray-500 text-center pt-2">
                          +{userData.votingHistory.length - 5} more votes
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                      {(userData.profile.name || userData.profile.username || 'U')[0].toUpperCase()}
                    </div>
                    <h3 className="font-semibold">
                      {userData.profile.name || userData.profile.username || 'Developer'}
                    </h3>
                    <p className="text-sm text-gray-600">{userData.profile.email}</p>
                  </div>
                  
                  {userData.profile.bio && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Bio</label>
                      <p className="text-sm text-gray-600 mt-1">{userData.profile.bio}</p>
                    </div>
                  )}
                  
                  {userData.profile.location && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <p className="text-sm text-gray-600 mt-1">{userData.profile.location}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Joined</label>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(userData.profile.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    {userData.profile.website && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={userData.profile.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {userData.profile.github && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={`https://github.com/${userData.profile.github}`} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-1" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link href="/submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Submit New Project
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/projects">
                      <Heart className="h-4 w-4 mr-2" />
                      Browse & Vote
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/winners">
                      <Trophy className="h-4 w-4 mr-2" />
                      View Winners
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 