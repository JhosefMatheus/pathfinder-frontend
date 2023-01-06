import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Header({ title }) {
    const router = useRouter();

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={1}
        >
            <Typography
                variant="h4"
                sx={{
                    maxWidth: "70%"
                }}
            >
                Classe de {title}
            </Typography>
            <Box>
                <Button
                    variant="contained"
                    href="/pathfinders"
                >
                    Desbravadores
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        ml: 1
                    }}
                    href={`/pathfinders/classes/${router.query.id}`}
                >
                    Classes
                </Button>
            </Box>
        </Box>
    );
}