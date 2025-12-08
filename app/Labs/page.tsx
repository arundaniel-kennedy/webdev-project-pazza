import Link from "next/link";
export default function Labs() {
  return (
    <div id="wd-labs">
      <div className="d-flex flex-row gap-5">
        <h1>Arun Daniel Kennedy</h1> <span>CS5610.18616.202610</span>
        <u>section: 4</u>
      </div>
      <a
        target="_blank"
        href="https://github.com/arundaniel-kennedy/kambaz-react-web-app"
      >
        Link to Github
      </a>
      <div style={{marginTop: "20px"}}>
        <span>Alternate URLs:</span>
        <ul style={{marginLeft: "20px", marginTop: 0}}>
          <li>
            <a target="_blank" href="http://kambaz-react-web-app.vercel.app/">
              Vercel URL
            </a>
          </li>
          <li>
            <a target="_blank" href="http://webdev-class.arundanielk.dev/">
              Custom URL
            </a>
          </li>
        </ul>
      </div>
      <h1>Labs</h1>
      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link" key="lab1">
            Kambaz
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link" key="lab1">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link" key="lab2">
            Lab 2: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link" key="lab3">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab4" id="wd-lab3-link" key="lab4">
            Lab 4: Redux Fundamentals
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab5" id="wd-lab3-link" key="lab5">
            Lab 5: Node Fundamentals
          </Link>
        </li>
      </ul>
    </div>
  );
}
