import { useState } from "react";
import { Alert, AlertTitle, Container } from "@mui/material";
import Layout from "../../../components/Layout";
import Form from "../../../components/Pathfinder/createEditForm/Form";
import Header from "../../../components/Pathfinder/createEditForm/Header";
import PrivateRoute from "../../../components/PrivateRoute";

export default function EditPathfinder() {
    const [nome, setNome] = useState("");

    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <PrivateRoute>
            <Layout>
                <Container>
                    <Header
                        edit
                    />
                    {
                        openError && (
                            <Alert
                                severity="warning"
                                onClose={() => setOpenError(false)}
                            >
                                <AlertTitle>Erro ao editar desbravador.</AlertTitle>
                                {errorMessage}
                            </Alert>
                        )
                    }
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