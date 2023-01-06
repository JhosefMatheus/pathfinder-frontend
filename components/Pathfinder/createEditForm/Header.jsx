import { Typography, Button, Box } from "@mui/material";

export default function Header({ edit }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 600
                }}
            >
                {
                    edit ? (
                        "Editar desbravador"
                    ) : (
                        "Adicionar desbravador"
                    )
                }
            </Typography>
            <Button
                variant="contained"
                href="/pathfinders"
            >
                Desbravadores
            </Button>
        </Box>
    );
}