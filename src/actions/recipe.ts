"use server";
import { Recipe } from "@/generated/prisma";
import { CreateRecipeDto, IRecipe } from "@/types/form-data";
import { prisma } from "@/utils/prisma";
import { createRecipeSchema, updateRecipeSchema } from "@/schema/recipe.schema";

export const getRecipes = async (): Promise<{
  success: boolean;
  data?: IRecipe[];
  message?: string | null;
}> => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
    return { success: true, data: recipes };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error getting recipes" };
  }
};

export const createRecipe = async (
  recipe: CreateRecipeDto
): Promise<{
  success: boolean;
  data?: IRecipe | null;
  message?: string | null;
}> => {
  try {
    if (!recipe.ingredients.length) {
      return { success: false, message: "Ingredients are required" };
    }

    const validatedData = await createRecipeSchema.validate(recipe);
    const newRecipe = await prisma.recipe.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        imageUrl: validatedData.imageUrl,
        ingredients: {
          create: (validatedData?.ingredients || []).map((ingredient) => ({
            ingredient: {
              connect: {
                id: ingredient.id,
              },
            },
            quantity: ingredient.quantity,
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
    return { success: true, data: newRecipe };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error creating recipe" };
  }
};

export const updateRecipe = async (
  recipe: CreateRecipeDto & { id: string }
): Promise<{
  success: boolean;
  data?: Recipe;
  message?: string;
}> => {
  try {
    const validatedData = await updateRecipeSchema.validate(recipe);
    const updatedRecipe = await prisma.recipe.update({
      where: { id: recipe.id },
      data: {
        name: validatedData?.name,
        description: validatedData?.description,
        imageUrl: validatedData?.imageUrl,
        ingredients: {
          update: (validatedData?.ingredients || []).map((ingredient) => ({
            where: {
              recipeId_ingredientId: {
                recipeId: recipe.id,
                ingredientId: ingredient.id,
              },
            },
            data: {
              ingredient: {
                connect: {
                  id: ingredient.id,
                },
              },
              quantity: ingredient.quantity,
            },
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
    return { success: true, data: updatedRecipe };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error updating recipe" };
  }
};

export const deleteRecipe = async (
  recipeId: string
): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    await prisma.recipeIngredient.deleteMany({ where: { recipeId } });
    await prisma.recipe.delete({ where: { id: recipeId } });
    return { success: true, message: "Recipe deleted successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error deleting recipe" };
  }
};
