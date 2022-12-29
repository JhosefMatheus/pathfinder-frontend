import {
    Box,
    InputAdornment,
    TextField
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function PathfinderSearchBar() {
    return (
        <Box
            sx={{
                p: 2,
                borderRadius: "8px",
                boxShadow: "rgb(110 146 139 / 6%) 0px 1px 1px, rgb(110 146 139 / 10%) 0px 1px 2px"
            }}
        >
            <TextField
                placeholder="Pesquisar desbravador"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
                sx={{
                    width: "50%"
                }}
            />
        </Box>
    );
}