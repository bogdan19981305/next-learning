'use client';
import {useSession} from "next-auth/react";
import {parseSessionStatus, SESSION_STATUS, useAuthStore} from "@/store/auth.store";
import {ReactNode, useEffect} from "react";

interface Props {
    children: ReactNode;
}

const AppLoader = ({children}: Props) => {
    const {data: session, status} = useSession();
    const {setAuthState} = useAuthStore();

    useEffect(() => {
        setAuthState(parseSessionStatus(status) || SESSION_STATUS.Unauthenticated, session ?? null);
    }, [status, session, setAuthState]);

    return <>{children}</>;
}

export default AppLoader;