import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  return (
    <div>
      <h1>Iai arturzinho.</h1>
      <p>Digita algo aqui em baixo que ele vai aparecer todo em maiúsculo.</p>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>{text.toUpperCase()}</p>
    </div>
  );
}
