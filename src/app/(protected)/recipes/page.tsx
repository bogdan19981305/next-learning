"use client";
import { useRecipesStore } from "@/store/recipes.store";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Spinner,
  Divider,
} from "@heroui/react";
import { CreateRecipeDto, IRecipe, IRecipeIngredient } from "@/types/form-data";
import RecipeForm from "@/forms/recipe.form";
import { FormikProvider, useFormik } from "formik";

const RecipesPage = () => {
  const { recipes, isLoading, removeRecipe } = useRecipesStore();

  const formik = useFormik<CreateRecipeDto>({
    initialValues: {
      name: "",
      description: "",
      imageUrl: "",
      ingredients: [],
    },
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center bg-gray-900 h-full w-full z-10 opacity-90 min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <>
      <FormikProvider value={formik}>
        <RecipeForm />
      </FormikProvider>
      <div className="gap-5 grid grid-cols-2 sm:grid-cols-4 w-[1600px] container mx-auto">
        {(recipes ?? []).map((item: IRecipe) => (
          <Card
            key={item.id}
            isPressable
            shadow="sm"
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.name}
                className="w-full object-cover h-[240px]"
                radius="lg"
                shadow="sm"
                src={item.imageUrl || ""}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small gap-2 flex flex-col">
              <h4 className="font-bold text-lg">{item.name}</h4>
              <p className="text-default-500 align-start w-full text-center">
                {item.description}
              </p>
              <Divider />
              <div className="">
                <ul className="flex flex-col gap-2">
                  {(item?.ingredients ?? []).map(
                    (ingredient: IRecipeIngredient) => (
                      <>
                        <p key={ingredient.id}>
                          {ingredient?.ingredient?.name} - {ingredient.quantity}{" "}
                          {ingredient?.ingredient?.unit}
                        </p>
                      </>
                    )
                  )}
                </ul>
              </div>
              <Divider />
              <div className="flex justify-between w-full gap-2">
                <Button variant="bordered" color="primary">
                  Просмотреть
                </Button>
                <Button variant="bordered" color="warning">
                  Редактировать
                </Button>
                <Button
                  variant="bordered"
                  color="danger"
                  onPress={() => removeRecipe(item.id)}
                >
                  Удалить
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default RecipesPage;
