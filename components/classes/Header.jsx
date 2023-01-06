import { Box, Button, Typography } from "@mui/material";

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
            >
                Classes
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