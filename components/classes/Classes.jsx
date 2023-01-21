import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PathfinderModel from "../../models/PathfinderModel";
import ClassCard from "./ClassCard";

export default function Classes({ classes }) {
    const router = useRouter();

    const [classesProgress, setClassesProgress] = useState(null);

    useEffect(() => {
        async function getClassesProgress() {
            const token = localStorage.getItem("token");

            const pathfinder = new PathfinderModel({ id: router.query.id });

            const classesProgress = await pathfinder.getPathfinderClassesProgress(token);

            setClassesProgress(classesProgress);
        }
        
        if (router.query.id) {
            getClassesProgress();
        }
    }, [router.query.id]);

    return (
        <Grid
            container
            spacing={2}
        >
            {
                classes.map(currentClass => (
                    <Grid
                        item
                        xs={4}
                    >
                        <ClassCard
                            classId={currentClass.id}
                            name={currentClass.name}
                            figure={currentClass.figure}
                            classesProgress={classesProgress}
                        />
                    </Grid>
                ))
            }
        </Grid>
    );
}