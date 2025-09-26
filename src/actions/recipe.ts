import { Recipe } from "@/generated/prisma";
import { prisma } from "@/utils/prisma";

export const getRecipes = async (): Promise<{
  success: boolean;
  data?: Recipe[];
  message?: string;
}> => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        RecipeIngredient: {
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
  data?: Recipe;
  message?: string;
}> => {
  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        name: recipe.name,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
      },
    });
    return { success: true, data: newRecipe };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error creating recipe" };
  }
};
