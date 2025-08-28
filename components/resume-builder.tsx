"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Plus,
  Upload,
  Download,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Heart,
  Calendar,
  Car,
  Linkedin,
} from "lucide-react"
import type { Resume, PersonalInfo, Experience, Education, Skill, ResumeTemplate } from "../types/resume"

interface ResumeBuilderProps {
  template: ResumeTemplate
  resume?: Resume
  onSave: (resume: Resume) => void
  onBack: () => void
}

export default function ResumeBuilder({ template, resume, onSave, onBack }: ResumeBuilderProps) {
  const [resumeTitle] = useState("Resume Folahan Victor")
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    education: false,
    employment: false,
    skills: false,
    languages: false,
    hobbies: false,
    profile: false,
    courses: false,
    internships: false,
    extracurricular: false,
    references: false,
    qualities: false,
    certificates: false,
    achievements: false,
    signature: false,
    footer: false,
  })

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(
    resume?.personalInfo || {
      firstName: "Folahan",
      lastName: "Victor",
      email: "adelakinadefolahan001@gmail.com",
      phone: "+2349039412648",
      address: "6, Tanke MFM",
      city: "Ilorin",
      country: "",
      summary: "",
      postCode: "20110",
      desiredPosition: "",
      useAsHeadline: false,
    },
  )

  const [optionalPersonalFields, setOptionalPersonalFields] = useState<{ [key: string]: boolean }>({})
  const [optionalPersonalData, setOptionalPersonalData] = useState<{ [key: string]: string }>({})

  const [experience, setExperience] = useState<Experience[]>(resume?.experience || [])
  const [education, setEducation] = useState<Education[]>(resume?.education || [])
  const [skills, setSkills] = useState<Skill[]>(resume?.skills || [])
  const [languages, setLanguages] = useState<string[]>(resume?.languages || [])
  const [hobbies, setHobbies] = useState<string[]>(resume?.hobbies || [])

  const [profile, setProfile] = useState<string>("")
  const [courses, setCourses] = useState<Array<{ id: string; name: string; institution: string; date: string }>>([])
  const [references, setReferences] = useState<
    Array<{ id: string; name: string; position: string; company: string; email: string; phone: string }>
  >([])
  const [certificates, setCertificates] = useState<Array<{ id: string; name: string; issuer: string; date: string }>>(
    [],
  )
  const [signature, setSignature] = useState<string>("")
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [selectedFont, setSelectedFont] = useState<string>("Inter")
  const [selectedColor, setSelectedColor] = useState<string>("blue")
  const [textFormatting, setTextFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontSize: "16px"
  })
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const closeDropdowns = () => setOpenDropdown(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdowns()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Here you would typically parse the resume file (PDF, DOC, etc.)
      // For now, we'll just show a success message
      alert("Resume uploaded successfully! Please fill in the details below.")
    }
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleSave = () => {
    const newResume: Resume = {
      id: resume?.id || Date.now().toString(),
      title: resumeTitle,
      template: template.id,
      personalInfo,
      experience,
      education,
      skills,
      languages: languages || [],
      hobbies: hobbies || [],
      createdAt: resume?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    onSave(newResume)
  }

  const optionalSections = [
    "Date of birth",
    "Place of birth",
    "Driver's license",
    "Gender",
    "Nationality",
    "Civil status",
    "Website",
    "LinkedIn",
    "Custom field",
  ]

  const additionalSections = [
    "Profile",
    "Courses",
    "Internships",
    "Extracurricular activities",
    "References",
    "Qualities",
    "Certificates",
    "Achievements",
    "Signature",
    "Footer",
    "Custom section",
  ]

  const addCourse = () => {
    setCourses([...courses, { id: Date.now().toString(), name: "", institution: "", date: "" }])
  }

  const addReference = () => {
    setReferences([
      ...references,
      { id: Date.now().toString(), name: "", position: "", company: "", email: "", phone: "" },
    ])
  }

  const addCertificate = () => {
    setCertificates([...certificates, { id: Date.now().toString(), name: "", issuer: "", date: "" }])
  }

  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: Date.now().toString(),
        school: "",
        degree: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ])
  }

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        id: Date.now().toString(),
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        current: false,
      },
    ])
  }

  const addSkill = () => {
    setSkills([
      ...skills,
      {
        id: Date.now().toString(),
        name: "",
        level: "Beginner",
      },
    ])
  }

  const addLanguage = () => {
    setLanguages([...languages, ""])
  }

  const addHobby = () => {
    setHobbies([...hobbies, ""])
  }

  const handleAdditionalSectionClick = (section: string) => {
    const sectionKey = section.toLowerCase().replace(/\s+/g, "") as keyof typeof expandedSections
    if (sectionKey in expandedSections) {
      setExpandedSections((prev) => ({ ...prev, [sectionKey]: true }))
    }
  }

  const handleOptionalPersonalFieldClick = (field: string) => {
    setOptionalPersonalFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <div className="h-screen bg-gray-50" ref={dropdownRef}>
      {/* ... existing header code ... */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-gray-600">
            <ArrowLeft className="w-4 h-4" />
            Resumes
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-medium">{resumeTitle}</h1>
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <div className="w-6 h-6 rounded border flex items-center justify-center text-xs">⟲</div>
          </Button>
          <Button variant="ghost" size="sm">
            <div className="w-6 h-6 rounded border flex items-center justify-center text-xs">⟳</div>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <span className="text-sm">🌐</span>
            EN
            <ChevronDown className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        <div className="w-1/2 bg-white overflow-y-auto">
          <div className="p-6">
            {/* ... existing upload and personal details sections ... */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleResumeUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Upload existing resume</p>
                  </label>
                </CardContent>
              </Card>
              <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-6 h-6 mx-auto mb-2 text-blue-600">in</div>
                  <p className="text-sm text-gray-600">Import LinkedIn profile</p>
                </CardContent>
              </Card>
            </div>

            {/* ... existing personal details section ... */}
            <div className="mb-6">
              <div
                className="flex items-center justify-between py-3 cursor-pointer"
                onClick={() => toggleSection("personal")}
              >
                <h2 className="text-lg font-medium">Personal details</h2>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                  {expandedSections.personal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {expandedSections.personal && (
                <div className="space-y-4 pl-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">Photo</Label>
                      <div className="w-20 h-20 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 relative overflow-hidden">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer w-full h-full flex items-center justify-center">
                          {photoPreview ? (
                            <img 
                              src={photoPreview} 
                              alt="Profile" 
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <div className="text-center">
                              <div className="w-6 h-6 mx-auto mb-1 text-gray-400">📷</div>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Given name</Label>
                      <Input
                        value={personalInfo.firstName}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Family name</Label>
                      <Input
                        value={personalInfo.lastName}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">Desired job position</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <Input
                        value={personalInfo.desiredPosition || ""}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, desiredPosition: e.target.value })}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={personalInfo.useAsHeadline || false}
                          onCheckedChange={(checked) => setPersonalInfo({ ...personalInfo, useAsHeadline: checked })}
                        />
                        <Label className="text-sm text-gray-600">Use as headline</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">Email address</Label>
                    <Input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">Phone number</Label>
                    <Input
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">Address</Label>
                    <Input
                      value={personalInfo.address}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">Post code</Label>
                      <Input
                        value={personalInfo.postCode || ""}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, postCode: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">City</Label>
                      <Input
                        value={personalInfo.city}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {optionalSections.map((section) => (
                      <Button
                        key={section}
                        variant="outline"
                        size="sm"
                        className="text-xs bg-transparent"
                        onClick={() => handleOptionalPersonalFieldClick(section)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {section}
                      </Button>
                    ))}
                  </div>

                  <div className="space-y-4 mt-4">
                    {optionalPersonalFields["Date of birth"] && (
                      <div>
                        <Label className="text-sm text-gray-600">Date of birth</Label>
                        <Input
                          type="date"
                          value={optionalPersonalData["Date of birth"] || ""}
                          onChange={(e) =>
                            setOptionalPersonalData((prev) => ({ ...prev, "Date of birth": e.target.value }))
                          }
                          className="mt-1"
                        />
                      </div>
                    )}

                    {optionalPersonalFields["Place of birth"] && (
                      <div>
                        <Label className="text-sm text-gray-600">Place of birth</Label>
                        <Input
                          value={optionalPersonalData["Place of birth"] || ""}
                          onChange={(e) =>
                            setOptionalPersonalData((prev) => ({ ...prev, "Place of birth": e.target.value }))
                          }
                          className="mt-1"
                        />
                      </div>
                    )}

                    {optionalPersonalFields["Driver's license"] && (
                      <div>
                        <Label className="text-sm text-gray-600">Driver's license</Label>
                        <Input
                          value={optionalPersonalData["Driver's license"] || ""}
                          onChange={(e) =>
                            setOptionalPersonalData((prev) => ({ ...prev, "Driver's license": e.target.value }))
                          }
                          className="mt-1"
                        />
                      </div>
                    )}

                    {optionalPersonalFields["Gender"] && (
                      <div>
                        <Label className="text-sm text-gray-600">Gender</Label>
                        <Input
                          value={optionalPersonalData["Gender"] || ""}
                          onChange={(e) => setOptionalPersonalData((prev) => ({ ...prev, Gender: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                    )}

                    {optionalPersonalFields["Nationality"] && (
                      <div>
                        <Label className="text-sm text-gray-600">Nationality</Label>
                        <Input
                          value={optionalPersonalData["Nationality"] || ""}
                          onChange={(e) =>
                            setOptionalPersonalData((prev) => ({ ...prev, Nationality: e.target.value }))
                          }
                          className="mt-1"
                        />
                      </div>
                    )}

                    {optionalPersonalFields["Civil status"] && (
                      <div>
                        <Label className="text-sm text-gray-600">Civil status</Label>
                        <Input
                          value={optionalPersonalData["Civil status"] || ""}
                          onChange={(e) =>
                            setOptionalPersonalData((prev) => ({ ...prev, "Civil status": e.target.value }))
                          }
                          className="mt-1"
                        />
                      </div>
                    )}

                    {optionalPersonalFields["Website"] && (
                      <div>
                        <Label className="text-sm text-gray-600">Website</Label>
                        <Input
                          type="url"
                          value={optionalPersonalData["Website"] || ""}
                          onChange={(e) => setOptionalPersonalData((prev) => ({ ...prev, Website: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                    )}

                    {optionalPersonalFields["LinkedIn"] && (
                      <div>
                        <Label className="text-sm text-gray-600">LinkedIn</Label>
                        <Input
                          value={optionalPersonalData["LinkedIn"] || ""}
                          onChange={(e) => setOptionalPersonalData((prev) => ({ ...prev, LinkedIn: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                    )}

                    {optionalPersonalFields["Custom field"] && (
                      <div>
                        <Label className="text-sm text-gray-600">Custom field</Label>
                        <Input
                          value={optionalPersonalData["Custom field"] || ""}
                          onChange={(e) =>
                            setOptionalPersonalData((prev) => ({ ...prev, "Custom field": e.target.value }))
                          }
                          className="mt-1"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ... existing education, employment, skills, languages, hobbies sections ... */}
            <div className="mb-4">
              <div
                className="flex items-center justify-between py-3 cursor-pointer border-t border-gray-100"
                onClick={() => toggleSection("education")}
              >
                <h2 className="text-lg font-medium text-gray-600">Education</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    addEducation()
                    setExpandedSections((prev) => ({ ...prev, education: true }))
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {expandedSections.education && (
                <div className="space-y-4 pl-4">
                  {education.map((edu, index) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-600">School</Label>
                          <Input
                            value={edu.school}
                            onChange={(e) => {
                              const newEducation = [...education]
                              newEducation[index].school = e.target.value
                              setEducation(newEducation)
                            }}
                            className="mt-1"
                            placeholder="University name"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) => {
                              const newEducation = [...education]
                              newEducation[index].degree = e.target.value
                              setEducation(newEducation)
                            }}
                            className="mt-1"
                            placeholder="Bachelor's, Master's, etc."
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Location</Label>
                        <Input
                          value={edu.location}
                          onChange={(e) => {
                            const newEducation = [...education]
                            newEducation[index].location = e.target.value
                            setEducation(newEducation)
                          }}
                          className="mt-1"
                          placeholder="City, Country"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-600">Start Date</Label>
                          <Input
                            type="date"
                            value={edu.startDate}
                            onChange={(e) => {
                              const newEducation = [...education]
                              newEducation[index].startDate = e.target.value
                              setEducation(newEducation)
                            }}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">End Date</Label>
                          <Input
                            type="date"
                            value={edu.endDate}
                            onChange={(e) => {
                              const newEducation = [...education]
                              newEducation[index].endDate = e.target.value
                              setEducation(newEducation)
                            }}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {education.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No education entries yet. Click the + button to add one.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-4">
              <div
                className="flex items-center justify-between py-3 cursor-pointer border-t border-gray-100"
                onClick={() => toggleSection("employment")}
              >
                <h2 className="text-lg font-medium text-gray-600">Employment</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    addExperience()
                    setExpandedSections((prev) => ({ ...prev, employment: true }))
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {expandedSections.employment && (
                <div className="space-y-4 pl-4">
                  {experience.map((exp, index) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-600">Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) => {
                              const newExperience = [...experience]
                              newExperience[index].company = e.target.value
                              setExperience(newExperience)
                            }}
                            className="mt-1"
                            placeholder="Company name"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Job Title</Label>
                          <Input
                            value={exp.jobTitle}
                            onChange={(e) => {
                              const newExperience = [...experience]
                              newExperience[index].jobTitle = e.target.value
                              setExperience(newExperience)
                            }}
                            className="mt-1"
                            placeholder="Job title"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Location</Label>
                        <Input
                          value={exp.location}
                          onChange={(e) => {
                            const newExperience = [...experience]
                            newExperience[index].location = e.target.value
                            setExperience(newExperience)
                          }}
                          className="mt-1"
                          placeholder="City, Country"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-600">Start Date</Label>
                          <Input
                            type="date"
                            value={exp.startDate}
                            onChange={(e) => {
                              const newExperience = [...experience]
                              newExperience[index].startDate = e.target.value
                              setExperience(newExperience)
                            }}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">End Date</Label>
                          <Input
                            type="date"
                            value={exp.endDate}
                            onChange={(e) => {
                              const newExperience = [...experience]
                              newExperience[index].endDate = e.target.value
                              setExperience(newExperience)
                            }}
                            className="mt-1"
                            disabled={exp.current}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={exp.current}
                          onCheckedChange={(checked) => {
                            const newExperience = [...experience]
                            newExperience[index].current = checked
                            if (checked) newExperience[index].endDate = ""
                            setExperience(newExperience)
                          }}
                        />
                        <Label className="text-sm text-gray-600">Currently working here</Label>
                      </div>
                    </div>
                  ))}
                  {experience.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No employment entries yet. Click the + button to add one.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-4">
              <div
                className="flex items-center justify-between py-3 cursor-pointer border-t border-gray-100"
                onClick={() => toggleSection("skills")}
              >
                <h2 className="text-lg font-medium text-gray-600">Skills</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    addSkill()
                    setExpandedSections((prev) => ({ ...prev, skills: true }))
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {expandedSections.skills && (
                <div className="space-y-4 pl-4">
                  {skills.map((skill, index) => (
                    <div key={skill.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-600">Skill</Label>
                          <Input
                            value={skill.name}
                            onChange={(e) => {
                              const newSkills = [...skills]
                              newSkills[index].name = e.target.value
                              setSkills(newSkills)
                            }}
                            className="mt-1"
                            placeholder="e.g., JavaScript, Project Management"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Level</Label>
                          <select
                            value={skill.level}
                            onChange={(e) => {
                              const newSkills = [...skills]
                              newSkills[index].level = e.target.value as any
                              setSkills(newSkills)
                            }}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  {skills.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No skills added yet. Click the + button to add one.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-4">
              <div
                className="flex items-center justify-between py-3 cursor-pointer border-t border-gray-100"
                onClick={() => toggleSection("languages")}
              >
                <h2 className="text-lg font-medium text-gray-600">Languages</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    addLanguage()
                    setExpandedSections((prev) => ({ ...prev, languages: true }))
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {expandedSections.languages && (
                <div className="space-y-4 pl-4">
                  {languages.map((language, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div>
                        <Label className="text-sm text-gray-600">Language</Label>
                        <Input
                          value={language}
                          onChange={(e) => {
                            const newLanguages = [...languages]
                            newLanguages[index] = e.target.value
                            setLanguages(newLanguages)
                          }}
                          className="mt-1"
                          placeholder="e.g., English, Spanish, French"
                        />
                      </div>
                    </div>
                  ))}
                  {languages.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No languages added yet. Click the + button to add one.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-4">
              <div
                className="flex items-center justify-between py-3 cursor-pointer border-t border-gray-100"
                onClick={() => toggleSection("hobbies")}
              >
                <h2 className="text-lg font-medium text-gray-600">Hobbies</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    addHobby()
                    setExpandedSections((prev) => ({ ...prev, hobbies: true }))
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {expandedSections.hobbies && (
                <div className="space-y-4 pl-4">
                  {hobbies.map((hobby, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div>
                        <Label className="text-sm text-gray-600">Hobby</Label>
                        <Input
                          value={hobby}
                          onChange={(e) => {
                            const newHobbies = [...hobbies]
                            newHobbies[index] = e.target.value
                            setHobbies(newHobbies)
                          }}
                          className="mt-1"
                          placeholder="e.g., Reading, Photography, Cooking"
                        />
                      </div>
                    </div>
                  ))}
                  {hobbies.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No hobbies added yet. Click the + button to add one.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Section */}
            {expandedSections.profile && (
              <div className="mb-4">
                <div className="flex items-center justify-between py-3 cursor-pointer border-t border-gray-100">
                  <h2 className="text-lg font-medium text-gray-600">Profile</h2>
                  <Button variant="ghost" size="sm" onClick={() => toggleSection("profile")}>
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4 pl-4">
                  <div>
                    <Label className="text-sm text-gray-600">Professional Summary</Label>
                    <Textarea
                      value={profile}
                      onChange={(e) => setProfile(e.target.value)}
                      className="mt-1"
                      placeholder="Write a brief professional summary..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Courses Section */}
            {expandedSections.courses && (
              <div className="mb-4">
                <div className="flex items-center justify-between py-3 cursor-pointer border-t border-gray-100">
                  <h2 className="text-lg font-medium text-gray-600">Courses</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={addCourse}>
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => toggleSection("courses")}>
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-4 pl-4">
                  {courses.map((course, index) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div>
                        <Label className="text-sm text-gray-600">Course Name</Label>
                        <Input
                          value={course.name}
                          onChange={(e) => {
                            const newCourses = [...courses]
                            newCourses[index].name = e.target.value
                            setCourses(newCourses)
                          }}
                          className="mt-1"
                          placeholder="Course title"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-600">Institution</Label>
                          <Input
                            value={course.institution}
                            onChange={(e) => {
                              const newCourses = [...courses]
                              newCourses[index].institution = e.target.value
                              setCourses(newCourses)
                            }}
                            className="mt-1"
                            placeholder="Institution name"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Date</Label>
                          <Input
                            type="date"
                            value={course.date}
                            onChange={(e) => {
                              const newCourses = [...courses]
                              newCourses[index].date = e.target.value
                              setCourses(newCourses)
                            }}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* References Section */}
            {expandedSections.references && (
              <div className="mb-4">
                <div className="flex items-center justify-between py-3 cursor-pointer border-t border-gray-100">
                  <h2 className="text-lg font-medium text-gray-600">References</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={addReference}>
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => toggleSection("references")}>
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-4 pl-4">
                  {references.map((reference, index) => (
                    <div key={reference.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-600">Name</Label>
                          <Input
                            value={reference.name}
                            onChange={(e) => {
                              const newReferences = [...references]
                              newReferences[index].name = e.target.value
                              setReferences(newReferences)
                            }}
                            className="mt-1"
                            placeholder="Full name"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Position</Label>
                          <Input
                            value={reference.position}
                            onChange={(e) => {
                              const newReferences = [...references]
                              newReferences[index].position = e.target.value
                              setReferences(newReferences)
                            }}
                            className="mt-1"
                            placeholder="Job title"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Company</Label>
                        <Input
                          value={reference.company}
                          onChange={(e) => {
                            const newReferences = [...references]
                            newReferences[index].company = e.target.value
                            setReferences(newReferences)
                          }}
                          className="mt-1"
                          placeholder="Company name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-600">Email</Label>
                          <Input
                            type="email"
                            value={reference.email}
                            onChange={(e) => {
                              const newReferences = [...references]
                              newReferences[index].email = e.target.value
                              setReferences(newReferences)
                            }}
                            className="mt-1"
                            placeholder="Email address"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Phone</Label>
                          <Input
                            value={reference.phone}
                            onChange={(e) => {
                              const newReferences = [...references]
                              newReferences[index].phone = e.target.value
                              setReferences(newReferences)
                            }}
                            className="mt-1"
                            placeholder="Phone number"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Section */}
            {expandedSections.certificates && (
              <div className="mb-4">
                <div className="flex items-center justify-between py-3 cursor-pointer border-t border-gray-100">
                  <h2 className="text-lg font-medium text-gray-600">Certificates</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={addCertificate}>
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => toggleSection("certificates")}>
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-4 pl-4">
                  {certificates.map((certificate, index) => (
                    <div key={certificate.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div>
                        <Label className="text-sm text-gray-600">Certificate Name</Label>
                        <Input
                          value={certificate.name}
                          onChange={(e) => {
                            const newCertificates = [...certificates]
                            newCertificates[index].name = e.target.value
                            setCertificates(newCertificates)
                          }}
                          className="mt-1"
                          placeholder="Certificate title"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-600">Issuer</Label>
                          <Input
                            value={certificate.issuer}
                            onChange={(e) => {
                              const newCertificates = [...certificates]
                              newCertificates[index].issuer = e.target.value
                              setCertificates(newCertificates)
                            }}
                            className="mt-1"
                            placeholder="Issuing organization"
                          />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Date</Label>
                          <Input
                            type="date"
                            value={certificate.date}
                            onChange={(e) => {
                              const newCertificates = [...certificates]
                              newCertificates[index].date = e.target.value
                              setCertificates(newCertificates)
                            }}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Signature Section */}
            {expandedSections.signature && (
              <div className="mb-4">
                <div className="flex items-center justify-between py-3 cursor-pointer border-t border-gray-100">
                  <h2 className="text-lg font-medium text-gray-600">Signature</h2>
                  <Button variant="ghost" size="sm" onClick={() => toggleSection("signature")}>
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4 pl-4">
                  <div>
                    <Label className="text-sm text-gray-600">Signature Text</Label>
                    <Input
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      className="mt-1"
                      placeholder="Your signature or closing statement"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {additionalSections.map((section) => (
                  <Button
                    key={section}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-transparent"
                    onClick={() => handleAdditionalSectionClick(section)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {section}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSave}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-gray-100 p-6 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
            <div 
              className="text-white p-8 rounded-t-lg"
              style={{
                backgroundColor: selectedColor === 'blue' ? '#3B82F6' :
                                selectedColor === 'green' ? '#10B981' :
                                selectedColor === 'purple' ? '#8B5CF6' :
                                selectedColor === 'red' ? '#EF4444' :
                                selectedColor === 'orange' ? '#F59E0B' :
                                '#6B7280'
              }}
            >
              <h1 
                className="text-2xl font-bold text-center"
                style={{ 
                  fontFamily: selectedFont,
                  fontSize: textFormatting.fontSize,
                  fontWeight: textFormatting.bold ? 'bold' : 'normal',
                  fontStyle: textFormatting.italic ? 'italic' : 'normal',
                  textDecoration: textFormatting.underline ? 'underline' : 'none'
                }}
              >
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              {personalInfo.desiredPosition && personalInfo.useAsHeadline && (
                <p 
                  className="text-center text-blue-100 mt-2"
                  style={{ 
                    fontFamily: selectedFont,
                    fontSize: textFormatting.fontSize,
                    fontWeight: textFormatting.bold ? 'bold' : 'normal',
                    fontStyle: textFormatting.italic ? 'italic' : 'normal',
                    textDecoration: textFormatting.underline ? 'underline' : 'none'
                  }}
                >
                  {personalInfo.desiredPosition}
                </p>
              )}
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal details</h2>
                <div className="space-y-3">
                  {photoPreview && (
                    <div className="flex items-center gap-3">
                      <img 
                        src={photoPreview} 
                        alt="Profile" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <span className="text-gray-800 font-medium">
                        {personalInfo.firstName} {personalInfo.lastName}
                      </span>
                    </div>
                  )}
                  {!photoPreview && (
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-800">
                        {personalInfo.firstName} {personalInfo.lastName}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-800">{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-800">{personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-800">
                      {personalInfo.address}
                      {personalInfo.postCode && `, ${personalInfo.postCode}`} {personalInfo.city}
                    </span>
                  </div>
                  {optionalPersonalData["Date of birth"] && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{optionalPersonalData["Date of birth"]}</span>
                    </div>
                  )}

                  {optionalPersonalData["Place of birth"] && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{optionalPersonalData["Place of birth"]}</span>
                    </div>
                  )}

                  {optionalPersonalData["Driver's license"] && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Car className="w-4 h-4" />
                      <span>{optionalPersonalData["Driver's license"]}</span>
                    </div>
                  )}

                  {optionalPersonalData["Website"] && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span>{optionalPersonalData["Website"]}</span>
                    </div>
                  )}

                  {optionalPersonalData["LinkedIn"] && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Linkedin className="w-4 h-4" />
                      <span>{optionalPersonalData["LinkedIn"]}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile */}
              {profile && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Profile
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{profile}</p>
                </div>
              )}

              {/* Experience */}
              {experience.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    Employment
                  </h2>
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-blue-200 pl-4">
                        <h3 className="font-medium text-gray-800">{exp.jobTitle}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-600">
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </p>
                        {exp.description && <p className="text-gray-700 mt-2">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    Education
                  </h2>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id} className="border-l-2 border-blue-200 pl-4">
                        <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                        <p className="text-blue-600 font-medium">{edu.school}</p>
                        <p className="text-sm text-gray-600">{edu.location}</p>
                        <p className="text-sm text-gray-600">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    Skills
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex justify-between items-center">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-sm text-blue-600 font-medium">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {languages.length > 0 && languages.some((lang) => lang.trim()) && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {languages
                      .filter((lang) => lang.trim())
                      .map((language, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {language}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Courses */}
              {courses.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    Courses
                  </h2>
                  <div className="space-y-3">
                    {courses.map((course) => (
                      <div key={course.id} className="border-l-2 border-blue-200 pl-4">
                        <h3 className="font-medium text-gray-800">{course.name}</h3>
                        <p className="text-blue-600">{course.institution}</p>
                        <p className="text-sm text-gray-600">{course.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates */}
              {certificates.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    Certificates
                  </h2>
                  <div className="space-y-3">
                    {certificates.map((certificate) => (
                      <div key={certificate.id} className="border-l-2 border-blue-200 pl-4">
                        <h3 className="font-medium text-gray-800">{certificate.name}</h3>
                        <p className="text-blue-600">{certificate.issuer}</p>
                        <p className="text-sm text-gray-600">{certificate.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* References */}
              {references.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    References
                  </h2>
                  <div className="space-y-4">
                    {references.map((reference) => (
                      <div key={reference.id} className="border-l-2 border-blue-200 pl-4">
                        <h3 className="font-medium text-gray-800">{reference.name}</h3>
                        <p className="text-blue-600">{reference.position}</p>
                        <p className="text-gray-600">{reference.company}</p>
                        <div className="text-sm text-gray-600 mt-1">
                          <p>{reference.email}</p>
                          <p>{reference.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hobbies */}
              {hobbies.length > 0 && hobbies.some((hobby) => hobby.trim()) && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-blue-600" />
                    Hobbies
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {hobbies
                      .filter((hobby) => hobby.trim())
                      .map((hobby, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {hobby}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Signature */}
              {signature && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-gray-700 italic">{signature}</p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <div className="w-4 h-4 border border-gray-400"></div>
                </Button>
                <div className="relative" ref={dropdownRef}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => setOpenDropdown(openDropdown === 'font' ? null : 'font')}
                  >
                    Aa
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                  {openDropdown === 'font' && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                    <div className="py-1">
                      <button
                        onClick={() => setSelectedFont("Inter")}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                          selectedFont === "Inter" ? "bg-blue-50 text-blue-600" : ""
                        }`}
                        style={{ fontFamily: "Inter" }}
                      >
                        Inter
                      </button>
                      <button
                        onClick={() => setSelectedFont("Arial")}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                          selectedFont === "Arial" ? "bg-blue-50 text-blue-600" : ""
                        }`}
                        style={{ fontFamily: "Arial" }}
                      >
                        Arial
                      </button>
                      <button
                        onClick={() => setSelectedFont("Times New Roman")}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                          selectedFont === "Times New Roman" ? "bg-blue-50 text-blue-600" : ""
                        }`}
                        style={{ fontFamily: "Times New Roman" }}
                      >
                        Times New Roman
                      </button>
                      <button
                        onClick={() => setSelectedFont("Georgia")}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                          selectedFont === "Georgia" ? "bg-blue-50 text-blue-600" : ""
                        }`}
                        style={{ fontFamily: "Georgia" }}
                      >
                        Georgia
                      </button>
                      <button
                        onClick={() => setSelectedFont("Verdana")}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                          selectedFont === "Verdana" ? "bg-blue-50 text-blue-600" : ""
                        }`}
                        style={{ fontFamily: "Verdana" }}
                      >
                        Verdana
                      </button>
                    </div>
                  </div>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-400"></div>
                  <ChevronDown className="w-3 h-3" />
                </Button>
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => setOpenDropdown(openDropdown === 'format' ? null : 'format')}
                  >
                    ≡
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                  {openDropdown === 'format' && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[200px]">
                      <div className="p-3 space-y-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setTextFormatting(prev => ({ ...prev, bold: !prev.bold }))}
                            className={`p-2 rounded ${textFormatting.bold ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                          >
                            <strong>B</strong>
                          </button>
                          <button
                            onClick={() => setTextFormatting(prev => ({ ...prev, italic: !prev.italic }))}
                            className={`p-2 rounded ${textFormatting.italic ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                          >
                            <em>I</em>
                          </button>
                          <button
                            onClick={() => setTextFormatting(prev => ({ ...prev, underline: !prev.underline }))}
                            className={`p-2 rounded ${textFormatting.underline ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                          >
                            <u>U</u>
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Size:</span>
                          <select
                            value={textFormatting.fontSize}
                            onChange={(e) => setTextFormatting(prev => ({ ...prev, fontSize: e.target.value }))}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="12px">12px</option>
                            <option value="14px">14px</option>
                            <option value="16px">16px</option>
                            <option value="18px">18px</option>
                            <option value="20px">20px</option>
                            <option value="24px">24px</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Alignment:</span>
                          <div className="flex gap-1">
                            <button className="p-1 hover:bg-gray-100 rounded">⫷</button>
                            <button className="p-1 hover:bg-gray-100 rounded">⫸</button>
                            <button className="p-1 hover:bg-gray-100 rounded">⫹</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => setOpenDropdown(openDropdown === 'color' ? null : 'color')}
                  >
                    🎨
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                  {openDropdown === 'color' && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[250px]">
                      <div className="p-3 space-y-3">
                        <div>
                          <span className="text-sm text-gray-600 block mb-2">Theme Colors:</span>
                          <div className="grid grid-cols-6 gap-2">
                            {['blue', 'green', 'purple', 'red', 'orange', 'gray'].map((color) => (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-8 h-8 rounded-full border-2 ${
                                  selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                                }`}
                                style={{
                                  backgroundColor: color === 'blue' ? '#3B82F6' :
                                                color === 'green' ? '#10B981' :
                                                color === 'purple' ? '#8B5CF6' :
                                                color === 'red' ? '#EF4444' :
                                                color === 'orange' ? '#F59E0B' :
                                                '#6B7280'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600 block mb-2">Custom Colors:</span>
                          <div className="grid grid-cols-6 gap-2">
                            {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'].map((color) => (
                              <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-6 h-6 rounded border ${
                                  selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                                }`}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600 block mb-2">Text Color:</span>
                          <input
                            type="color"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <div className="w-4 h-4 border border-gray-400 flex items-center justify-center">⛶</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}