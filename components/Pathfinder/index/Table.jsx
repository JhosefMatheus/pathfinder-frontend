import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import { useRouter } from "next/router";
import PathfinderModel from "../../../models/PathfinderModel";

export default function PathfinderTable({ pathfinders, setOpenError, setErrorMessage }) {
    const router = useRouter();

    async function deletePathfinder(pathfinder) {
        const token = localStorage.getItem("token");

        const { message, flag } = await pathfinder.deletePathfinder(token);

        if (flag) {
            router.reload();
        } else {
            setErrorMessage(message);

            setOpenError(true);
        }
    }

    return (
        <Table
            sx={{
                my: 1,
                borderRadius: "8px",
                overflow: "hidden"
            }}
        >
            <TableHead
                sx={{
                    backgroundColor: "rgb(243, 244, 246)"
                }}
            >
                <TableRow>
                    <TableCell
                        align="left"
                    >
                        Nome
                    </TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    pathfinders.map(pathfinder => (
                        <TableRow key={pathfinder.id}>
                            <TableCell>
                                {pathfinder.name}
                            </TableCell>
                            <TableCell
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center"
                                }}
                            >
                                <Button
                                    variant="contained"
                                    href={`pathfinders/edit/${pathfinder.id}`}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="contained"
                                    href={`pathfinders/classes/${pathfinder.id}`}
                                >
                                    Classes
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    pathfinder={pathfinder}
                                    onClick={() => deletePathfinder(pathfinder)}
                                >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}