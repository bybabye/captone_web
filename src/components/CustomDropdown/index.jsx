import  { useState } from "react";
import styles from "./styles.module.css";
export default function Dropdown({ values, onSelect }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (value) => {
    setSelectedValue(value);
  
    onSelect(value); // Callback to parent component
  };

  return (
    <div className={`${styles.dropdown_container}`}>
      <select
        value={selectedValue}
        onChange={(e) => handleSelect(e.target.value)}
      >

        {values.map((value,index) => (
          <option key={value.code} value={index}>
            {value.name}
          </option>
        ))}
      </select>
    </div>
  );
};


