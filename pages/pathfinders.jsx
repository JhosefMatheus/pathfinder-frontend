import {
    Box,
    Button,
    Container,
    Typography
} from "@mui/material";
import Layout from "../components/Layout";
import PathfinderHeader from "../components/Pathfinder/PathfinderHeader";
import PathfinderSearchBar from "../components/Pathfinder/PathfinderSearchBar";
import PathfinderTable from "../components/Pathfinder/PathfinderTable";

export default function Pathfinders() {
    return (
        <Layout>
            <Container>
                <PathfinderHeader />
                <PathfinderSearchBar />
                <PathfinderTable />
            </Container>
        </Layout>
    );
}