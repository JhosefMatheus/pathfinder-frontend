import SubRequirement from "./SubRequirement";

export default function SubRequirements({ subRequirements }) {

    return (
        subRequirements.length > 0 && subRequirements[0].subrequirementTypeId === 1  ? (
            <ol
                type="a"
            >
                {
                    subRequirements.map(subRequirement => (
                        <SubRequirement
                            subRequirement={subRequirement}
                        />
                    ))
                }
            </ol>
        ) : (
            <ul
                style={{
                    listStyleType: "disc"
                }}
            >
                {
                    subRequirements.map(subRequirement => (
                        <SubRequirement
                            subRequirement={subRequirement}
                        />
                    ))
                }
            </ul>
        )
    );
}