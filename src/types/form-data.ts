import {Category, Unit} from "@/generated/prisma";

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
