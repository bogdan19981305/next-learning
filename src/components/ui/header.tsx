'use client';
import {addToast, Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, useDisclosure} from "@heroui/react";
import {siteConfig} from "@/config/site.config";
import classNames from "classnames";
import RegistrationModal from "@/components/ui/modals/registration.modal";
import LoginModal from "@/components/ui/modals/login.modal";
import {signOutFunc} from "@/actions/sign-out";
import {SESSION_STATUS, useAuthStore} from "@/store/auth.store";
import {useSession} from "next-auth/react";

const {navItems} = siteConfig;

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default function Header() {

    const {isOpen: isRegistrationOpen, onOpenChange: onOpenRegistrationChange, onOpen: onRegitrationOpen} = useDisclosure();
    const {isOpen: isLoginOpen, onOpenChange: onOpenLoginChange, onOpen: onLoginOpen} = useDisclosure();
    const {isAuth,setAuthState, session, status} = useAuthStore();
    const {update} = useSession();


    const handleSignOut = async () => {
       await signOutFunc();
       addToast({
        title: 'Вы успешно вышли из аккаунта!',
        color: 'success',
       });
        setAuthState(SESSION_STATUS.Unauthenticated, null);
    }

    return (
        <Navbar>
            <NavbarBrand>
                <Link href="/" className="flex items-center gap-2">
                    <AcmeLogo />
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {navItems.map((item) => (
                    <NavbarItem key={item.href}>
                        <Link href={item.href} className={classNames('text-blue-100 font-bold hover:text-blue-800 transition-colors duration-100 ease-in p-3 rounded-md bg-transparent hover:bg-white' )}>
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            {status === SESSION_STATUS.Loading && (
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        Загрузка...
                    </NavbarItem>
                </NavbarContent>
            )}
            {status !== SESSION_STATUS.Loading && (
                <NavbarContent justify="end">
                    {!isAuth && (
                        <>
                            <NavbarItem className="hidden lg:flex">
                                <Button
                                    className="bg-linear-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                                    radius="md"
                                    onPress={onLoginOpen}
                                >
                                    Логин
                                </Button>
                            </NavbarItem>
                            <NavbarItem>
                                <Button radius="md" onPress={onRegitrationOpen} color="primary">
                                    Регистрация
                                </Button>
                            </NavbarItem>
                        </>
                    )}
                    {isAuth && (
                        <NavbarItem className="hidden lg:flex">
                            <Button
                                className="bg-linear-to-tr from-yellow-400 to-green-400 text-white shadow-lg"
                                radius="md"
                                onPress={handleSignOut}
                            >
                                Выйти
                            </Button>
                        </NavbarItem>
                    )}
                </NavbarContent>
            )}
            <RegistrationModal isOpen={isRegistrationOpen} onOpenChange={onOpenRegistrationChange} />
            <LoginModal isOpen={isLoginOpen} onOpenChange={onOpenLoginChange} onRegistrationChange={onOpenRegistrationChange} />
        </Navbar>
    );
}
