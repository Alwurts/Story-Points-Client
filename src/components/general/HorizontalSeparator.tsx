import classNames from "../../utils/className";

interface PropTypes {
  className?: string;
}

const HorizontalSeparator: React.FC<PropTypes> = ({ className }) => {
  return (
    <div className={classNames(className, "w-full")} aria-hidden="true">
      <div className="border-t-2 border-slate-900" />
    </div>
  );
};

export default HorizontalSeparator;
