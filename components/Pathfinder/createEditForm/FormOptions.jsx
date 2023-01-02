import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import User from "../../../models/User";

export default function CreateEditFormOptions({ edit, nome, setOpenError, setErrorMessage }) {
    const provider = useContext(UserContext);

    async function createPathfinder() {
        const user = new User({ id: provider.user.id, name: provider.user.name, login: provider.user.login });

        const token = localStorage.getItem("token");

        if (!nome) {
            setErrorMessage("Por favor forneça o nome do desbravador.");

            setOpenError(true);
        } else {
            const { flag, message } = await user.createPathfinder(token, nome);

            if (flag) {
                window.location = "/pathfinders";
            } else {
                setErrorMessage(message);

                setOpenError(true);
            }
        }
    }

    async function editPathfinder() {}

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                p: 1
            }}
        >
            {
                edit ? (
                    <Button
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            fontWeight: "600"
                        }}
                        onClick={editPathfinder}
                    >
                        Editar desbravador
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            fontWeight: "600"
                        }}
                        onClick={createPathfinder}
                    >
                        Criar desbravador
                    </Button>
                )
            }
        </Box>
    );
}