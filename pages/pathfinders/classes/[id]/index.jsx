import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ClassCard from "../../../../components/classes/ClassCard";
import Classes from "../../../../components/classes/Classes";
import Header from "../../../../components/classes/Header";
import Layout from "../../../../components/Layout";
import PrivateRoute from "../../../../components/PrivateRoute";
import ClassModel from "../../../../models/ClassModel";

export default function PathfinderClasses() {
    const [classes, setClasses] = useState([]);
    
    useEffect(() => {
        async function getClasses() {
            const token = localStorage.getItem("token");

            const classModel = new ClassModel({});

            const classes = await classModel.getClasses(token);

            setClasses(classes);
        }

        getClasses();
    }, []);

    return (
        <PrivateRoute>
            <Layout>
                <Container>
                    <Header />
                    <Classes classes={classes} />
                </Container>
            </Layout>
        </PrivateRoute>
    );
}