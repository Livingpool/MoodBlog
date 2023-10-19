import { useLocation } from "react-router-dom";

export default function Icon({ path, meta }) {
  const location = useLocation();
  const { pathname } = location;

  const baseClass = "fill-current";
  const activeColor = pathname.includes(path);

  function getColor(item, isActive) {
    return isActive ? item.originColor : item.activeColor;
  }
  
  return (
    pathname && (
      <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
        {meta.map((item) => (
          <path
            key={item.d}
            className={`${baseClass} ${getColor(item, activeColor)}`}
            d={item.d}
          />
        ))}
      </svg>
    )
  );
  
}
