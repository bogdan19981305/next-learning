import * as yup from "yup";

export const createIngredientSchema = yup.object().shape({
    name: yup.string().required("Обязательное поле"),
    category: yup.string().required("Обязательное поле"),
    unit: yup.string().required("Обязательное поле"),
    description: yup.string().required("Обязательное поле"),
    price: yup
        .number()
        .typeError("Должно быть числом")
        .required("Обязательное поле"),
});