import React from "react";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Heart, Lightbulb, Users, Zap, Award, Target } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About the <span className="text-gradient">Vibe Coding Award</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Celebrating the future of software development where humans and AI collaborate 
              as creative partners to build extraordinary digital experiences.
            </p>
          </div>

          {/* What is Vibe Coding */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Zap className="h-8 w-8 text-blue-600" />
                What is Vibe Coding?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Vibe Coding represents a revolutionary approach to software development where the traditional 
                boundaries between human creativity and artificial intelligence dissolve. It's not about 
                replacing developers—it's about amplifying human potential through intelligent collaboration.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    Human Creativity
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Vision and conceptual thinking</li>
                    <li>• User experience intuition</li>
                    <li>• Creative problem-solving</li>
                    <li>• Strategic decision-making</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-600" />
                    AI Assistance
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Rapid code generation</li>
                    <li>• Pattern recognition</li>
                    <li>• Optimization suggestions</li>
                    <li>• Documentation and testing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The Philosophy */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Heart className="h-8 w-8 text-red-500" />
                Our Philosophy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Collaboration Over Competition</h3>
                  <p className="text-gray-600 text-sm">
                    AI is not here to replace developers but to enhance their capabilities and creativity.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Lightbulb className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Innovation Through Partnership</h3>
                  <p className="text-gray-600 text-sm">
                    The most groundbreaking solutions emerge when human intuition meets AI efficiency.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Purpose-Driven Development</h3>
                  <p className="text-gray-600 text-sm">
                    Technology should serve humanity, solving real problems and creating meaningful impact.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Award Criteria */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Award className="h-8 w-8 text-yellow-600" />
                What We Look For
              </CardTitle>
              <CardDescription>
                Projects are evaluated based on these key criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Badge variant="default" className="bg-blue-600 text-white min-w-fit">40%</Badge>
                  <div>
                    <h3 className="font-semibold mb-2">Vibe Process Excellence</h3>
                    <p className="text-gray-600">
                      How effectively did you collaborate with AI? We look for thoughtful integration 
                      of AI tools, clear documentation of the human-AI workflow, and innovative 
                      approaches to leveraging AI capabilities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Badge variant="default" className="bg-purple-600 text-white min-w-fit">25%</Badge>
                  <div>
                    <h3 className="font-semibold mb-2">Originality & Innovation</h3>
                    <p className="text-gray-600">
                      Does your project bring something new to the table? We celebrate unique 
                      approaches, creative solutions, and projects that push boundaries in 
                      unexpected ways.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Badge variant="default" className="bg-green-600 text-white min-w-fit">20%</Badge>
                  <div>
                    <h3 className="font-semibold mb-2">Technical Execution</h3>
                    <p className="text-gray-600">
                      Quality matters. We evaluate code quality, architecture decisions, 
                      performance, and overall technical craftsmanship of the final product.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Badge variant="default" className="bg-orange-600 text-white min-w-fit">15%</Badge>
                  <div>
                    <h3 className="font-semibold mb-2">Wow Factor</h3>
                    <p className="text-gray-600">
                      That special something that makes people stop and say "wow!" Whether it's 
                      an amazing user experience, a clever solution, or just pure delight.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Award Categories */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Award Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border">
                  <div className="text-4xl mb-3">🏆</div>
                  <h3 className="font-semibold mb-2">Monthly Winner</h3>
                  <p className="text-gray-600 text-sm">
                    The highest-scoring project each month, judged by our expert panel.
                  </p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border">
                  <div className="text-4xl mb-3">❤️</div>
                  <h3 className="font-semibold mb-2">People's Choice</h3>
                  <p className="text-gray-600 text-sm">
                    The community favorite, determined by public voting.
                  </p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border">
                  <div className="text-4xl mb-3">⭐</div>
                  <h3 className="font-semibold mb-2">Standout Projects</h3>
                  <p className="text-gray-600 text-sm">
                    Exceptional projects that deserve special recognition.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Monthly Timeline</CardTitle>
              <CardDescription>
                Each month follows this structured cycle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold">Submission Period (Days 1-20)</h4>
                    <p className="text-gray-600 text-sm">Submit your vibe coding projects</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold">Community Voting (Days 21-25)</h4>
                    <p className="text-gray-600 text-sm">Public votes for People's Choice</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold">Expert Judging (Days 26-28)</h4>
                    <p className="text-gray-600 text-sm">Panel evaluates submissions</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold">Winner Announcement (Day 30)</h4>
                    <p className="text-gray-600 text-sm">Results revealed and celebrated</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Movement?</h2>
            <p className="text-lg mb-6 opacity-90">
              Be part of the future of software development. Share your vibe coding story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/submit">Submit Your Project</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="/projects">Explore Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 