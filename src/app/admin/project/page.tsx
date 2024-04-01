"use client";

import {
  Box,
  Drawer,
  Grid,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import "react-quill/dist/quill.snow.css";
const ReactQuill = typeof window === "object" ? require("react-quill") : null;

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer
//       sx={{
//         borderBottomWidth: "thin",
//         flex: 1,
//         justifyContent: "end",
//         alignContent: "end",
//       }}
//     >
//       <GridToolbarColumnsButton
//         sx={{
//           color: "#CCCCCC",
//           p: 0.5,
//           m: 0.5,
//         }}
//       />
//       <GridToolbarFilterButton
//         sx={{
//           color: "#CCCCCC",
//           p: 0.5,
//           m: 0.5,
//         }}
//       />
//       <GridToolbarDensitySelector
//         sx={{
//           color: "#CCCCCC",
//           p: 0.5,
//           m: 0.5,
//         }}
//       />
//       <GridToolbarExport
//         sx={{
//           color: "#CCCCCC",
//           p: 0.5,
//           m: 0.5,
//         }}
//         csvOptions={{
//           fields: ["_id", "title", "subtitle", "techStack", "editor"],
//         }}
//       />
//     </GridToolbarContainer>
//   );
// }

import { ProductValues, ProjectsData } from "../../types/project";

const handleLink = (value: string, { href }: { href: string }): JSX.Element => {
  return <Link href={href}>{value}</Link>;
};
//colors for project editor
const colors = [
  "red",
  "#21c662",
  "blue",
  "orange",
  "violet",
  "purple",
  "yellow",
  "pink",
  "brown",
  "gray",
  "teal",
  "cyan",
  "white",
  "black",
  "midnight",
  "bermuda",
  "Lime",
  "Emerald",
  "Indigo",
  "Pink",
];

//modules for project editor
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [
      {
        link: {
          add: handleLink,
        },
      },
    ],
    ["image", "video"],
    [{ color: colors }],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "blockquote",
  "codd-block",
  "list",
  "direction",
  "align",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "formula",
];

