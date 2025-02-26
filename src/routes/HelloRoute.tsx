import {useEffect, useState} from "react";

/**
 * Test route simply for testing if backend connection is established.
 * @constructor
 */
const HelloRoute = () => {
    const [hello, setHello] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/hello-world')
            .then(res => res.text())
            .then(data => {
                setHello(data);
            })
            .catch(e => {
                console.error(e);
                setHello('Failed. Check log.')
            });
    }, []);

    return (
        <>
            <h1>
                {hello? hello : 'Waiting...'}
            </h1>
        </>
    )
};

export default HelloRoute;
