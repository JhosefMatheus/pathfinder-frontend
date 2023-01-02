import {
    AppBar,
    Box,
    Toolbar
} from "@mui/material";

import { AccountCircle } from "@mui/icons-material";

export default function Layout({ children }) {
    return (
        <Box
            sx={{
                backgroundColor: "#F9FAFC",
                height: "100%"
            }}
        >
            <AppBar
                position="sticky"
                component="nav"
                sx={{
                    backgroundColor: "#fff",
                    color: "initial"
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <AccountCircle
                        fontSize="large"
                    />
                </Toolbar>
            </AppBar>
            {children}
        </Box>
    );
}