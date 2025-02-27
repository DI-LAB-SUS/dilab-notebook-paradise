import {useEffect, useState} from "react";

/**
 * Test route simply for testing if backend connection is established.
 * @constructor
 */
const HelloRoute = () => {
    const [hello, setHello] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<string | null>();

    useEffect(() => {
        fetch('/api/hello-world', {credentials: 'include'})
            .then(res => res.text())
            .then(data => {
                setHello(data);
            })
            .catch(e => {
                console.error(e);
                setHello('Failed. Check log.')
            });
        fetch('/api/auth/user')
            .then(res => res.json())
            .then(data => {
                const dataStr = JSON.stringify(data);
                setUserInfo(dataStr);
            })
            .catch(e => {
                console.error(e);
                setUserInfo('Failed. Check log.')
            });
    }, []);

    return (
        <>
            <h1>
                {hello? hello : 'Waiting...'}
            </h1>
            <h2>
                {userInfo? userInfo : 'Waiting...'}
            </h2>
        </>
    )
};

export default HelloRoute;
