import classNames from "../../utils/className";

interface PropTypes {
  className?: string;
}

const VerticalSeparator: React.FC<PropTypes> = ({ className }) => {
  return (
    <div className={classNames(className, "h-full py-4")} aria-hidden="true">
      <div className="border-l-4 border-slate-900" />
    </div>
  );
};

export default VerticalSeparator;
