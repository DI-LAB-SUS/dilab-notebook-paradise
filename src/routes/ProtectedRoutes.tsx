import { Navigate, Outlet } from 'react-router-dom';
import {useTokenStore} from "../stores/token-store.ts";
import {useEffect, useState} from "react";

/**
 * For checking if user has token in storage by already logged in, or check token exists in cookie
 * by requesting to server.
 *
 * If user has the token, navigate to the target route (using the Outlet component).
 * If not, navigate to the login route.
 *
 * The loading state is to block the component from directly redirecting the page to login
 * route before the token is updated. This immediate redirect might happen when user just
 * authenticated back from GitHub OAuth.
 * @constructor
 */
const ProtectedRoutes = () => {
    const { token, setToken } = useTokenStore();
    const [loading, setLoading] = useState(true);

    const checkIsUserAuthenticated = async () => {
        try {
            const response = await fetch('/api/auth/user', { credentials: 'include' });
            if (response.ok) {
                setToken(true);
            } else {
                setToken(false);
            }
        } catch (error) {
            console.error(error);
            setToken(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkIsUserAuthenticated();
    }, [token]);

    if (loading) {
        return <span></span>;
    }

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
