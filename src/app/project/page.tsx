"use client";

import React, { useState, useEffect } from "react";
import { ProjectsData } from "../types/project";
import ProjectCard from "./ProjectCard";
import { SectionWrapper } from "../hoc";

const ProjectPage = () => {
  const [projects, setProjects] = useState<ProjectsData[]>([]);
  const [isLoading, setLoading] = useState(false);

  const getAllProjects = () => {
    setLoading(true);
    fetch("/api/project", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch projects");
        }
      })
      .then((result) => {
        const reversedData = result.projects.reverse();
        setProjects(reversedData);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="py-8">
      <ProjectCard data={projects} loading={isLoading} />
    </div>
  );
};

export default SectionWrapper(ProjectPage, "");
