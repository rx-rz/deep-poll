export const Stat = ({
  title,
  value,
}: {
  title: string;
  value?: string | number;
}) => {
  return (
    <div>
      <p className="text-sm text-primary">{title}</p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  );
};
