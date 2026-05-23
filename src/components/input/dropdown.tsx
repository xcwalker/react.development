import styles from "@/styles/components/input/dropdown.module.css";
import { Fragment, useState } from "react";
import Button from "../button";

export default function InputDropdown(props: {
  id: string;
  label: string;
  value: string;
  options: {
    icon?: string;
    label: string;
    value: string;
    selectable?: boolean;
  }[];
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const placeholder = props.placeholder || "Select...";

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={props.id} className={styles.label}>
        {props.label}
      </label>
      <Button
        onClick={() => setIsOpen(true)}
        title="Select option"
        onBlur={() => {
          if (!document.querySelector(`#${props.id}-dropdown:hover`)) {
            setIsOpen(false);
          }
        }}
				text={props.options.find((v) => v.value === props.value)?.label || placeholder}
      />
      <div
        className={
          styles.dropdown + (isOpen ? " " + styles.open : " " + styles.closed)
        }
        role="listbox"
        aria-labelledby={props.id}
        id={`${props.id}-dropdown`}
        onClick={() => {
          setIsOpen(true);
        }}
        onBlur={() => {
          // only close if not hovering over the dropdown
          if (!document.querySelector(`#${props.id}-dropdown:hover`)) {
            setIsOpen(false);
          }
        }}
      >
        {props.options.map(
          (option) =>
            option.selectable !== false && (
              <Fragment key={option.value}>
                <Button
                  onClick={() => {
                    props.onChange(option.value);
                    setTimeout(() => {
                      setIsOpen(false);
                    }, 100);
                  }}
                  className={styles.dropdownOption}
                  title={`Select ${option.label}`}
                  variant={props.value === option.value ? "primary" : "secondary"}
                  text={option.label}
                />
              </Fragment>
            ),
        )}
      </div>
    </div>
  );
}
