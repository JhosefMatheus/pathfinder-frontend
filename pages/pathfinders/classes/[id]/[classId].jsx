import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../../components/class/Header";
import RequirementGroups from "../../../../components/class/RequirementGroups";
import Layout from "../../../../components/Layout";
import PrivateRoute from "../../../../components/PrivateRoute";
import nextConfig from "../../../../next.config";

export default function ClassPage() {
    const [classData, setClassData] = useState(null);

    const router = useRouter();

    useEffect(() => {
        async function getClassData() {
            const token = localStorage.getItem("token");

            const getClassDataResponse = await fetch(`${nextConfig.urlApi.dev}/class/${router.query.classId}`, {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const { selectedClass } = await getClassDataResponse.json();

            if (getClassDataResponse.status === 200) {
                setClassData(selectedClass);
            } else if (getClassDataResponse.status === 401) {
                router.push(`pathfinders/classes/${router.query.id}`);
            }
        }

        if (router.query.classId) {
            getClassData();
        }
    }, [router.query.classId])

    return (
        <PrivateRoute>
            <Layout>
                <Container>
                    {
                        classData && (
                            <Header
                                title={classData.name}
                            />
                        )
                    }
                    <RequirementGroups />
                </Container>
            </Layout>
        </PrivateRoute>
    );
}