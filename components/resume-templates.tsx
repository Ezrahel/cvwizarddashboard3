import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResumeTemplate } from "../types/resume"

interface ResumeTemplatesProps {
  onSelectTemplate: (template: ResumeTemplate) => void
  onBack: () => void
}

const templates: ResumeTemplate[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design',
    preview: '/images/modern_cng.PNG?height=300&width=200&text=Modern+Template',
    color: 'bg-blue-500'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional layout',
    preview: '/images/traditional_cng.PNG?height=300&width=200&text=Classic+Template',
    color: 'bg-gray-600'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and eye-catching design',
    preview: '/images/creative_cng.PNG?height=300&width=200&text=Creative+Template',
    color: 'bg-purple-500'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant layout',
    preview: '/images/minimal_cng.PNG?height=300&width=200&text=Minimal+Template',
    color: 'bg-green-500'
  }
]

export default function ResumeTemplates({ onSelectTemplate, onBack }: ResumeTemplatesProps) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          ← Back
        </Button>
        <h2 className="text-2xl font-bold mb-2">Choose a Template</h2>
        <p className="text-gray-600">Select a template to get started with your resume</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-[3/4] mb-4 rounded-lg overflow-hidden">
                <img 
                  src={template.preview || "/images/modern_cng.PNG"} 
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <Button 
                onClick={() => onSelectTemplate(template)}
                className="w-full"
              >
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
