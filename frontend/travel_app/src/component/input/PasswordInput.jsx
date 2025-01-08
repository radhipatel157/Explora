import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'; // Ensure you have react-icons installed

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-cyan-600/5 px-5 rounded mb-3">
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="text-cyan-600"
        aria-label={isShowPassword ? "Hide password" : "Show password"}
      >
        {isShowPassword ? <FaRegEyeSlash /> : <FaRegEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
