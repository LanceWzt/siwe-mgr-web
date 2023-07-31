import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface User {
    isLogged: boolean;
    auth_token: string;
    user: {
        user_id: number;
        name: string;
        type: number;
    } | null;
}

export const InitialState: User = {
    isLogged: false,
    auth_token: '',
    user: null
};

// state持久化
const { persistAtom } = recoilPersist({
    key: 'user_state',
    storage: sessionStorage
});

export const userState = atom({
    key: 'userState',
    default: InitialState,
    effects_UNSTABLE: [persistAtom]
});
