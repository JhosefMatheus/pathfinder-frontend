import { useContext, useEffect, useState } from "react";
import { Alert, AlertTitle, Container } from "@mui/material";
import Layout from "../../../components/Layout";
import Form from "../../../components/Pathfinder/createEditForm/Form";
import Header from "../../../components/Pathfinder/createEditForm/Header";
import PrivateRoute from "../../../components/PrivateRoute";
import { useRouter } from "next/router";
import { UserContext } from "../../../providers/UserProvider";
import Pathfinder from "../../../models/Pathfinder";

export default function EditPathfinder() {
    const [nome, setNome] = useState("");

    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();
    const provider = useContext(UserContext);

    console.log(router.query.id);

    useEffect(() => {
        async function getPathfinderNome() {
            const token = localStorage.getItem("token");

            const pathfinder = new Pathfinder({ id: router.query.id, userId: provider.user.id });

            const { flag, message } = await pathfinder.getPathfinderData(token);

            if (flag) {
                setNome(pathfinder.name);
            } else {
                window.location = "/pathfinders";
            }
        }

        if (provider.user && router.query.id) {
            getPathfinderNome();
        }
    }, [provider.user, router.query.id]);

    return (
        <PrivateRoute>
            <Layout>
                <Container>
                    {
                        openError && (
                            <Alert
                                severity="warning"
                                onClose={() => setOpenError(false)}
                                sx={{
                                    my: 1
                                }}
                            >
                                <AlertTitle>Erro ao editar desbravador.</AlertTitle>
                                {errorMessage}
                            </Alert>
                        )
                    }
                    <Header
                        edit
                    />
                    <Form
                        edit
                        nome={nome}
                        setNome={setNome}
                        setOpenError={setOpenError}
                        setErrorMessage={setErrorMessage}
                    />
                </Container>
            </Layout>
        </PrivateRoute>
    );
}