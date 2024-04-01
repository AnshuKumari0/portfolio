import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/db";
import Project, { validateProject } from "@/app/models/project";

dbConnect();

/* Create Project */
export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const { error, value } = validateProject.validate(body);
  if (error) {
    return NextResponse.json(
      { error: error.details[0].message },
      { status: 400 }
    );
  }

  const {
    name,
    description,
    filename,
    techstack,
    projectlink,
    githublink,
    editor,
  } = value;

  try {
    const project = new Project({
      name,
      description,
      filename,
      techstack,
      projectlink,
      githublink,
      editor,
    });

    await project.save();

    return NextResponse.json(
      {
        message: "One more project created.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to create a project.",
      },
      {
        status: 500,
      }
    );
  }
}

/* Get project */
export async function GET(req: Request, res: Response) {
  try {
    //get project from db
    const projects = await Project.find();

    //Return the project data as a response
    return NextResponse.json(
      {
        projects: projects,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch project.",
      },
      {
        status: 500,
      }
    );
  }
}
