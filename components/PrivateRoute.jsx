import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import nextConfig from "../next.config";

export default function PrivateRoute({ children }) {
    const [flag, setFlag] = useState(null);

    const router = useRouter();

    useEffect(() => {
        async function tokenVerify() {
            const token = localStorage.getItem("token");

            const tokenVerifyResponse = await fetch(`${nextConfig.urlApi.dev}/token/verify`, {
                method: "GET",
                headers:  {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (tokenVerifyResponse.status === 200) {
                setFlag(true);
            } else if (tokenVerifyResponse.status === 401) {
                setFlag(false);
            }
        }

        tokenVerify();
    }, []);

    if (flag === null) {
        return <h1>Loading...</h1>
    }

    if (flag) {
        return children;
    } else {
        router.push("/");
    }
}