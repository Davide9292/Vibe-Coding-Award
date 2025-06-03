"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AwardCycle {
  id: string;
  month: number;
  year: number;
  status: "OPEN" | "JUDGING" | "COMPLETED";
  submissionDeadline: string;
  judgingDeadline: string;
  announcementDate: string;
  _count: {
    projects: number;
    votes: number;
  };
}

interface Submission {
  id: string;
  title: string;
  description: string;
  status: "SUBMITTED" | "UNDER_REVIEW" | "WINNER" | "STANDOUT" | "PEOPLES_CHOICE";
  author: string;
  submittedAt: string;
  voteCount: number;
  judgeScores?: Array<{
    score: number;
    judge: string;
  }>;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [currentCycle, setCurrentCycle] = useState<AwardCycle | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) {
      redirect("/");
      return;
    }
    // For now, check if user email is admin (you can modify this logic)
    const adminEmails = ["admin@vibecodingaward.com", session.user.email]; // Add your email here
    if (!adminEmails.some(email => email === session.user.email)) {
      redirect("/");
      return;
    }
  }, [session, status]);

  useEffect(() => {
    fetchCurrentCycle();
    fetchSubmissions();
  }, []);

  const fetchCurrentCycle = async () => {
    try {
      const response = await fetch("/api/admin/current-cycle");
      if (response.ok) {
        const data = await response.json();
        setCurrentCycle(data.cycle);
      }
    } catch (error) {
      console.error("Failed to fetch current cycle:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/submissions");
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions);
      }
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    }
  };

  const createNewCycle = async () => {
    try {
      const response = await fetch("/api/admin/cycles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        fetchCurrentCycle();
      }
    } catch (error) {
      console.error("Failed to create new cycle:", error);
    }
  };

  const updateSubmissionStatus = async (submissionId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/submissions/${submissionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        fetchSubmissions();
      }
    } catch (error) {
      console.error("Failed to update submission:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Vibe Coding Award - Admin Dashboard
        </h1>

        {/* Current Cycle Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Award Cycle</CardTitle>
          </CardHeader>
          <CardContent>
            {currentCycle ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Period</p>
                  <p className="font-semibold">
                    {new Date(currentCycle.year, currentCycle.month - 1).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge variant={currentCycle.status === "OPEN" ? "default" : 
                               currentCycle.status === "JUDGING" ? "secondary" : "outline"}>
                    {currentCycle.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Submissions</p>
                  <p className="font-semibold">{currentCycle._count.projects}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Votes</p>
                  <p className="font-semibold">{currentCycle._count.votes}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No active award cycle</p>
                <Button onClick={createNewCycle}>Create New Cycle</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Management Tabs */}
        <Tabs defaultValue="submissions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="judging">Judging</TabsTrigger>
            <TabsTrigger value="winners">Winners</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>Current Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{submission.title}</h3>
                          <p className="text-sm text-gray-600">by {submission.author}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge>{submission.status}</Badge>
                          <span className="text-sm text-gray-500">
                            {submission.voteCount} votes
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{submission.description}</p>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(`/projects/${submission.id}`, "_blank")}
                        >
                          View Project
                        </Button>
                        <select
                          value={submission.status}
                          onChange={(e) => updateSubmissionStatus(submission.id, e.target.value)}
                          className="px-3 py-1 text-sm border rounded"
                        >
                          <option value="SUBMITTED">Submitted</option>
                          <option value="UNDER_REVIEW">Under Review</option>
                          <option value="WINNER">Winner</option>
                          <option value="STANDOUT">Standout</option>
                          <option value="PEOPLES_CHOICE">People's Choice</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  {submissions.length === 0 && (
                    <p className="text-center text-gray-500 py-8">
                      No submissions for current cycle
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="judging">
            <Card>
              <CardHeader>
                <CardTitle>Judging Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Judging interface will allow judges to score submissions based on:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Vibe Coding Process Demonstration (40%)</li>
                  <li>Project Originality & Creative Concept (25%)</li>
                  <li>Execution, Functionality & Polish (20%)</li>
                  <li>"Wow" Factor / Overall Impact (15%)</li>
                </ul>
                <Button className="mt-4" variant="outline">
                  Set Up Judge Panel
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="winners">
            <Card>
              <CardHeader>
                <CardTitle>Winner Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Review judging scores and select monthly winners
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded p-4">
                    <h4 className="font-semibold mb-2">Vibe Project of the Month</h4>
                    <p className="text-sm text-gray-600">Main award winner</p>
                  </div>
                  <div className="border rounded p-4">
                    <h4 className="font-semibold mb-2">Vibe Standouts</h4>
                    <p className="text-sm text-gray-600">1-2 runner-ups</p>
                  </div>
                  <div className="border rounded p-4">
                    <h4 className="font-semibold mb-2">People's Choice</h4>
                    <p className="text-sm text-gray-600">Community voted winner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Award Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Submission Deadline
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Judging Deadline
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Announcement Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 