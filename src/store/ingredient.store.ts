import {create} from "zustand";
import {CreateIngredient} from "@/types/form-data";
import {createIngredient, deleteIngredient, getIngredients} from "@/actions/ingredient";
import {Ingredient} from "@/generated/prisma";

interface IngredientStore {
    ingredients: Ingredient[];
    isLoading: boolean;
    loadIngredients: () => Promise<void>;
    addIngredient: (formData:CreateIngredient) => Promise<void>;
    removeIngredient: (ingredientId: string) => Promise<void>;
}

export const useIngredientStore = create<IngredientStore>(
    (set, get) => ({
        ingredients: [],
        isLoading: false,
        loadIngredients: async () => {
            set({isLoading: true});
            try {
                const { data } = await getIngredients();
                set({ingredients: data});
            }catch (e) {
                set({ingredients: []});
                console.error('Error while getting ingredients', e);
            }finally {
                set({isLoading: false});
            }
        },
        addIngredient: async (formData: CreateIngredient) => {
            set({isLoading: true});
            try {
                await createIngredient(formData);
                await get().loadIngredients();
            }catch (e) {
                console.error('Error while adding ingredient', e);
            }finally {
                set({isLoading: false});
            }
        },
        removeIngredient: async (ingredientId: string) => {
            set({isLoading: true});
            try {
                await deleteIngredient(ingredientId);
                await get().loadIngredients();
            }catch (e) {
                console.error('Error while removing ingredient', e);
            }finally {
                set({isLoading: false});
            }
        }
    }),

)