'use client';
import CustomModal from "@/components/common/modal";
import LoginForm from "@/forms/login.form";
import {Button, Form} from "@heroui/react";
import {FormikContext, useFormik} from "formik";
import * as yup from "yup";

interface Iprops {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onRegistrationChange: (open: boolean) => void;
}

const LoginModal = ({isOpen, onOpenChange, onRegistrationChange}: Iprops) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().email('Невалидный емейл').required('Емейл обязателен'),
            password: yup.string().min(6, 'Пароль должен быть минимум 6 символов').required('Пароль обязателен'),
        }),
        onSubmit: (values) => {
            console.log('Form submitted:', values);
        },
    });

    const openRegistration = () => {
        onOpenChange(false);
        onRegistrationChange(true);
    }

    return (
        <CustomModal
            isOpen={isOpen}
            title="Регистрация"
            onOpenChange={onOpenChange}
        >
            <FormikContext value={formik}>
                <Form className="w-full" onSubmit={formik.handleSubmit}>
                <LoginForm />
                <div className="text-sm text-gray-500 mt-4">
                    <p>Не зарегистрированы? <span className="text-blue-500 cursor-pointer" onClick={openRegistration}>Зарегистрируйтесь</span></p>
                    <div className=" mt-4 flex justify-end gap-5">
                        <Button color="secondary" onPress={() => onOpenChange(false)}>
                            Отмена
                        </Button>
                        <Button
                            className="bg-linear-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                            type="submit"
                        >
                            Логин
                        </Button>
                    </div>
                </div>
                </Form>
            </FormikContext>
        </CustomModal>
    )
}

export default LoginModal;