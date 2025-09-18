"use client";
import IngredientForm from "@/forms/ingredient.form";
import {FormikProvider, useFormik} from "formik";
import {createIngredient} from "@/actions/ingredient";
import {CreateIngredient} from "@/types/form-data";
import {addToast} from "@heroui/react";
import {createIngredientSchema} from "@/schema/ingredient.schema";

const IngredientsPage = () => {
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
    onSubmit: async (values,formikHelpers) => {
      try {
        await createIngredient(values);
        formikHelpers.setSubmitting(false);
        addToast({
          title: "Инградиент успешно добавлен",
          color: "success",
        });
        formikHelpers.resetForm();
      }catch (e) {
        addToast({
            title: "Ошибка при добавлении ингредиента",
            color: "danger",
        });
        console.error(e);
      }finally {
        formikHelpers.setSubmitting(false);
      }

    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FormikProvider value={formik}>
        <IngredientForm />
      </FormikProvider>
    </div>
  );
};

export default IngredientsPage;
