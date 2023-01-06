export default function Requirement({ requirement }) {
    return (
        <li
            style={{
                fontSize: "1rem",
                color: "#5a5c5e",
                fontWeight: "normal",
                margin: "25px 0",
                textTransform: "none"
            }}
        >
            {requirement.content}
        </li>
    );
}