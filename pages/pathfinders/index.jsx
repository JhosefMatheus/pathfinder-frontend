import { Alert, Container, AlertTitle } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Pathfinder/index/Header";
import SearchBar from "../../components/Pathfinder/index/SearchBar";
import Table from "../../components/Pathfinder/index/Table";
import PrivateRoute from "../../components/PrivateRoute";
import UserModel from "../../models/UserModel";
import { UserContext } from "../../providers/UserProvider";

export default function Pathfinders() {
    const provider = useContext(UserContext);

    const [pathfinders, setPathfinders] = useState([]);

    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function getPathfinders() {
            const { id, name, login } = provider.user;

            const user = new UserModel({ id, name, login });

            const token = localStorage.getItem("token");

            const { pathfinders } = await user.getPathfinders(token);

            setPathfinders(pathfinders);
            
            provider.setPathfinders(pathfinders);

            localStorage.setItem("pathfinders", JSON.stringify(pathfinders.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    userId: e.userId
                }
            })));
        }

        if (provider.user) {
            getPathfinders();
        }
    }, [provider.user]);

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
                                    mt: 1
                                }}
                            >
                                <AlertTitle>Erro ao remover desbravador.</AlertTitle>
                                {errorMessage}
                            </Alert>
                        )
                    }
                    <Header />
                    <SearchBar
                        pathfinders={pathfinders}
                        setPathfinders={setPathfinders}
                    />
                    <Table
                        pathfinders={pathfinders}
                        setOpenError={setOpenError}
                        setErrorMessage={setErrorMessage}
                    />
                </Container>
            </Layout>
        </PrivateRoute>
    );
}