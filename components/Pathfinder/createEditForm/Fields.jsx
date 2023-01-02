import { Box, TextField } from "@mui/material";

export default function Fields({ setNome }) {
    return (
        <Box
            sx={{
                p: 2
            }}
        >
            <TextField
                label="Nome"
                fullWidth
                onChange={(e) => setNome(e.target.value)}
            />
        </Box>
    );
}