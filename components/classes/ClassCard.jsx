import { Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ClassCard({ classId, name, figure,  classesProgress }) {
    const router = useRouter();

    const [classProgress, setClassProgress] = useState(0);

    useEffect(() => {
        if (classesProgress) {
            const { friendProgress, companionProgress, researcherProgress, pioneerProgress, hikerProgress, guideProgress } = classesProgress;

            switch (classId) {
                case 1:
                    setClassProgress(friendProgress);
                    break;

                case 2:
                    setClassProgress(companionProgress);
                    break;

                case 3:
                    setClassProgress(researcherProgress);
                    break;

                case 4:
                    setClassProgress(pioneerProgress);
                    break;

                case 5:
                    setClassProgress(hikerProgress);
                    break;

                case 6:
                    setClassProgress(guideProgress);
                    break;
            
                default:
                    break;
            }
        }
    }, [classesProgress]);

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
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Typography>{classProgress}% concluído</Typography>
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