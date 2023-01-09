import {
    AppBar,
    Box,
    Divider,
    Popover,
    Toolbar,
    Typography,
    Button
} from "@mui/material";

import { AccountCircle } from "@mui/icons-material";

import { useContext, useState } from "react";

import { UserContext } from "../providers/UserProvider";
import { useRouter } from "next/router";

export default function Layout({ children }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const provider = useContext(UserContext);

    const router = useRouter();

    function logout() {
        localStorage.clear();

        router.push("/");
    }

    return (
        <Box
            sx={{
                backgroundColor: "#F9FAFC",
                height: "100%",
                overflow: "auto"
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
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                    />
                </Toolbar>
            </AppBar>
            <Popover
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                onClose={() => setAnchorEl(null)}
                sx={{
                    mt: 5
                }}
            >
                <Box
                    sx={{
                        p: 2
                    }}
                >
                    <Typography variant="button" fontWeight={600}>Conta</Typography>
                    <Typography fontSize={14} color="rgb(101, 116, 139)">{provider.user.name}</Typography>
                </Box>
                <Divider fullWidth />
                <Button color="error" fullWidth onClick={logout}>Sair</Button>
            </Popover>
            {children}
        </Box>
    );
}