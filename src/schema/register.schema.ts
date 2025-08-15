import * as yup from 'yup';

export const RegisterSchema = yup.object({
    email: yup.string().email('Невалидный емейл').required('Емейл обязателен'),
    password: yup.string().min(6, 'Пароль должен быть минимум 6 символов').required('Пароль обязателен'),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password')], 'Пароли должны совпадать')
        .required('Подтверждение пароля обязательно'),
});