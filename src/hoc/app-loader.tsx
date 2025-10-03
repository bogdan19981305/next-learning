"use client";
import { useSession } from "next-auth/react";
import {
  parseSessionStatus,
  SESSION_STATUS,
  useAuthStore,
} from "@/store/auth.store";
import { ReactNode, useEffect } from "react";
import { useIngredientStore } from "@/store/ingredient.store";
import { useRecipesStore } from "@/store/recipes.store";

interface Props {
  children: ReactNode;
}

const AppLoader = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const { loadIngredients } = useIngredientStore();
  const { loadRecipes } = useRecipesStore();
  const { setAuthState, isAuth } = useAuthStore();

  useEffect(() => {
    setAuthState(
      parseSessionStatus(status) || SESSION_STATUS.Unauthenticated,
      session ?? null
    );
  }, [status, session, setAuthState]);

  useEffect(() => {
    if (isAuth) {
      loadIngredients();
    }
  }, [isAuth, loadIngredients]);

  useEffect(() => {
    if (isAuth) {
      loadRecipes();
    }
  }, [isAuth, loadRecipes]);

  return <>{children}</>;
};

export default AppLoader;
