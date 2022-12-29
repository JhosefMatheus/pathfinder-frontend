import {
    useState
} from "react";

import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Link,
    Alert,
    AlertTitle
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import User from "../models/User";

export default function Register() {
    const [name, setName] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    async function signUpButtonClick() {
        if (!name || !login || !password || !confirmPassword) {
            setAlertMessage("Algum dos campos do formulário não foi preenchido.");

            setOpenAlert(true);
        } else if (password !== confirmPassword) {
            setAlertMessage("A senha fornecida não confere com a confirmação de senha fornecida.");

            setOpenAlert(true);
        } else {
            const user = new User({ name, login, password });

            const { flag, message } = await user.signUp();

            if (flag) {
                window.location = "/";
            } else {
                setAlertMessage(message);

                setOpenAlert(true);
            }
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
                <Typography variant="h4">Criar uma nova conta</Typography>
                {
                    openAlert && (
                        <Alert
                            severity="warning"
                            action={
                                <CloseIcon
                                    onClick={() => setOpenAlert(false)}
                                />
                            }
                        >
                            <AlertTitle>Erro de registro</AlertTitle>
                            {alertMessage}
                        </Alert>
                    )
                }
                <TextField
                    label="Nome Completo"
                    sx={{
                        my: 1
                    }}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <TextField
                    label="Confirmar Senha"
                    type="password"
                    sx={{
                        my: 1
                    }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{
                        my: 1,
                        textTransform: "none",
                        fontWeight: 600
                    }}
                    onClick={signUpButtonClick}
                >
                    Registrar Agora
                </Button>
                <Typography
                    variant="caption"
                    fontSize="14px"
                    color="rgb(101, 116, 139)"
                >
                    Já tem uma conta?
                    <Link href="/" underline="hover"> Entrar</Link>
                </Typography>
            </Box>
        </Container>
    )
}