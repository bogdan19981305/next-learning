'use client';
import {Input} from "@heroui/input";
import {useFormikContext} from "formik";
import {IFormDataRegister} from "@/types/form-data";


const RegistrationForm = () => {
    const formik = useFormikContext<IFormDataRegister>();

    return (
        <>
            <Input
                isRequired
                errorMessage={formik.touched.email && formik.errors.email}
                label="Емейл"
                labelPlacement="outside"
                name="email"
                placeholder="Введите емейл"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            <Input
                isRequired
                errorMessage={formik.touched.password && formik.errors.password}
                label="Пароль"
                labelPlacement="outside"
                name="password"
                placeholder="Введите пароль"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            <Input
                isRequired
                errorMessage={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                label="Подтверждение пароля"
                labelPlacement="outside"
                name="passwordConfirm"
                placeholder="Подтвердите пароль"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
            />
        </>
    );
}

export default RegistrationForm;