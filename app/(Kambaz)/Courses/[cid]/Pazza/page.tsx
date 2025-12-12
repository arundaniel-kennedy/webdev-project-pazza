"use client";

import { useParams } from "next/navigation";

export default function page() {
    const { cid } = useParams();
    return (
        <iframe
            src={`/Pazza/Class/${cid}`}
            style={{ width: "100%", height: "calc(100vh - 110px)" }}
        ></iframe>
    );
}
