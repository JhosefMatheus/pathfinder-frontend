import { useEffect, useState } from "react";
import nextConfig from "../../next.config";
import RequirementGroup from "./RequirementGroup";

export default function RequirementGroups() {
    const [requirementGroups, setRequirementGroups] = useState([]);

    useEffect(() => {
        async function getRequirementGroups() {
            const token = localStorage.getItem("token");

            const getRequirementGroupsResponse = await fetch(`${nextConfig.urlApi.dev}/class/classes/requirementGroups`, {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const { requirementGroups } = await getRequirementGroupsResponse.json();

            setRequirementGroups(requirementGroups);
        }

        getRequirementGroups();
    }, [])

    return (
        <ol
            type="I"
        >
            {
                requirementGroups.map(requirementGroup => (
                    <RequirementGroup
                        requirementGroup={requirementGroup}
                    />
                ))
            }
        </ol>
    );
}