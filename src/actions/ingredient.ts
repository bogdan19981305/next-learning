'use server';

import {CreateIngredient} from "@/types/form-data";

export const createIngredient = async (formData: CreateIngredient) => {
    try {
        console.log(formData);
    }catch (e) {
        console.error(e);
        return {success: false, message: 'Ошибка при создании ингредиента'}
    }
}