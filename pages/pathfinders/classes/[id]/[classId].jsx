import { Container, Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../../components/class/Header";
import RequirementGroups from "../../../../components/class/RequirementGroups";
import Layout from "../../../../components/Layout";
import PrivateRoute from "../../../../components/PrivateRoute";
import ClassModel from "../../../../models/ClassModel";
import RequirementsPathfinderModel from "../../../../models/RequirementsPathfinderModel";

export default function ClassPage() {
    const [currentClass, setCurrentClass] = useState(null);
    const [requirementsPathfinder, setRequirementsPathfinder] = useState([]);

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
    }, [router.query.classId]);

    async function saveRequirementsPathfinder() {
        const currentRequirementsPathfinder = new RequirementsPathfinderModel({ requirementsPathfinder });

        const token = localStorage.getItem("token");

        await currentRequirementsPathfinder.saveRequirementsPathfinder(token);

        router.push(`/pathfinders/classes/${router.query.id}`);
    }

    useEffect(() => {
        console.log(requirementsPathfinder);
    }, [requirementsPathfinder]);

    return (
        <PrivateRoute>
            <Layout>
                <Container
                    sx={{
                        position: "relative"
                    }}
                >
                    {
                        currentClass && (
                            <Header
                                title={currentClass.name}
                            />
                        )
                    }
                    <RequirementGroups
                        requirementsPathfinder={requirementsPathfinder}
                        setRequirementsPathfinder={setRequirementsPathfinder}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            position: "fixed",
                            top: "90%",
                            left: "90%",
                            borderRadius: 50
                        }}
                        onClick={saveRequirementsPathfinder}
                    >
                        Salvar
                    </Button>
                </Container>
            </Layout>
        </PrivateRoute>
    );
}