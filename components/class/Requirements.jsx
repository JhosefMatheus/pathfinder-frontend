import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import nextConfig from "../../next.config";
import Requirement from "./Requirement";

export default function Requirements({ requirementGroupId }) {
    const router = useRouter();
    
    const [requirements, setRequirements] = useState([]);

    useEffect(() => {
        async function getRequirements() {
            const token = localStorage.getItem("token");

            const getRequirementsResponse = await fetch(`${nextConfig.urlApi.dev}/class/classes/requirements/${router.query.classId}/${requirementGroupId}`, {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const { message, requirements } = await getRequirementsResponse.json();

            if (getRequirementsResponse.status === 200) {
                console.log(requirements)
                setRequirements(requirements);
            } else if (getRequirementsResponse.status === 401) {
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
                    />
                ))
            }
        </ol>
    );
}