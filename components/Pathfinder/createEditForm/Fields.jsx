import { Box, TextField } from "@mui/material";

export default function Fields({ edit, nome, setNome }) {
    return (
        <Box
            sx={{
                p: 2
            }}
        >
            {
                edit ? (
                    <TextField
                        label="Nome"
                        value={nome}
                        fullWidth
                        onChange={(e) => setNome(e.target.value)}
                    />
                ) : (
                    <TextField
                        label="Nome"
                        fullWidth
                        onChange={(e) => setNome(e.target.value)}
                    />
                )
            }
        </Box>
    );
}