import React, { useEffect, useState } from "react";
import "./ToastNotification.css";

const ToastNotification = ({ message, type = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`toast-notification ${type}`}>
      {message}
    </div>
  );
};

export default ToastNotification;
