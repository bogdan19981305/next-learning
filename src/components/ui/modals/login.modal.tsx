'use client';
import CustomModal from "@/components/common/modal";
import LoginForm from "@/forms/login.form";
import {Button, Form} from "@heroui/react";
import {FormikContext, useFormik} from "formik";
import {LoginSchema} from "@/schema/login.schema";
import {useState} from "react";
import {signInWithCredentials} from "@/actions/sign-in";
import {SESSION_STATUS, useAuthStore} from "@/store/auth.store";
import {useSession} from "next-auth/react";

interface Iprops {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onRegistrationChange: (open: boolean) => void;
}

const LoginModal = ({isOpen, onOpenChange, onRegistrationChange}: Iprops) => {

    const [loading, setLoading] = useState(false);
    const {setAuthState} = useAuthStore();
    const {update} = useSession();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            setLoading(true);
            signInWithCredentials(values.email, values.password)
                .then(async (res) => {
                    onOpenChange(false);
                    setAuthState(SESSION_STATUS.Authenticated, res);
                    window.location.reload();
                })
                .finally(() => setLoading(false));
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
                            isLoading={loading}
                            onPress={formik.submitForm}
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