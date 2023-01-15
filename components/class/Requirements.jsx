import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import RequirementsModel from "../../models/RequirementsModel";
import nextConfig from "../../next.config";
import Requirement from "./Requirement";

export default function Requirements({ requirementGroupId, requirementsPathfinder }) {
    const router = useRouter();
    
    const [requirements, setRequirements] = useState([]);

    useEffect(() => {
        async function getRequirements() {
            const token = localStorage.getItem("token");

            const requirementsModel = new RequirementsModel({});

            const getRequirementsResult = await requirementsModel.getRequirements(token, router.query.classId, requirementGroupId);

            if (getRequirementsResult) {
                setRequirements(requirementsModel.requirements);
            } else {
                router.push(`pathfinders/classes/${router.query.id}`);
            }
        }

        if (router.query.classId) {
            getRequirements();
        }
    }, []);
    
    return (
        <ol>
            {
                requirements.map(requirement => (
                    <Requirement
                        requirement={requirement}
                        requirementsPathfinder={requirementsPathfinder}
                    />
                ))
            }
        </ol>
    );
}