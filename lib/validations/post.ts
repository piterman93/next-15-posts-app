import * as yup from "yup";

export const postFormSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),
  content: yup
    .string()
    .required("Content is required")
    .min(20, "Content must be at least 20 characters")
    .max(5000, "Content must be less than 5000 characters"),
  imageUrl: yup
    .string()
    .required("Image URL is required")
    .url("Please enter a valid URL"),
});

export type PostFormData = yup.InferType<typeof postFormSchema>;
