"use client";
const hello = () => {
  alert("Hello World!");
};
const lifeIs = (good: string) => {
  alert(`Life is ${good}`);
};
export default function ClickEvent() {
  return (
    <div id="wd-click-event">
      <h2>Click Event</h2>
      <button onClick={hello} id="wd-hello-world-click" className="mx-2 btn btn-primary">
        Hello World!
      </button>
      <button onClick={() => lifeIs("Good!")} id="wd-life-is-good-click"  className="mx-2 btn btn-success">
        Life is Good!
      </button>
      <button
        onClick={() => {
          hello();
          lifeIs("Great!");
        }}
        id="wd-life-is-great-click"
         className="mx-2 btn btn-outline-dark"
      >
        Life is Great!
      </button>
      <hr />
    </div>
  );
}