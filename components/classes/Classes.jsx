import { Grid } from "@mui/material";
import ClassCard from "./ClassCard";

export default function Classes({ classes }) {
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
                        />
                    </Grid>
                ))
            }
        </Grid>
    );
}