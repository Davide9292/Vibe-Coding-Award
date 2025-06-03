"use client";

import React, { useState } from "react";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload, Link as LinkIcon, Github, ExternalLink } from "lucide-react";

const PROJECT_CATEGORIES = [
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

const AI_TOOLS = [
  "ChatGPT",
  "Claude",
  "GitHub Copilot",
  "Cursor",
  "Replit",
  "Tabnine",
  "CodeT5",
  "Codex",
  "Other"
];

interface FormData {
  // Basic Info
  title: string;
  description: string;
  category: string;
  tags: string[];
  
  // Project Links
  demoUrl: string;
  repoUrl: string;
  videoUrl: string;
  downloadUrl: string;
  
  // Vibe Narrative
  vibeNarrative: string;
  aiTools: string[];
  customAiTool: string;
  
  // Code Authorship
  aiGeneratedPercent: number;
  aiRefactoredPercent: number;
  humanWrittenPercent: number;
  
  // Learning & Challenges
  learnings: string;
  challenges: string;
  
  // Team Members
  teamMembers: Array<{
    name: string;
    role: string;
    email: string;
    github: string;
  }>;
}

export default function SubmitProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    tags: [],
    demoUrl: "",
    repoUrl: "",
    videoUrl: "",
    downloadUrl: "",
    vibeNarrative: "",
    aiTools: [],
    customAiTool: "",
    aiGeneratedPercent: 0,
    aiRefactoredPercent: 0,
    humanWrittenPercent: 100,
    learnings: "",
    challenges: "",
    teamMembers: []
  });

  const [newTag, setNewTag] = useState("");
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    role: "",
    email: "",
    github: ""
  });

  const totalSteps = 4;

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addTeamMember = () => {
    if (newTeamMember.name.trim()) {
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { ...newTeamMember }]
      }));
      setNewTeamMember({ name: "", role: "", email: "", github: "" });
    }
  };

  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };

  const handlePercentageChange = (field: keyof Pick<FormData, 'aiGeneratedPercent' | 'aiRefactoredPercent' | 'humanWrittenPercent'>, value: number) => {
    const newData = { ...formData };
    newData[field] = value;
    
    // Auto-adjust other percentages to maintain 100% total
    const total = newData.aiGeneratedPercent + newData.aiRefactoredPercent + newData.humanWrittenPercent;
    if (total !== 100) {
      const diff = 100 - total;
      if (field !== 'humanWrittenPercent') {
        newData.humanWrittenPercent = Math.max(0, newData.humanWrittenPercent + diff);
      }
    }
    
    setFormData(newData);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Project "${result.project.title}" submitted successfully!`);
        // Reset form or redirect
        setFormData({
          title: "",
          description: "",
          category: "",
          tags: [],
          demoUrl: "",
          repoUrl: "",
          videoUrl: "",
          downloadUrl: "",
          vibeNarrative: "",
          aiTools: [],
          customAiTool: "",
          aiGeneratedPercent: 0,
          aiRefactoredPercent: 0,
          humanWrittenPercent: 100,
          learnings: "",
          challenges: "",
          teamMembers: []
        });
        setCurrentStep(1);
      } else {
        const error = await response.json();
        alert(`Submission failed: ${error.error}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit project. Please try again.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter your project title"
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what your project does and what makes it special"
                className="mt-2 min-h-[120px]"
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Tags</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="demoUrl">Demo URL</Label>
              <div className="relative mt-2">
                <ExternalLink className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="demoUrl"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, demoUrl: e.target.value }))}
                  placeholder="https://your-project-demo.com"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="repoUrl">Repository URL</Label>
              <div className="relative mt-2">
                <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="repoUrl"
                  value={formData.repoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, repoUrl: e.target.value }))}
                  placeholder="https://github.com/username/project"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="videoUrl">Video Demo URL</Label>
              <div className="relative mt-2">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="videoUrl"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                  placeholder="https://youtube.com/watch?v=..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="downloadUrl">Download URL (if applicable)</Label>
              <div className="relative mt-2">
                <Upload className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="downloadUrl"
                  value={formData.downloadUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, downloadUrl: e.target.value }))}
                  placeholder="https://releases.github.com/..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="vibeNarrative">Vibe Narrative *</Label>
              <p className="text-sm text-gray-600 mt-1">
                Tell us the story of how you and AI collaborated to build this project. What was the creative process like?
              </p>
              <Textarea
                id="vibeNarrative"
                value={formData.vibeNarrative}
                onChange={(e) => setFormData(prev => ({ ...prev, vibeNarrative: e.target.value }))}
                placeholder="Describe your human-AI collaboration journey..."
                className="mt-2 min-h-[150px]"
              />
            </div>
            
            <div>
              <Label>AI Tools Used</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {AI_TOOLS.map(tool => (
                  <div key={tool} className="flex items-center space-x-2">
                    <Checkbox
                      id={tool}
                      checked={formData.aiTools.includes(tool)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData(prev => ({ ...prev, aiTools: [...prev.aiTools, tool] }));
                        } else {
                          setFormData(prev => ({ ...prev, aiTools: prev.aiTools.filter(t => t !== tool) }));
                        }
                      }}
                    />
                    <Label htmlFor={tool} className="text-sm">{tool}</Label>
                  </div>
                ))}
              </div>
              {formData.aiTools.includes("Other") && (
                <Input
                  value={formData.customAiTool}
                  onChange={(e) => setFormData(prev => ({ ...prev, customAiTool: e.target.value }))}
                  placeholder="Specify other AI tool"
                  className="mt-3"
                />
              )}
            </div>
            
            <div>
              <Label>Code Authorship Breakdown</Label>
              <p className="text-sm text-gray-600 mt-1">
                Estimate the percentage breakdown of your code authorship
              </p>
              <div className="space-y-4 mt-3">
                <div>
                  <Label htmlFor="aiGenerated">AI Generated: {formData.aiGeneratedPercent}%</Label>
                  <input
                    type="range"
                    id="aiGenerated"
                    min="0"
                    max="100"
                    value={formData.aiGeneratedPercent}
                    onChange={(e) => handlePercentageChange('aiGeneratedPercent', parseInt(e.target.value))}
                    className="w-full mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="aiRefactored">AI Refactored: {formData.aiRefactoredPercent}%</Label>
                  <input
                    type="range"
                    id="aiRefactored"
                    min="0"
                    max="100"
                    value={formData.aiRefactoredPercent}
                    onChange={(e) => handlePercentageChange('aiRefactoredPercent', parseInt(e.target.value))}
                    className="w-full mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="humanWritten">Human Written: {formData.humanWrittenPercent}%</Label>
                  <input
                    type="range"
                    id="humanWritten"
                    min="0"
                    max="100"
                    value={formData.humanWrittenPercent}
                    onChange={(e) => handlePercentageChange('humanWrittenPercent', parseInt(e.target.value))}
                    className="w-full mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="learnings">Key Learnings</Label>
              <Textarea
                id="learnings"
                value={formData.learnings}
                onChange={(e) => setFormData(prev => ({ ...prev, learnings: e.target.value }))}
                placeholder="What did you learn from this vibe coding experience?"
                className="mt-2 min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="challenges">Challenges Faced</Label>
              <Textarea
                id="challenges"
                value={formData.challenges}
                onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
                placeholder="What challenges did you encounter and how did you overcome them?"
                className="mt-2 min-h-[100px]"
              />
            </div>
            
            <div>
              <Label>Team Members (Optional)</Label>
              <div className="space-y-3 mt-2">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={newTeamMember.name}
                    onChange={(e) => setNewTeamMember(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Name"
                  />
                  <Input
                    value={newTeamMember.role}
                    onChange={(e) => setNewTeamMember(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="Role"
                  />
                  <Input
                    value={newTeamMember.email}
                    onChange={(e) => setNewTeamMember(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Email"
                  />
                  <Input
                    value={newTeamMember.github}
                    onChange={(e) => setNewTeamMember(prev => ({ ...prev, github: e.target.value }))}
                    placeholder="GitHub username"
                  />
                </div>
                <Button type="button" onClick={addTeamMember} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
              </div>
              
              {formData.teamMembers.length > 0 && (
                <div className="space-y-2 mt-4">
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                      <Button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Submit Your <span className="text-gradient">Vibe Coding</span> Project
            </h1>
            <p className="text-lg text-gray-600">
              Share your AI-human collaboration story with the community
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Project Basics"}
                {currentStep === 2 && "Project Links"}
                {currentStep === 3 && "Vibe Story & AI Collaboration"}
                {currentStep === 4 && "Learning & Team"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about your project"}
                {currentStep === 2 && "Share your project links and demos"}
                {currentStep === 3 && "Describe your human-AI collaboration experience"}
                {currentStep === 4 && "Share your learnings and team information"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderStep()}
              
              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="outline"
                >
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button onClick={nextStep} variant="vibe">
                    Next Step
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} variant="electric">
                    Submit Project
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 