import { useState } from "react";
import { Alert, AlertTitle, Container } from "@mui/material";
import Layout from "../../components/Layout";
import Header from "../../components/Pathfinder/createEditForm/Header";
import Form from "../../components/Pathfinder/createEditForm/Form";
import PrivateRoute from "../../components/PrivateRoute";

export default function AddPathfinder() {
    const [nome, setNome] = useState("");
    
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <PrivateRoute>
            <Layout>
                <Container>
                    <Header />
                    {
                        openError && (
                            <Alert
                                severity="warning"
                                onClose={() => setOpenError(false)}
                            >
                                <AlertTitle>Erro ao criar desbravador.</AlertTitle>
                                {errorMessage}
                            </Alert>
                        )
                    }
                    <Form
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