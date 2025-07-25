import { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

export const CustomToast = ({ message, type, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      dismissToast();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const dismissToast = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(), 300);
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-xl" />;
      case "error":
        return <FaExclamationCircle className="text-xl" />;
      default:
        return <FaInfoCircle className="text-xl" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-success";
      case "error":
        return "bg-error";
      default:
        return "bg-info";
    }
  };

  return (
    <div
      className={`transition-all duration-300 transform ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} 
      ${getBgColor()} text-neutral-content rounded-box shadow-lg p-4 max-w-xs w-full mb-2 flex items-start`}
    >
      <div className="mr-3 mt-0.5">{getIcon()}</div>
      <div className="flex-1">
        <p className="font-medium">{message}</p>
      </div>
      <button onClick={dismissToast} className="ml-2">
        <FaTimes />
      </button>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      {toasts.map((toast) => (
        <CustomToast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};