import Requirements from "./Requirements";

export default function RequirementGroup({ requirementGroup }) {
    return (
        <li
            style={{
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                listStyleType: (requirementGroup.id === 1 || requirementGroup.id === 10) && "none",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#5a5c5e"
            }}
        >
            {requirementGroup.name}
            <Requirements
                requirementGroupId={requirementGroup.id}
            />
        </li>
    );
}