"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Users, 
  Zap, 
  Star, 
  Heart, 
  Trophy, 
  Award,
  Play,
  Download,
  Eye,
  ThumbsUp,
  ArrowLeft,
  Share2,
  Globe,
  Video,
  Camera,
  PieChart,
  BookOpen,
  Target,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  
  // Project showcase
  demoUrl?: string;
  videoUrl?: string;
  downloadUrl?: string;
  repoUrl?: string;
  
  // Vibe narrative
  vibeNarrative: string;
  
  // AI tools used
  aiTools: string[];
  
  // Code authorship breakdown
  aiGeneratedPercent: number;
  aiRefactoredPercent: number;
  humanWrittenPercent: number;
  
  // Learning and challenges
  learnings?: string;
  challenges?: string;
  
  // Media files
  screenshots: string[];
  media: Array<{
    id: string;
    type: 'IMAGE' | 'VIDEO';
    url: string;
    caption?: string;
    order: number;
  }>;
  
  // Metadata
  tags: string[];
  category?: string;
  
  // Status and workflow
  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'WINNER' | 'STANDOUT' | 'PEOPLES_CHOICE';
  
  // Submission period
  submissionMonth: number;
  submissionYear: number;
  
  // Results
  isWinner: boolean;
  isPeoplesChoice: boolean;
  isStandout: boolean;
  winnerType?: 'MONTHLY_WINNER' | 'PEOPLES_CHOICE' | 'STANDOUT';
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  
  // User and team
  user: {
    id: string;
    name?: string;
    username?: string;
    avatar?: string;
    website?: string;
    github?: string;
  };
  
  teamMembers: Array<{
    id: string;
    name: string;
    role?: string;
    email?: string;
    github?: string;
  }>;
  
  // Engagement
  votes: Array<{
    id: string;
    userId: string;
    user: {
      name?: string;
      username?: string;
    };
  }>;
  
  judgeScores: Array<{
    id: string;
    vibeProcessScore: number;
    originalityScore: number;
    executionScore: number;
    wowFactorScore: number;
    totalScore: number;
    comments?: string;
    user: {
      name?: string;
      username?: string;
    };
  }>;
  
  comments: Array<{
    id: string;
    content: string;
    createdAt: string;
    user: {
      name?: string;
      username?: string;
    };
  }>;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${params.id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("Project not found");
        } else {
          setError("Failed to load project");
        }
        return;
      }
      
      const data = await response.json();
      setProject(data);
      
      // Check if user has already voted
      if (session?.user?.id) {
        const userVote = data.votes?.find((vote: any) => vote.userId === session.user.id);
        setHasVoted(!!userVote);
      }
    } catch (err) {
      console.error("Error fetching project:", err);
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    
    if (hasVoted || isVoting) return;
    
    try {
      setIsVoting(true);
      const response = await fetch(`/api/projects/${params.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setHasVoted(true);
        // Refresh project data to get updated vote count
        fetchProject();
      } else {
        console.error("Failed to vote");
      }
    } catch (err) {
      console.error("Error voting:", err);
    } finally {
      setIsVoting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return <Badge variant="outline" className="bg-gray-100">📝 Draft</Badge>;
      case 'SUBMITTED':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">✅ Submitted</Badge>;
      case 'UNDER_REVIEW':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">⏳ Under Review</Badge>;
      case 'WINNER':
        return <Badge className="bg-yellow-500 text-white">🏆 Winner</Badge>;
      case 'STANDOUT':
        return <Badge className="bg-blue-500 text-white">⭐ Standout</Badge>;
      case 'PEOPLES_CHOICE':
        return <Badge className="bg-purple-500 text-white">❤️ People's Choice</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getWinnerBadges = () => {
    const badges = [];
    if (project?.isWinner) {
      badges.push(
        <Badge key="winner" className="bg-yellow-500 text-white">
          <Trophy className="h-3 w-3 mr-1" />
          Monthly Winner
        </Badge>
      );
    }
    if (project?.isPeoplesChoice) {
      badges.push(
        <Badge key="peoples" className="bg-purple-500 text-white">
          <Heart className="h-3 w-3 mr-1" />
          People's Choice
        </Badge>
      );
    }
    if (project?.isStandout) {
      badges.push(
        <Badge key="standout" className="bg-blue-500 text-white">
          <Star className="h-3 w-3 mr-1" />
          Standout Project
        </Badge>
      );
    }
    return badges;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {error || "Project not found"}
            </h1>
            <p className="text-gray-600 mb-6">
              The project you're looking for doesn't exist or isn't available.
            </p>
            <Button asChild>
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Combine screenshots and media for display
  const allMedia = [
    ...project.screenshots.map((url, index) => ({
      id: `screenshot-${index}`,
      type: 'IMAGE' as const,
      url,
      caption: `Screenshot ${index + 1}`,
      order: index
    })),
    ...project.media
  ].sort((a, b) => a.order - b.order);

  const averageScore = project.judgeScores.length > 0 
    ? project.judgeScores.reduce((acc, score) => acc + score.totalScore, 0) / project.judgeScores.length 
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section / Cover */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
                <Link href="/projects">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Projects
                </Link>
              </Button>
            </div>
            
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {getStatusBadge(project.status)}
                {getWinnerBadges()}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {project.title}
              </h1>
              
              <p className="text-xl text-blue-100 mb-6 leading-relaxed">
                {project.description}
              </p>
            </div>
            
            {/* Author and Date */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-blue-100">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>By {project.user.name || project.user.username}</span>
              </div>
              
              {project.submittedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Submitted {new Date(project.submittedAt).toLocaleDateString()}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>{project.votes.length} votes</span>
              </div>
              
              {averageScore && (
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>{averageScore.toFixed(1)}/100 score</span>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {project.demoUrl && (
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
              
              {project.repoUrl && (
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 mr-2" />
                    Source Code
                  </a>
                </Button>
              )}
              
              {project.videoUrl && (
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                  <a href={project.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Play className="h-5 w-5 mr-2" />
                    Watch Video
                  </a>
                </Button>
              )}
              
              {project.downloadUrl && (
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                  <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-5 w-5 mr-2" />
                    Download
                  </a>
                </Button>
              )}
              
              <Button
                size="lg"
                variant="outline"
                className={`border-white hover:bg-white hover:text-blue-600 ${
                  hasVoted ? 'bg-white text-blue-600' : 'text-white'
                }`}
                onClick={handleVote}
                disabled={isVoting || hasVoted}
              >
                <ThumbsUp className={`h-5 w-5 mr-2 ${hasVoted ? 'fill-current' : ''}`} />
                {hasVoted ? 'Voted' : 'Vote'}
              </Button>
              
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="narrative" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="narrative">Vibe Story</TabsTrigger>
                      <TabsTrigger value="technical">Technical</TabsTrigger>
                      <TabsTrigger value="learning">Learning</TabsTrigger>
                      <TabsTrigger value="team">Team</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="narrative" className="mt-6">
                      <div className="prose prose-sm max-w-none">
                        <h3 className="text-lg font-semibold mb-3">The Vibe Coding Story</h3>
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                          {project.vibeNarrative}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="technical" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            AI Tools Used
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {project.aiTools.map((tool, index) => (
                              <Badge key={index} variant="secondary" className="text-sm">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <PieChart className="h-5 w-5" />
                            Code Authorship Breakdown
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">AI Generated</span>
                              <span className="text-sm font-semibold">{project.aiGeneratedPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${project.aiGeneratedPercent}%` }}
                              ></div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">AI Refactored</span>
                              <span className="text-sm font-semibold">{project.aiRefactoredPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full" 
                                style={{ width: `${project.aiRefactoredPercent}%` }}
                              ></div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Human Written</span>
                              <span className="text-sm font-semibold">{project.humanWrittenPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${project.humanWrittenPercent}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Technologies & Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {project.category && (
                              <Badge variant="outline" className="border-blue-300 text-blue-700">
                                {project.category.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                              </Badge>
                            )}
                            {project.tags.map((tag, index) => (
                              <Badge key={index} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="learning" className="mt-6">
                      <div className="space-y-6">
                        {project.learnings && (
                          <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                              <Target className="h-5 w-5" />
                              Key Learnings
                            </h3>
                            <div className="prose prose-sm max-w-none">
                              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                {project.learnings}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {project.challenges && (
                          <div>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                              <AlertCircle className="h-5 w-5" />
                              Challenges & Solutions
                            </h3>
                            <div className="prose prose-sm max-w-none">
                              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                {project.challenges}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {!project.learnings && !project.challenges && (
                          <div className="text-center py-8 text-gray-500">
                            <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>No learning details shared for this project.</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="team" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Project Creator</h3>
                          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {(project.user.name || project.user.username || 'U')[0].toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{project.user.name || project.user.username}</div>
                              {project.user.username && project.user.name && (
                                <div className="text-sm text-gray-600">@{project.user.username}</div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              {project.user.website && (
                                <Button size="sm" variant="outline" asChild>
                                  <a href={project.user.website} target="_blank" rel="noopener noreferrer">
                                    <Globe className="h-4 w-4" />
                                  </a>
                                </Button>
                              )}
                              {project.user.github && (
                                <Button size="sm" variant="outline" asChild>
                                  <a href={`https://github.com/${project.user.github}`} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {project.teamMembers.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold mb-3">Team Members</h3>
                            <div className="space-y-3">
                              {project.teamMembers.map((member) => (
                                <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                    {member.name[0].toUpperCase()}
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium">{member.name}</div>
                                    {member.role && (
                                      <div className="text-sm text-gray-600">{member.role}</div>
                                    )}
                                  </div>
                                  {member.github && (
                                    <Button size="sm" variant="outline" asChild>
                                      <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer">
                                        <Github className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Media Gallery */}
              {allMedia.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Project Gallery
                    </CardTitle>
                    <CardDescription>
                      Visual showcase of the project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Main Display */}
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        {allMedia[selectedMediaIndex]?.type === 'VIDEO' ? (
                          <video 
                            src={allMedia[selectedMediaIndex].url} 
                            controls 
                            className="w-full h-full object-cover"
                            poster=""
                          />
                        ) : (
                          <img 
                            src={allMedia[selectedMediaIndex]?.url} 
                            alt={allMedia[selectedMediaIndex]?.caption || 'Project media'}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      {/* Caption */}
                      {allMedia[selectedMediaIndex]?.caption && (
                        <p className="text-sm text-gray-600 text-center">
                          {allMedia[selectedMediaIndex].caption}
                        </p>
                      )}
                      
                      {/* Thumbnails */}
                      {allMedia.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {allMedia.map((media, index) => (
                            <button
                              key={media.id}
                              onClick={() => setSelectedMediaIndex(index)}
                              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                index === selectedMediaIndex ? 'border-blue-500' : 'border-gray-200'
                              }`}
                            >
                              {media.type === 'VIDEO' ? (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <Video className="h-6 w-6 text-gray-500" />
                                </div>
                              ) : (
                                <img 
                                  src={media.url} 
                                  alt={media.caption || `Media ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm">
                        <Heart className="h-4 w-4" />
                        Votes
                      </span>
                      <span className="font-semibold">{project.votes.length}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm">
                        <Eye className="h-4 w-4" />
                        Status
                      </span>
                      <span className="text-sm">{getStatusBadge(project.status)}</span>
                    </div>
                    
                    {averageScore && (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm">
                          <Award className="h-4 w-4" />
                          Judge Score
                        </span>
                        <span className="font-semibold">{averageScore.toFixed(1)}/100</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        Submission
                      </span>
                      <span className="text-sm">
                        {new Date(project.submissionYear, project.submissionMonth - 1).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Judge Scores */}
              {project.judgeScores.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Judge Evaluations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.judgeScores.map((score) => (
                        <div key={score.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              {score.user.name || score.user.username || 'Anonymous Judge'}
                            </span>
                            <span className="font-semibold text-lg">
                              {score.totalScore.toFixed(1)}/100
                            </span>
                          </div>
                          
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span>Vibe Process:</span>
                              <span>{score.vibeProcessScore}/100</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Originality:</span>
                              <span>{score.originalityScore}/100</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Execution:</span>
                              <span>{score.executionScore}/100</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Wow Factor:</span>
                              <span>{score.wowFactorScore}/100</span>
                            </div>
                          </div>
                          
                          {score.comments && (
                            <div className="mt-2 p-2 bg-white rounded text-xs">
                              <p className="text-gray-700">{score.comments}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Recent Voters */}
              {project.votes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Supporters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {project.votes.slice(0, 5).map((vote) => (
                        <div key={vote.id} className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                            {(vote.user.name || vote.user.username || 'U')[0].toUpperCase()}
                          </div>
                          <span className="text-sm">
                            {vote.user.name || vote.user.username || 'Anonymous'}
                          </span>
                        </div>
                      ))}
                      {project.votes.length > 5 && (
                        <div className="text-xs text-gray-500 mt-2">
                          +{project.votes.length - 5} more supporters
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Related Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      className="w-full"
                      onClick={handleVote}
                      disabled={hasVoted || isVoting}
                      variant={hasVoted ? "outline" : "default"}
                    >
                      <ThumbsUp className={`h-4 w-4 mr-2 ${hasVoted ? 'fill-current' : ''}`} />
                      {hasVoted ? 'You voted for this!' : 'Vote for this project'}
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Project
                    </Button>
                    
                    {session?.user?.id === project.user.id && (
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/projects/${project.id}/edit`}>
                          Edit Project
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 