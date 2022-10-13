import classNames from "../../utils/className";

interface PropTypes {
  className?: string;
}

const VerticalSeparator: React.FC<PropTypes> = ({ className }) => {
  return (
    <div
      className={classNames(className, "h-full w-10 py-4")}
      aria-hidden="true"
    >
      <div className="h-full w-10 border-l-4 border-slate-900" />
    </div>
  );
};

export default VerticalSeparator;
