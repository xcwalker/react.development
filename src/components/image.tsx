import styles from "@/styles/components/image.module.css";
import Placeholder from "./placeholder";

export default function Image(
  props: React.JSX.IntrinsicElements["img"] & { usePlaceholder?: boolean },
) {
  const { usePlaceholder: placeholder, className, ...imgProps } = props;
  const ariaHidden =
    (props as React.JSX.IntrinsicElements["img"])["aria-hidden"] ?? placeholder;

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {imgProps.src !== "" && (
        <img
          {...imgProps}
          className={`${styles.image} ${placeholder ? styles.usesPlaceholder : ""}`}
          alt={imgProps.alt || (placeholder ? "Placeholder" : "")}
          aria-hidden={ariaHidden}
        />
      )}
      {placeholder && (
        <div className={styles.placeholder}>
          <Placeholder />
        </div>
      )}
    </div>
  );
}
