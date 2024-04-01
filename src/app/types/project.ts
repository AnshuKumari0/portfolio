export interface ProductValues {
  name: string;
  description: string;
  filename: string;
  techstack: string;
  projectlink: string;
  githublink: string;
  editor: string;
}

export interface ProjectsData {
  _id: string;
  name: string;
  description: string;
  filename: string;
  techstack: string;
  projectlink: string;
  githublink: string;
  editor: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCardProps {
  data: ProjectsData[];
  loading: boolean;
}
