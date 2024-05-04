"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { linkArrType } from "../Types/types";

function LinkComponent({ title, url, action, Icon, isTarget }: linkArrType) {
  const currentLocation = usePathname();
  return isTarget ? (
    <Link
      onClick={() => {
        action && action();
      }}
      className={currentLocation === url ? "active" : ""}
      title={title || "link"}
      href={url}
      target="_blank"
    >
      {Icon ? <Icon className="icon" /> : title}
    </Link>
  ) : (
    <Link
      onClick={() => {
        action && action();
      }}
      className={currentLocation === url ? "active" : ""}
      title={title || "link"}
      href={url}
    >
      {Icon ? <Icon className="icon" /> : title}
    </Link>
  );
}

export default LinkComponent;
