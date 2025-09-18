'use server';

import {CreateIngredient} from "@/types/form-data";
import {createIngredientSchema} from "@/schema/ingredient.schema";
import {prisma} from "@/utils/prisma";
import {Category, Ingredient, Unit} from "@/generated/prisma";

export const createIngredient = async (formData: CreateIngredient) => {
    try {
        const validatedData = await createIngredientSchema.validate(formData);

        const newIngredient = await prisma.ingredient.create({
            data: {
                name: validatedData.name,
                category: validatedData.category as Category,
                unit: validatedData.unit as Unit,
                price: validatedData.price,
                description: validatedData.description,
            }
        })
        return {success: true, message: 'Ингредиент успешно создан', data: newIngredient};
    }catch (e) {
        console.error(e);
        return {success: false, message: 'Ошибка добавления инградиента'}
    }
}

export const getIngredients = async (): Promise<{success: boolean; data?: Ingredient[], message?: string}> => {
    try {
        const ingredients: Ingredient[] = await prisma.ingredient.findMany();
        return { success: true, data: ingredients}
    }catch (e) {
        console.error('Get ingredients Err',e);
        return {success: false, message: 'Get ingredients error'}
    }
}

export const deleteIngredient = async (ingredientId: string) => {
    try {
        await prisma.ingredient.delete({
            where: {
                id: ingredientId
            }
        });
        return {success: true, message: 'Инградиент удален успешно'}
    }catch (e) {
        console.error('Err ingredient delete', e);
        return { success: false, message: 'Ingredient delete Err'};
    }
}