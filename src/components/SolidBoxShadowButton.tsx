const SolidBoxShadowButton = ({ children }) => {
  return (
    <button className="rounded-md border border-black bg-green-500 py-1 px-3 text-xl font-bold text-black shadow-lg shadow-black">
      {children}
    </button>
  );
};

export default SolidBoxShadowButton;
