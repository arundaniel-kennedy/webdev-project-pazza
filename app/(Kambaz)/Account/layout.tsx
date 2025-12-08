import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-kambaz">
      <div className="d-flex">
        <div className="">
          <AccountNavigation />
        </div>
        <div className="flex-fill p-3">{children}</div>
      </div>
    </div>
  );
}
