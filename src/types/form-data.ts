import { Category, Unit, Ingredient } from "@/generated/prisma";

export interface IFormDataRegister {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface CreateIngredient {
  name: string;
  category: Category | null;
  unit: Unit | null;
  price: number | null;
  description: string | null;
}

export interface CreateRecipeDto {
  name: string;
  description: string | null;
  imageUrl: string | null;
  ingredients: IRecipeIngredient[];
}

export interface IRecipeIngredient {
  id: string;
  quantity: number;
  ingredient: Ingredient;
}

export interface IRecipe {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  ingredients: IRecipeIngredient[];
  createdAt: Date;
  updatedAt: Date;
}