/** Project components */
export default function Product() {
  const [projects, setGetProjects] = useState<ProjectsData[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [addEditLoading, setAddEditLoading] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [searchProject, setSearchProject] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<ProjectsData[]>([]);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const [editRowId, setEditRowId] = useState<number | null>(null);

  //On change text on editor
  const onChange = (newEditor: any) => {
    const links = newEditor.match(/(\[[^\[\]]+\])/g);
    if (links) {
      for (const link of links) {
        newEditor = newEditor.replace(link, handleLink(link, { href: link }));
      }
    }

    formik.setFieldValue("editor", newEditor);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.3,
      editable: false,
    },

    {
      field: "filename",
      headerName: "Image",
      minWidth: 100,
      flex: 0.1,
      editable: false,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 120,
      flex: 0.1,
      editable: false,
    },
    {
      field: "techstack",
      headerName: "Teck Stack",
      minWidth: 150,
      flex: 0.1,
      editable: false,
    },
    {
      field: "projectlink",
      headerName: "Project Link",
      minWidth: 150,
      flex: 0.1,
      editable: false,
    },
    {
      field: "githublink",
      headerName: "Github Link",
      minWidth: 150,
      flex: 0.1,
      editable: false,
    },

    {
      field: "editor",
      headerName: "Editor",
      type: "number",
      minWidth: 200,
      flex: 0.5,
      editable: false,
    },
    {
      field: "edit",
      headerName: "Edit",
      type: "number",
      minWidth: 80,
      flex: 0.1,
      editable: false,
      renderCell: (params: any) => {
        const handleEdit = async (ev: React.FormEvent) => {
          ev.preventDefault();
          const editData = params.row;
          setEditRowId(editData._id);
          setOpenDrawer(true);

          // // Set formik values using setFieldValue for each field
          formik.setFieldValue("name", editData.name);
          formik.setFieldValue("filename", editData.filename);
          formik.setFieldValue("description", editData.description);
          formik.setFieldValue("techstack", editData.techstack);
          formik.setFieldValue("projectlink", editData.projectlink);
          formik.setFieldValue("githublink", editData.githublink);
          formik.setFieldValue("editor", editData.editor);
        };
        return (
          <CiEdit onClick={handleEdit} className="text-2xl text-primary" />
        );
      },
    },

    {
      field: "delete",
      headerName: "Delete",
      minWidth: 70,
      flex: 0.1,
      renderCell: (params: any) => {
        const handleOpen = () => {
          setSelectedRowId(params.row._id);
          setOpenDeleteModel(true);
        };

        const handleClose = () => {
          setOpenDeleteModel(false);
        };

        const handleDeleteProject = async () => {
          try {
            const response = await fetch(`/api/project/${params.row._id}`, {
              method: "DELETE",
            });

            if (response.status === 200) {
              toast.success("Project deleted successfully!");
              setGetProjects((prevProducts) =>
                prevProducts.filter((item) => item._id !== params.row._id)
              );
              getAllProjects(); // Refresh project list after deleting a project
            } else {
              toast.error("Failed to delete the project.");
            }
          } catch (error) {
            console.log(error);
            toast.error("Failed to delete the project.");
          } finally {
            setOpenDeleteModel(false);
          }
        };

        return (
          <div>
            <MdDeleteOutline
              onClick={handleOpen}
              className="text-2xl text-danger"
            />
            <Dialog
              open={openDeleteModel && selectedRowId === params.row._id}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" sx={{ fontSize: "1rem" }}>
                Are you sure, you want to proceed <br />
                with deleting this project?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description"></DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} className="text-md font-bold">
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteProject}
                  autoFocus
                  className="text-md font-bold text-danger"
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      },
    },
  ];

  //validate form
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Project name is required*"),
    filename: Yup.string().required("Image upload is required*"),
    description: Yup.string().required("Project description is required*"),
    techstack: Yup.string().required("Teck stack is required*"),
    // projectlink: Yup.string().required("Project link is required*"),
    // githublink: Yup.string().required("Github link is required*"),
    editor: Yup.string().required("Editor content is required*"),
  });

  //handle form
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      filename: "",
      techstack: "",
      projectlink: "",
      githublink: "",
      editor: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      editRowId ? handleEditProject(values) : handleAddProject(values);
    },
  });
  // Call api for upload file for the project
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const data = new FormData();
    data.append("file", selectedFile);

    try {
      let result = await fetch("/api/upload", { method: "POST", body: data });

      if (result.status === 200) {
        const jsonResult = await result.json();
        formik.setFieldValue("filename", selectedFile.name);
      } else {
        const jsonResult = await result.json();
        alert(`Failed to upload file: ${jsonResult.message}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  //handle add project submission
  const handleAddProject = async (values: ProductValues) => {
    try {
      setAddEditLoading(true);
      const response = await fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(result.message);

        setTimeout(() => {
          formik.resetForm();
          setOpenDrawer(false);
        }, 2000);
        getAllProjects();
      } else {
        setAddEditLoading(false);
        toast.error("Failed to create project");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating the project");
    } finally {
      setAddEditLoading(false);
    }
  };

  const handleEditProject = async (values: ProductValues) => {
    try {
      setAddEditLoading(true);
      const response = await fetch(`/api/project/${editRowId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);

        toast.success(result.message);
        setTimeout(() => {
          formik.resetForm();
          setOpenDrawer(false);
          setEditRowId(null);
        }, 2000);
        getAllProjects();
      } else {
        setAddEditLoading(false);
        toast.error("Failed to create project");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while editing the project");
    } finally {
      setAddEditLoading(false);
    }
  };

  console.log(formik.values);

  //Get all projects
  const getAllProjects = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch("/api/project", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        const result = await response.json();

        const reversedData = result.projects.reverse();
        setGetProjects(reversedData);
        setFilteredProjects(reversedData);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // call get all projects methods
  useEffect(() => {
    getAllProjects();
  }, []);

  const filterProjects = (searchProject: string) => {
    const filtered = projects.filter((item) =>
      item.name.toLowerCase().includes(searchProject.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  return (
    <div className="bg-background px-4 py-10 lg:px-10 flex justify-center">
      <div className="w-full lg:w-[80%]">
        <div className="lg:flex lg:flex-row">
          <div className="w-full lg:w-[70%]">
            <input
              type="text"
              id="searchproject"
              name="searchproject"
              placeholder="Search project by title"
              className="w-full bg-secondary text-sm rounded-md border border-primary focus:border-black outline-none text-accent py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={searchProject}
              onChange={(e) => {
                setSearchProject(e.target.value);
                filterProjects(e.target.value);
              }}
            />
          </div>
          <div className="w-full lg:ml-4 mt-4 lg:mt-0">
            <button
              className="text-accent text-[14px] font-mono bg-primary hover:bg-secondary transition-all rounded-md w-[220px] h-10 flex items-center justify-center whitespace-nowrap"
              type="button"
              onClick={() => setOpenDrawer(true)}
            >
              Add Project
            </button>
          </div>
        </div>
        <Drawer anchor="right" open={openDrawer} keepMounted={false}>
          <Grid
            container
            sx={{
              width: {
                lg: 600,
                xl: 600,
                md: 400,
                sm: 400,
                xs: 350,
              },
              p: {
                lg: 8,
                xl: 8,
                md: 6,
                sm: 6,
                xs: 2,
              },
            }}
            role="presentation"
          >
            <form onSubmit={formik.handleSubmit}>
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12} xl={12}>
                  <h2 className="text-2xl">Add Project</h2>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="h-10 block w-full rounded-md border border-gray-400 pl-4 sm:text-sm mt-6"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-danger text-sm">
                      {String(formik.errors.name)}
                    </div>
                  )}
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="h-10 block w-full rounded-md border border-gray-400 pl-4 sm:text-sm mt-6"
                    placeholder="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-danger text-sm">
                      {String(formik.errors.description)}
                    </div>
                  )}

                  <input
                    type="file"
                    name="filename"
                    id="filename"
                    className="h-10 block w-full rounded-md border border-gray-400 pl-4 sm:text-sm mt-6"
                    placeholder="Upload image"
                    onChange={handleFileUpload}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.filename && formik.errors.filename && (
                    <div className="text-danger text-sm">
                      {String(formik.errors.filename)}
                    </div>
                  )}
                  <input
                    type="text"
                    name="techstack"
                    id="techstack"
                    className="h-10 block w-full rounded-md border border-gray-400 pl-4 sm:text-sm mt-6"
                    placeholder="Tech Stack"
                    value={formik.values.techstack}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.techstack && formik.errors.techstack && (
                    <div className="text-danger text-sm">
                      {String(formik.errors.techstack)}
                    </div>
                  )}
                  <input
                    type="text"
                    name="projectlink"
                    id="projectlink"
                    className="h-10 block w-full rounded-md border border-gray-400 pl-4 sm:text-sm mt-6"
                    placeholder="Project Link"
                    value={formik.values.projectlink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  <input
                    type="text"
                    name="githublink"
                    id="githublink"
                    className="h-10 block w-full rounded-md border border-gray-400 pl-4 sm:text-sm mt-6"
                    placeholder="Github Link"
                    value={formik.values.githublink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  <ReactQuill
                    theme={"snow"}
                    modules={modules}
                    formats={formats}
                    value={formik.values.editor}
                    onChange={onChange}
                    className="mt-6"
                  />
                  {formik.touched.editor && formik.errors.editor && (
                    <div className="text-danger text-sm">
                      {String(formik.errors.editor)}
                    </div>
                  )}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  xl={12}
                  sx={{ display: "flex", p: 2 }}
                >
                  <button
                    className="m-1 text-black border border-gray-300 text-[14px] font-mono bg-gray-200 hover:bg-gray-700 hover:text-white transition-all rounded-md w-[220px] h-10 flex items-center justify-center whitespace-nowrap"
                    type="button"
                    onClick={() => {
                      setOpenDrawer(false);
                      formik.resetForm(); // Reset the form on button click
                      setEditRowId(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="m-1 text-white text-[14px] font-mono bg-black hover:bg-gray-700 transition-all rounded-md w-[220px] h-10 flex items-center justify-center whitespace-nowrap"
                    type="submit"
                  >
                    {addEditLoading ? "Submitting..." : "Submit"}
                  </button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Drawer>
        <Grid>
          <Toaster position="bottom-right" reverseOrder={false} />
        </Grid>

        <div className="mt-8 w-full p-2 bg-secondary text-white">
          <DataGrid
            loading={isLoading}
            rows={filteredProjects}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[8]}
            disableRowSelectionOnClick
            // slots={{ toolbar: CustomToolbar }}
            autoHeight
            // className="border border-secondary text-white"
            style={{ color: "white", border: "#1d1836" }}
          />
        </div>
      </div>
    </div>
  );
}
