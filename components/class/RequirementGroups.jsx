import { useEffect, useState } from "react";
import nextConfig from "../../next.config";
import RequirementGroup from "./RequirementGroup";
import RequirementGroupsModel from "../../models/RequirementGroupsModel";

export default function RequirementGroups() {
    const [requirementGroups, setRequirementGroups] = useState([]);

    useEffect(() => {
        async function getRequirementGroups() {
            const token = localStorage.getItem("token");

            const requirementGroupsModel = new RequirementGroupsModel({});

            await requirementGroupsModel.getRequirementGroups(token);

            setRequirementGroups(requirementGroupsModel.requirementGroups);
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