import React from "react";
import Link from "next/link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { dbConnect } from "@/utils/db";

import { ProjectsData } from "../../types/project";
import Project from "@/app/models/project";

const getData = async (_id: string): Promise<ProjectsData | null> => {
  try {
    await dbConnect();
    const blog = await Project.findOne({ _id: _id });
    return blog as unknown as ProjectsData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const ProjectById = async ({ params }: { params: { _id: string } }) => {
  const productsDataSeoId: ProjectsData | null = await getData(params._id);

  return (
    <div className="flex justify-center p-8 px-14 lg:px-0 py-16">
      <div className="w-full lg:w-3/5">
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/" className="hover:underline">
              <h2 className="text-primary font-bold underline">Home</h2>
            </Link>

            <h2 className="text-white font-semibold">
              {productsDataSeoId !== null && productsDataSeoId.name}
            </h2>
          </Breadcrumbs>
        </div>

        <div>
          <div>
            <h2 className="text-2xl text-white mb-4 mt-4">
              {productsDataSeoId !== null && productsDataSeoId.description}
            </h2>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: productsDataSeoId !== null && productsDataSeoId.editor,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectById;
