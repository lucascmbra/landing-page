export type CourseModality = {
  name: string
}

export type Course = {
  name: string
  modalities: CourseModality[]
  category: string
}
