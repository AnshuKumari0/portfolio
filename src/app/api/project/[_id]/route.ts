import { NextRequest, NextResponse } from "next/server";
import Project, { validateProject } from "@/app/models/project";
import { dbConnect } from "@/utils/db";

dbConnect();

/*edit project */
export async function PUT(
  req: Request,
  { params }: { params: { _id: string } }
) {
  try {
    const id = params._id;

    const body = await req.json();
    const { error, value } = validateProject.validate(body);

    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { name, description, filename, techstack, projectlink, editor } =
      value;

    const project = await Project.findById({ _id: id });

    if (!project) {
      return NextResponse.json(
        {
          error: "Project post not found",
        },
        {
          status: 404,
        }
      );
    }
    // Update the properties of the existing project post
    project.name = name;
    project.description = description;
    project.filename = filename;
    project.techstack = techstack;
    project.projectlink = projectlink;
    project.editor = editor;

    // Save the updated project post
    await project.save();
    // Return a success response after edit the project
    return NextResponse.json(
      {
        message: "Project post updated successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to edit project.",
      },
      {
        status: 500,
      }
    );
  }
}

/* delete project */
export async function DELETE(
  request: Request,
  { params }: { params: { _id: string } }
) {
  try {
    const id = params._id;

    // Find the project by its ID and remove it from the database
    const deletedProject = await Project.findByIdAndDelete({ _id: id });

    if (!deletedProject) {
      // If the Project with the given ID is not found, return a 404 Not Found response
      return NextResponse.json(
        {
          error: "Project not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Return a success response after deleting the Project
    return NextResponse.json(
      {
        message: "Project deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete project.",
      },
      {
        status: 500,
      }
    );
  }
}
