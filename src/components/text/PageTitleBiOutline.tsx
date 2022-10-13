import classNames from "../../utils/className";

interface TitleProps {
  children: string;
  outlineFirst?: boolean;
  className?: string;
  outlineClassName?: string;
}

const PageTitleBiOutline: React.FC<TitleProps> = ({
  children,
  className,
  outlineFirst,
  outlineClassName,
}) => {
  const [firstPart, secondPart] = children.split("@@");
  return (
    <h1
      className={classNames(
        className,
        "flex flex-wrap justify-center space-x-2 text-center"
      )}
    >
      <span
        className={classNames(
          outlineFirst ? "text-outline text-white" : "font-black text-black",
          "uppercase"
        )}
      >
        {firstPart}
      </span>
      <span
        className={classNames(
          !outlineFirst
            ? outlineClassName
              ? outlineClassName
              : "text-outline text-white"
            : "font-black text-black",
          "whitespace-pre-wrap uppercase"
        )}
      >
        {secondPart}
      </span>
    </h1>
  );
};

export default PageTitleBiOutline;
