import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserProvider";
import User from "../../../models/User";
import Pathfinder from "../../../models/Pathfinder";
import { useRouter } from "next/router";

export default function CreateEditFormOptions({ edit, nome, setOpenError, setErrorMessage }) {
    const provider = useContext(UserContext);
    const router = useRouter();

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

    async function editPathfinder() {
        const token = localStorage.getItem("token");

        if (!nome) {
            setErrorMessage("Por favor forneça um nome para o desbravdor.");

            setOpenError(true);
        } else {
            const pathfinder = new Pathfinder({ id: router.query.id, name: nome, userId: provider.user.id });

            const { flag, message } = await pathfinder.editPathfinder(token);

            if (flag) {
                router.push("/pathfinders");
            } else {
                setErrorMessage(message);

                setOpenError(true);
            }
        }
    }

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
                        onClick={editPathfinder}
                    >
                        Editar desbravador
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        onClick={createPathfinder}
                    >
                        Criar desbravador
                    </Button>
                )
            }
        </Box>
    );
}