import classNames from "../../utils/className";

interface PropTypes {
  className?: string;
}

const HorizontalSeparator: React.FC<PropTypes> = ({ className }) => {
  return (
    <div
      className={classNames(className, "w-full px-4 md:w-6/12 lg:w-4/12")}
      aria-hidden="true"
    >
      <div className="border-t-4 border-slate-900" />
    </div>
  );
};

export default HorizontalSeparator;
