import {
    Table,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";

export default function PathfinderTable() {
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
        </Table>
    );
}