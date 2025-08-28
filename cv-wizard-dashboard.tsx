"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, LayoutDashboard, FileText, Mail, Briefcase, Send, LogIn, Grid3X3, List, HelpCircle } from "lucide-react"
import { useResumes } from "./hooks/useResumes"
import type { Resume, ResumeTemplate } from "./types/resume"
import ResumeTemplates from "./components/resume-templates"
import ResumeBuilder from "./components/resume-builder"
import ResumeCard from "./components/resume-card"

type View = "dashboard" | "templates" | "builder"

export default function CVWizardDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState("resumes")
  const [currentView, setCurrentView] = useState<View>("dashboard")
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null)
  const [editingResume, setEditingResume] = useState<Resume | null>(null)

  const { resumes, addResume, updateResume, deleteResume } = useResumes()

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "resumes", label: "Resumes", icon: FileText },
    { id: "cover-letters", label: "Cover Letters", icon: Mail },
    { id: "jobs", label: "Jobs", icon: Briefcase },
    { id: "applications", label: "Applications", icon: Send },
  ]

  const handleCreateNew = () => {
    setCurrentView("templates")
    setEditingResume(null)
  }

  const handleSelectTemplate = (template: ResumeTemplate) => {
    setSelectedTemplate(template)
    setCurrentView("builder")
  }

  const handleSaveResume = (resume: Resume) => {
    if (editingResume) {
      updateResume(resume.id, resume)
    } else {
      addResume(resume)
    }
    setCurrentView("dashboard")
    setEditingResume(null)
    setSelectedTemplate(null)
  }

  const handleEditResume = (resume: Resume) => {
    setEditingResume(resume)
    // Find the template for this resume
    const template: ResumeTemplate = {
      id: resume.template,
      name: resume.template,
      description: "",
      preview: "",
      color: "bg-blue-500",
    }
    setSelectedTemplate(template)
    setCurrentView("builder")
  }

  const handleDuplicateResume = (resume: Resume) => {
    const duplicatedResume: Resume = {
      ...resume,
      id: Date.now().toString(),
      title: `${resume.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    addResume(duplicatedResume)
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
    setSelectedTemplate(null)
    setEditingResume(null)
  }

  if (currentView === "templates") {
    return (
      <div className="h-screen bg-gray-50">
        <ResumeTemplates onSelectTemplate={handleSelectTemplate} onBack={handleBackToDashboard} />
      </div>
    )
  }

  if (currentView === "builder" && selectedTemplate) {
    return (
      <div className="h-screen bg-gray-50">
        <ResumeBuilder
          template={selectedTemplate}
          resume={editingResume || undefined}
          onSave={handleSaveResume}
          onBack={handleBackToDashboard}
        />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">CV</span>
            </div>
            <span className="font-semibold text-lg">WIZARD</span>
            <HelpCircle className="w-4 h-4 ml-auto text-gray-400" />
          </div>
        </div>

        {/* New Button */}
        <div className="p-4">
          <Button
            onClick={handleCreateNew}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 rounded-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-left transition-colors mb-1 ${
                activeTab === item.id ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Log in */}
        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <LogIn className="w-4 h-4" />
            Log in
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              {activeTab === "resumes"
                ? "Resumes"
                : activeTab === "dashboard"
                  ? "Dashboard"
                  : activeTab === "cover-letters"
                    ? "Cover Letters"
                    : activeTab === "jobs"
                      ? "Jobs"
                      : "Applications"}
            </h1>
            {activeTab === "resumes" && (
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "resumes" ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Create New Resume Card */}
                <Card
                  className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group"
                  onClick={handleCreateNew}
                >
                  <CardContent className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mb-4 group-hover:border-blue-400 transition-colors">
                      <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
                    </div>
                    <p className="text-gray-500 font-medium group-hover:text-gray-700">Create new resume</p>
                  </CardContent>
                </Card>

                {/* Existing Resumes */}
                {resumes.map((resume) => (
                  <ResumeCard
                    key={resume.id}
                    resume={resume}
                    onEdit={handleEditResume}
                    onDelete={deleteResume}
                    onDuplicate={handleDuplicateResume}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Create New Resume List Item */}
                <Card
                  className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer group"
                  onClick={handleCreateNew}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 border-2 border-dashed border-gray-300 rounded flex items-center justify-center group-hover:border-blue-400 transition-colors">
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                    </div>
                    <p className="text-gray-500 font-medium group-hover:text-gray-700">Create new resume</p>
                  </CardContent>
                </Card>

                {/* Existing Resumes List */}
                {resumes.map((resume) => (
                  <Card key={resume.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-gray-100 rounded flex items-center justify-center">
                          <FileText className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{resume.title}</h3>
                          <p className="text-sm text-gray-600">
                            {resume.personalInfo.firstName} {resume.personalInfo.lastName}
                          </p>
                          <p className="text-xs text-gray-500">
                            Updated {new Date(resume.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditResume(resume)}
                          className="hover:bg-blue-50 hover:border-blue-300"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteResume(resume.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
                        >
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                  {activeTab === "dashboard"
                    ? "Dashboard"
                    : activeTab === "cover-letters"
                      ? "Cover Letters"
                      : activeTab === "jobs"
                        ? "Jobs"
                        : "Applications"}
                </h2>
                <p className="text-gray-500">This section is coming soon!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
