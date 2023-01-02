import { Box, Typography } from "@mui/material";

export default function FormHeader({ edit }) {
    return (
        <Box
            sx={{
                p: 1
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600
                }}
            >
                Desbravador
            </Typography>
            {
                edit && (
                    <Typography
                        variant="caption"
                        fontSize="14px"
                        color="rgb(101, 116, 139)"
                    >
                        A informação pode ser editada
                    </Typography>
                )
            }
        </Box>
    );
}