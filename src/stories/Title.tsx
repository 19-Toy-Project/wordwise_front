export interface TitleProps {
  title: string;
  size?: "sm" | "md" | "lg";
}

export const Title = ({ title, size = "md" }: TitleProps) => {
  if (size === "sm") return <h5>{title}</h5>;
  else if (size === "md") return <h2>{title}</h2>;
  else if (size === "lg") return <h1>{title}</h1>;
};
