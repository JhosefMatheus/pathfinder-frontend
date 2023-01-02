import {
    useContext,
    useState
} from "react";

import {
    Button,
    Container,
    TextField,
    Typography,
    Link,
    Box,
    Alert,
    AlertTitle,
    IconButton
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import User from "../models/User";
import { UserContext } from "../providers/UserProvider";

export default function Home() {
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const provider = useContext(UserContext);

    async function signInButtonClick() {
        const user = new User({ login, password });

        const { flag, message, token, userInfo } = await user.signIn();

        if (flag) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userInfo));

            const { id, name, login } = user;

            provider.setUser({ id, name, login });

            window.location = "/pathfinders";
        } else {
            setAlertMessage(message);

            setOpenAlert(true);
        }
    }

    return (
        <Container
            sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Box
                sx={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Typography variant="h4">Entrar</Typography>
                <Typography
                    variant="caption"
                    fontSize="14px"
                    color="rgb(101, 116, 139)"
                >
                    Entrar no sistema de gerência de desbravadores
                </Typography>
                {
                    openAlert && (
                        <Alert
                            severity="warning"
                            action={
                                <IconButton>
                                    <CloseIcon
                                        onClick={() => setOpenAlert(false)}
                                    />
                                </IconButton>
                            }
                        >
                            <AlertTitle>Erro de login</AlertTitle>
                            {alertMessage}
                        </Alert>
                    )
                }
                <TextField
                    label="Login"
                    sx={{
                        my: 1
                    }}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <TextField
                    label="Senha"
                    type="password"
                    sx={{
                        my: 1
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        my: 1,
                        textTransform: "none",
                        fontWeight: 600
                    }}
                    onClick={signInButtonClick}
                >
                    Entrar Agora
                </Button>
                <Typography
                    variant="caption"
                    fontSize="14px"
                    color="rgb(101, 116, 139)"
                >
                    Não tem uma conta?
                    <Link href="register" underline="hover"> Criar</Link>
                </Typography>
            </Box>
        </Container>
    )
}
