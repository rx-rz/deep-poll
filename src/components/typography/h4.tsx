type Props = {
  content: string;
};

export const H4 = ({ content }: Props) => {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {content}
    </h4>
  );
};
