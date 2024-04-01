import mongoose, { Schema, Document } from "mongoose";
import Joi from "joi";

export interface IProject extends Document {
  name: string;
  description: string;
  filename: string;
  techstack: string;
  projectlink: string;
  editor: string;
}

const projectSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    techstack: {
      type: String,
      required: true,
    },
    projectlink: {
      type: String,
      required: false,
    },
    githublink: {
      type: String,
      required: false,
    },
    editor: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.projects ||
  mongoose.model<IProject>("projects", projectSchema);

export default Project;

//validation
export const validateProject = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  filename: Joi.string().required(),
  techstack: Joi.string().required(),
  projectlink: Joi.string().allow(""),
  githublink: Joi.string().allow(""),
  editor: Joi.string().required(),
});
