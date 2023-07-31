import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigate, useLocation } from 'react-router-dom';

import { User, userState } from '@/store/user_store';

interface Props {
    children: React.ReactElement;
}

const AuthCheck = ({ children }: Props): React.ReactElement => {
    const auth = useRecoilValue<User>(userState);

    const location = useLocation();

    return auth.isLogged ? children : <Navigate to='/401' state={{ prevLocation: location }} />;
};

export default AuthCheck;
