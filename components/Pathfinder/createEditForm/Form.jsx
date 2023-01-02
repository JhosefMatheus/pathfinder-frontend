import { Box, Divider, Typography } from "@mui/material";
import FormOptions from "./FormOptions";
import Fields from "./Fields";
import FormHeader from "./FormHeader";

export default function Form({ edit, nome, setNome, setOpenError, setErrorMessage }) {
    console.log(edit);

    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "rgb(110 146 139 / 6%) 0px 1px 1px, rgb(110 146 139 / 10%) 0px 1px 2px"
            }}
        >
            {
                edit ? (
                    <FormHeader edit />
                ) : (
                    <FormHeader />
                )
            }
            <Divider variant="fullWidth"/>
            <Fields
                setNome={setNome}
            />
            <Divider variant="fullWidth" />
            {
                edit ? (
                    <FormOptions
                        edit
                        nome={nome}
                        setOpenError={setOpenError}
                        setErrorMessage={setErrorMessage}
                    />
                ) : (
                    <FormOptions
                        nome={nome}
                        setOpenError={setOpenError}
                        setErrorMessage={setErrorMessage}
                    />
                )
            }
        </Box>
    );
}