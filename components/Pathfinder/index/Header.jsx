import {
    Box,
    Typography,
    Button
} from "@mui/material";

export default function Header() {
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
                Desbravadores
            </Typography>
            <Button
                variant="contained"
                sx={{
                    textTransform: "none",
                    fontWeight: 600
                }}
                href="/pathfinders/add"
            >
                Add Desbravador
            </Button>
        </Box>
    );
}