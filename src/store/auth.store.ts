import {create} from 'zustand';
import {Session} from "next-auth";

export const SESSION_STATUS = {
    Loading: 'loading',
    Authenticated: 'authenticated',
    Unauthenticated: 'unauthenticated',
} as const;

export type SessionStatus = (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS];

const SESSION_STATUS_MAP: Record<string, SessionStatus | undefined> = {
    loading: SESSION_STATUS.Loading,
    authenticated: SESSION_STATUS.Authenticated,
    unauthenticated: SESSION_STATUS.Unauthenticated,
};

export function parseSessionStatus(value: string | null): SessionStatus | null {
    if(!value) return null;
    return SESSION_STATUS_MAP[value] ?? null;
}

interface AuthState {
    isAuth: boolean;
    status: SessionStatus;
    session: Session | null;
    setAuthState: (status: SessionStatus, session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuth: false,
    status: SESSION_STATUS.Loading,
    session: null,
    setAuthState: (status, session) => set(() => ({
        status,
        session,
        isAuth: status === SESSION_STATUS.Authenticated
    }))
}))