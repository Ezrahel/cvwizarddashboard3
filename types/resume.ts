export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  summary: string
  postCode?: string
  desiredPosition?: string
  useAsHeadline?: boolean
}

export interface Experience {
  id: string
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  position?: string
}

export interface Education {
  id: string
  degree: string
  school: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  institution?: string
  fieldOfStudy?: string
}

export interface Skill {
  id: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

export interface Resume {
  id: string
  title: string
  template: string
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  languages?: string[]
  hobbies?: string[]
  createdAt: string
  updatedAt: string
}

export interface ResumeTemplate {
  id: string
  name: string
  description: string
  preview: string
  color: string
}
