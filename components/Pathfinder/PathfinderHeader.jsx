import {
    Box,
    Typography,
    Button
} from "@mui/material";

export default function PathfinderHeader() {
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
            >
                Desbravadores
            </Typography>
            <Button
                variant="contained"
                sx={{
                    textTransform: "none",
                    fontWeight: 600
                }}
            >
                Add Desbravador
            </Button>
        </Box>
    );
}