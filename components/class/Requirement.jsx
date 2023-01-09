import SubRequirements from "./SubRequirements";
import { useEffect, useState } from "react";

export default function Requirement({ requirement }) {
    const [checkedRequirement, setCheckedRequirement] = useState(false);
    const [subRequirements, setSubRequirements] = useState([]);

    useEffect(() => {
        async function getSubRequirements() {
            const token = localStorage.getItem("token");

            const subRequirements = await requirement.getSubRequirements(token);

            setSubRequirements(subRequirements.subRequirements);
        }

        getSubRequirements();
    }, []);

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
                onChange={() => setCheckedRequirement(!checkedRequirement)}
            />
        </div>
    );
}