import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21"/>
      <path d="M21 12C21 7.02944 16.9706 3 12 3"/>
      <path d="M17.5 6.5L15.5 8.5"/>
      <path d="M6.5 17.5L8.5 15.5"/>
      <path d="M12 7V17"/>
    </svg>
  );
}
