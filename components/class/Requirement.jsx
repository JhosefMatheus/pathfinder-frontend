import SubRequirements from "./SubRequirements";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RequirementPathfinderModel from "../../models/RequirementPathfinderModel";

export default function Requirement({ requirement, requirementsPathfinder, setRequirementsPathfinder }) {
    const [checkedRequirement, setCheckedRequirement] = useState(false);
    const [subRequirements, setSubRequirements] = useState([]);
    const [requirementPathfinder, setRequirementPathfinder] = useState(null);
    const [requirementPathfinderFlag, setRequirementPathfinderFlag] = useState(false); // on component mount

    const router = useRouter();

    useEffect(() => {
        async function getSubRequirements() {
            const token = localStorage.getItem("token");

            const subRequirements = await requirement.getSubRequirements(token);

            setSubRequirements(subRequirements.subRequirements);
        }

        getSubRequirements();
    }, []);

    useEffect(() => {
        async function getRequirementPathfinder() {
            const token = localStorage.getItem("token");

            const { flag, requirementPathfinder } = await requirement.getRequirementPathfinder(token, router.query.id);

            if (flag) {
                setRequirementPathfinder(requirementPathfinder);

                setRequirementsPathfinder([...requirementsPathfinder, requirementPathfinder]);
            }
        }

        if (router.query.id) {
            getRequirementPathfinder();
        }
    }, [router.query.id]);

    useEffect(() => {
        if (requirementPathfinder && !requirementPathfinderFlag) {
            setCheckedRequirement(true);

            setRequirementPathfinderFlag(true);
        }
    }, [requirementPathfinder]);

    function handleChangeRequirement() {
        if (checkedRequirement) {
            console.log("caiu no primeiro if.");

            const requirementPathfinderIndex = requirementsPathfinder.findIndex(e => e.requirementId === requirementPathfinder.requirementId);

            requirementsPathfinder[requirementPathfinderIndex].status = "excluído";

            requirementPathfinder.status = "excluído";
        } else {
            console.log("caiu no segundo if.");

            const currentRequirementPathfinder = new RequirementPathfinderModel({
                pathfinderId: router.query.id,
                requirementId: requirement.id,
                status: "adicionado"
            });
            
            const requirementPathfinderExists = requirementsPathfinder.some(e => e.requirementId === currentRequirementPathfinder.requirementId);

            if (requirementPathfinderExists) {
                console.log("requisito do desbravador já está na lista.");

                const requirementPathfinderIndex = requirementsPathfinder.findIndex(e => e.requirementId === currentRequirementPathfinder.requirementId);

                requirementsPathfinder[requirementPathfinderIndex].status = "adicionado";

                requirementPathfinder.status = "adicionado";
            } else {
                console.log("requisito do desbravador não está na lista ainda.");

                setRequirementPathfinder(currentRequirementPathfinder);

                setRequirementsPathfinder([...requirementsPathfinder, currentRequirementPathfinder]);
            }
        }
        
        setCheckedRequirement(!checkedRequirement);
    }

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                margin: "25px 0"
            }}
        >
            <li
                style={{
                    fontSize: "1rem",
                    color: "#5a5c5e",
                    fontWeight: "normal",
                    textTransform: "none",
                    textDecoration: checkedRequirement ? "line-through" : "none"
                }}
            >
                {requirement.content}
                <SubRequirements
                    subRequirements={subRequirements}
                />
            </li>
            <input
                type="checkbox"
                checked={checkedRequirement}
                onChange={handleChangeRequirement}
            />
        </div>
    );
}