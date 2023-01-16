import { useEffect, useState } from "react";
import RequirementGroup from "./RequirementGroup";
import RequirementGroupsModel from "../../models/RequirementGroupsModel";

export default function RequirementGroups({ requirementsPathfinder, setRequirementsPathfinder }) {
    const [requirementGroups, setRequirementGroups] = useState([]);

    useEffect(() => {
        async function getRequirementGroups() {
            const token = localStorage.getItem("token");

            const requirementGroupsModel = new RequirementGroupsModel({});

            await requirementGroupsModel.getRequirementGroups(token);

            setRequirementGroups(requirementGroupsModel.requirementGroups);
        }

        getRequirementGroups();
        console.log(requirementsPathfinder);
    }, [])

    return (
        <ol
            type="I"
        >
            {
                requirementGroups.map(requirementGroup => (
                    <RequirementGroup
                        requirementGroup={requirementGroup}
                        requirementsPathfinder={requirementsPathfinder}
                        setRequirementsPathfinder={setRequirementsPathfinder}
                    />
                ))
            }
        </ol>
    );
}