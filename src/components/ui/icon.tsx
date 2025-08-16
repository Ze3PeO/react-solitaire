import type { SVGProps } from "react";

type IconProps = {
  name: string;
} & SVGProps<SVGSVGElement>;

const Icon = ({ name, ...props }: IconProps) => {
  return (
    <svg {...props}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default Icon;
