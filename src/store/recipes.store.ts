"use client";
import { create } from "zustand";
import { CreateRecipeDto, IRecipe } from "@/types/form-data";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
} from "@/actions/recipe";

interface RecipesStore {
  recipes: IRecipe[];
  isLoading: boolean;
  loadRecipes: () => Promise<void>;
  addRecipe: (formData: CreateRecipeDto) => Promise<void>;
  removeRecipe: (recipeId: string) => Promise<void>;
  updateRecipe: (recipe: CreateRecipeDto & { id: string }) => Promise<void>;
}

export const useRecipesStore = create<RecipesStore>((set, get) => ({
  recipes: [],
  isLoading: false,
  loadRecipes: async () => {
    set({ isLoading: true });
    try {
      const { data } = await getRecipes();
      set({ recipes: data ?? [] });
    } catch (e) {
      set({ recipes: [] });
      console.error("Error while getting recipes", e);
    } finally {
      set({ isLoading: false });
    }
  },
  addRecipe: async (formData: CreateRecipeDto) => {
    set({ isLoading: true });
    try {
      await createRecipe(formData);
      await get().loadRecipes();
    } catch (e) {
      console.error("Error while adding recipe", e);
    } finally {
      set({ isLoading: false });
    }
  },
  removeRecipe: async (recipeId: string) => {
    set({ isLoading: true });
    try {
      await deleteRecipe(recipeId);
      await get().loadRecipes();
    } catch (e) {
      console.error("Error while removing recipe", e);
    } finally {
      set({ isLoading: false });
    }
  },
  updateRecipe: async (recipe: CreateRecipeDto & { id: string }) => {
    set({ isLoading: true });
    try {
      await updateRecipe(recipe);
      await get().loadRecipes();
    } catch (e) {
      console.error("Error while updating recipe", e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
