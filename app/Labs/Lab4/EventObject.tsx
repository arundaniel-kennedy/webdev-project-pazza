import { useState } from "react";
export default function EventObject() {
  const [eventData, setEvent] = useState<React.MouseEvent<HTMLButtonElement>>();
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    // e.target = e.target.outerHTML;
    setEvent(e);
  };
  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick(e)}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(eventData, null, 2)}</pre>
      <hr />
    </div>
  );
}
