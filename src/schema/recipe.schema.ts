import * as yup from "yup";
export const createRecipeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  imageUrl: yup.string().required("Image URL is required"),
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required("Ingredient ID is required"),
        quantity: yup.number().required("Quantity is required"),
      })
    )
    .min(2, "At least two ingredients are required"),
});

export const updateRecipeSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  imageUrl: yup.string(),
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required("Ingredient ID is required"),
        quantity: yup.number().required("Quantity is required"),
      })
    )
    .min(2, "At least two ingredients are required"),
});
