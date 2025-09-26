"use client";
import IngredientForm from "@/forms/ingredient.form";
import { FormikProvider, useFormik } from "formik";
import { CreateIngredient } from "@/types/form-data";
import { addToast } from "@heroui/react";
import { createIngredientSchema } from "@/schema/ingredient.schema";
import { useIngredientStore } from "@/store/ingredient.store";
import IngredientTable from "@/components/ui/tables/ingredient.table";
import { useAuthStore } from "@/store/auth.store";

const IngredientsPage = () => {
  const { addIngredient } = useIngredientStore();
  const { isAuth } = useAuthStore();
  const formik = useFormik<CreateIngredient>({
    initialValues: {
      name: "",
      category: null,
      unit: null,
      price: null,
      description: "",
    },
    validationSchema: createIngredientSchema,
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      try {
        await addIngredient(values);
        formikHelpers.setSubmitting(false);
        addToast({
          title: "Инградиент успешно добавлен",
          color: "success",
        });
        formikHelpers.resetForm();
      } catch (e) {
        addToast({
          title: "Ошибка при добавлении ингредиента",
          color: "danger",
        });
        console.error(e);
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
  });

  if (!isAuth) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FormikProvider value={formik}>
        <IngredientForm />
        <IngredientTable />
      </FormikProvider>
    </div>
  );
};

export default IngredientsPage;
