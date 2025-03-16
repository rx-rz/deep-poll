type Props = {
  content: string;
};

export const H2 = ({ content }: Props) => {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {content}
    </h2>
  );
};
