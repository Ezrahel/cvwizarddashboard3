import { useState, useEffect } from 'react'
import { Resume } from '../types/resume'

export function useResumes() {
  const [resumes, setResumes] = useState<Resume[]>([])

  useEffect(() => {
    const savedResumes = localStorage.getItem('cvwizard-resumes')
    if (savedResumes) {
      setResumes(JSON.parse(savedResumes))
    }
  }, [])

  const saveResumes = (newResumes: Resume[]) => {
    setResumes(newResumes)
    localStorage.setItem('cvwizard-resumes', JSON.stringify(newResumes))
  }

  const addResume = (resume: Resume) => {
    const newResumes = [...resumes, resume]
    saveResumes(newResumes)
  }

  const updateResume = (id: string, updatedResume: Partial<Resume>) => {
    const newResumes = resumes.map(resume => 
      resume.id === id 
        ? { ...resume, ...updatedResume, updatedAt: new Date().toISOString() }
        : resume
    )
    saveResumes(newResumes)
  }

  const deleteResume = (id: string) => {
    const newResumes = resumes.filter(resume => resume.id !== id)
    saveResumes(newResumes)
  }

  const getResume = (id: string) => {
    return resumes.find(resume => resume.id === id)
  }

  return {
    resumes,
    addResume,
    updateResume,
    deleteResume,
    getResume
  }
}
