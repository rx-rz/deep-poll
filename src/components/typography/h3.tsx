type Props = {
  content: string;
};

export const H3 = ({ content }: Props) => {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {content}
    </h3>
  );
};
