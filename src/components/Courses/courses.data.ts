import type { Course } from "./courses.types"

export const COURSES: Course[] = [
  {
    name: "Big Data Ecosystem",
    modalities: [{ name: "Remoto" }, { name: "Live" }],
    category: "Tecnologia",
  },
  {
    name: "Creating Dashboards for BI",
    modalities: [{ name: "Remoto" }, { name: "Live + Multimídia" }],
    category: "Tecnologia",
  },
  {
    name: "Big Data Science - Machine Learning & Data Mining",
    modalities: [{ name: "Remoto" }, { name: "Live" }],
    category: "Tecnologia",
  },
  {
    name: "Storytelling",
    modalities: [{ name: "Remoto" }, { name: "Live + Multimídia" }],
    category: "Tecnologia",
  },
  {
    name: "UX",
    modalities: [{ name: "Remoto" }, { name: "Live" }],
    category: "Inovação",
  },
  {
    name: "UX Writing",
    modalities: [{ name: "Remoto" }],
    category: "Inovação",
  },
  {
    name: "Chatbots",
    modalities: [{ name: "Remoto" }, { name: "Live + Multimídia" }],
    category: "Inovação",
  },
  {
    name: "Agile Culture",
    modalities: [{ name: "Live" }],
    category: "Negócios",
  },
  {
    name: "DPO Data Protection Officer",
    modalities: [{ name: "Remoto" }, { name: "Live" }],
    category: "Negócios",
  },
  {
    name: "IT Business Partner",
    modalities: [{ name: "Remoto" }, { name: "Live + Multimídia" }],
    category: "Negócios",
  },
  {
    name: "Perícia Forense Computacional",
    modalities: [{ name: "Remoto" }, { name: "Live + Multimídia" }],
    category: "Negócios",
  },
  {
    name: "Growth Hacking",
    modalities: [{ name: "Remoto" }],
    category: "Negócios",
  },
]

export const EXIT_STAGGER = 70
export const BASE_EXIT_DURATION = 420
