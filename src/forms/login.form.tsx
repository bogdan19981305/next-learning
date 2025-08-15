'use client';
import {Input} from "@heroui/input";
import {useFormikContext} from "formik";


const Login = () => {
    const formik = useFormikContext<{password:string; email: string;}>();

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
        </>
    );
}

export default Login;