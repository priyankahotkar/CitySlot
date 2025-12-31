export const Card = ({ children, className = '', onClick, hover = false }) => {
  const hoverClass = hover ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md p-6 transition-all duration-300 ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};
