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
