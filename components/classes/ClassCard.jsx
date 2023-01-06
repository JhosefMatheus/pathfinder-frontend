import { Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function ClassCard({ classId, name, figure }) {
    const router = useRouter();

    return (
        <Card>
            <CardContent
                sx={{
                    height: "150px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <img
                    src={`../../${figure}`}
                />
                <Typography
                    textAlign="center"
                    mt={4}
                >
                    {name}
                </Typography>
            </CardContent>
            <Divider fullWidth />
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center"
                }}
            >
                <Button
                    variant="contained"
                    href={`/pathfinders/classes/${router.query.id}/${classId}`}
                >
                    Ver Mais
                </Button>
            </CardActions>
        </Card>
    );
}