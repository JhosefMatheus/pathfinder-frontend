import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../../components/class/Header";
import RequirementGroups from "../../../../components/class/RequirementGroups";
import Layout from "../../../../components/Layout";
import PrivateRoute from "../../../../components/PrivateRoute";
import ClassModel from "../../../../models/ClassModel";
import nextConfig from "../../../../next.config";

export default function ClassPage() {
    const [currentClass, setCurrentClass] = useState(null);

    const router = useRouter();

    useEffect(() => {
        async function getClassData() {
            const token = localStorage.getItem("token");

            const classModel = new ClassModel({ id: router.query.classId });

            const getClassDataResult = await classModel.getClassData(token);

            if (getClassDataResult) {
                setCurrentClass(classModel);
            } else {
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
                        currentClass && (
                            <Header
                                title={currentClass.name}
                            />
                        )
                    }
                    <RequirementGroups />
                </Container>
            </Layout>
        </PrivateRoute>
    );
}