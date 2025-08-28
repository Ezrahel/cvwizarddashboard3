import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, Download, Copy } from 'lucide-react'
import { Resume } from "../types/resume"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ResumeCardProps {
  resume: Resume
  onEdit: (resume: Resume) => void
  onDelete: (id: string) => void
  onDuplicate: (resume: Resume) => void
}

export default function ResumeCard({ resume, onEdit, onDelete, onDuplicate }: ResumeCardProps) {
  const handleExport = () => {
    const resumeData = {
      title: resume.title,
      personalInfo: resume.personalInfo,
      experience: resume.experience,
      education: resume.education,
      skills: resume.skills
    }
    
    const dataStr = JSON.stringify(resumeData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${resume.title.replace(/\s+/g, '_')}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardContent className="p-4">
        <div className="aspect-[3/4] mb-4 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="w-full h-full p-4 bg-white m-2 rounded shadow-sm">
            <div className="text-center">
              <div className="h-2 bg-gray-800 rounded mb-2"></div>
              <div className="h-1 bg-gray-400 rounded mb-4 w-3/4 mx-auto"></div>
              <div className="space-y-1 mb-4">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-5/6"></div>
                <div className="h-1 bg-gray-300 rounded w-4/6"></div>
              </div>
              <div className="h-1 bg-gray-600 rounded mb-2"></div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-200 rounded"></div>
                <div className="h-1 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onEdit(resume)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDuplicate(resume)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(resume.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <h3 className="font-semibold mb-1 truncate">{resume.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {resume.personalInfo.firstName} {resume.personalInfo.lastName}
        </p>
        <p className="text-xs text-gray-500">
          Updated {new Date(resume.updatedAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  )
}
