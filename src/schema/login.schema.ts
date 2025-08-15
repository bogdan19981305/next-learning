import * as yup from "yup";

export const LoginSchema = yup.object({
    email: yup.string().email('Невалидный емейл').required('Емейл обязателен'),
    password: yup.string().min(6, 'Пароль должен быть минимум 6 символов').required('Пароль обязателен'),
});