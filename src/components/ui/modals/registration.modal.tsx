'use client';
import CustomModal from "@/components/common/modal";
import RegistrationForm from "@/forms/registration.form";
import {FormikContext, useFormik} from "formik";
import * as yup from "yup";
import {Form} from "@heroui/form";
import {addToast, Button, Spinner} from "@heroui/react";
import React, {useState} from "react";
import classNames from "classnames";
import {registerUser} from "@/actions/register";
import {IFormDataRegister} from "@/types/form-data";

interface Iprops {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const RegistrationModal = ({isOpen, onOpenChange}: Iprops) => {

    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (values: IFormDataRegister) => {
        setLoading(true);
        registerUser(values)
            .then(() => {
                onOpenChange(false);
                addToast({
                    title: 'Успешная регистрация',
                    description: 'Вы успешно зарегистрированы!',
                    color: 'success',
                    shouldShowTimeoutProgress: true
                })
            })
            .catch((error) => {
                addToast({
                    title: 'Ошибка регистрации',
                    description: error.message || 'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.',
                    color: 'danger',
                    shouldShowTimeoutProgress: true
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }


    const formik = useFormik<IFormDataRegister>({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: yup.object({
            email: yup.string().email('Невалидный емейл').required('Емейл обязателен'),
            password: yup.string().min(6, 'Пароль должен быть минимум 6 символов').required('Пароль обязателен'),
            passwordConfirm: yup.string()
                .oneOf([yup.ref('password')], 'Пароли должны совпадать')
                .required('Подтверждение пароля обязательно'),
        }),
        onSubmit: onSubmitHandler
    });

    return (
        <CustomModal
            className="bg-black"
            isOpen={isOpen}
            title="Регистрация"
            onOpenChange={onOpenChange}
        >
            <FormikContext value={formik}>
                {loading && (
                    <Spinner className="absolute top-1/2 left-1/2" />
                )}
                <Form className={classNames('w-full', {'opacity-10 pointer-events-none': loading})} onSubmit={formik.handleSubmit}>
                    <RegistrationForm />
                    <div className="text-sm text-gray-500 mt-4">
                        <div className="text-gray-400 mt-2">
                            <p>Нажимая "Зарегистрироваться", вы соглашаетесь с <a href="/terms" className="text-blue-500 hover:underline">Условиями использования</a> и <a href="/privacy" className="text-blue-500 hover:underline">Политикой конфиденциальности</a>.</p>
                        </div>
                        <div className=" mt-4 flex justify-end gap-5">
                            <Button color="secondary" onPress={() => onOpenChange(false)}>
                                Отмена
                            </Button>
                            <Button
                                isLoading={loading}
                                className="bg-linear-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                                type="submit"
                            >
                                Зарегистрироваться
                            </Button>
                        </div>
                    </div>
                </Form>
            </FormikContext>
        </CustomModal>
    )
}

export default RegistrationModal;