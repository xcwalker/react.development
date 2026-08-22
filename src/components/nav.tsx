import { useState } from "react";
import styles from "@/styles/components/nav.module.css";
import Button, { NavButton } from "./button";

export default function Nav(props: {
  links: ({
    href?: string;
    onClick?: () => void;
    label: string;
    icon?: string;
    openInNewTab?: boolean;
  } | null)[];
  classNames?: {
    container?: string;
    link?: string;
    button?: string;
    iconList?: string;
    iconButton?: string;
  };
  open?: {
    state: boolean;
    set: (isOpen: boolean) => void;
  };
  useIconsOnWideScreens?: boolean;
  hideOnMobile?: boolean;
  useFancyIndicator?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(props.open?.state ?? false);

  return (
    <nav
      className={`${styles.container} ${props.classNames?.container} ${props.useIconsOnWideScreens ? styles.useIconsOnWideScreens : ""} ${props.useFancyIndicator ? styles.useFancyIndicator : ""}`}
    >
      {!(props.open?.state || isOpen) && !props.hideOnMobile && (
        <Button
          className={`${styles.button} ${styles.open} ${props.classNames?.button}`}
          onClick={() => {
            if (props.open) {
              props.open.set(true);
            } else {
              setIsOpen(true);
            }
          }}
					title="Open Menu"
					text="Nav"
        />
      )}
      {!props.hideOnMobile && (
        <ul
          data-open={props.open ? props.open.state : isOpen}
          className={styles.list}
        >
          {props.links.map((link, index) => {
            if (!link) return null;

            if (link.onClick) {
              return (
                <li key={index}>
                  <button
                    onClick={() => {
                      link.onClick?.();
                      if (props.open) {
                        props.open.set(false);
                      } else {
                        setIsOpen(false);
                      }
                      if (document.activeElement instanceof HTMLElement) {
                        document.activeElement.blur();
                      }
                    }}
                    className={props.classNames?.link}
                  >
                    {link.label}
                  </button>
                </li>
              );
            }

            return (
              <li key={index}>
                <NavButton
                  href={link.href ?? "#"}
                  onClick={() => {
                    if (props.open) {
                      props.open.set(false);
                    } else {
                      setIsOpen(false);
                    }
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                  openInNewTab={link.openInNewTab}
                  text={link.label}
                ></NavButton>
              </li>
            );
          })}
          {(props.open?.state || isOpen) && (
            <Button
              onClick={() => {
                if (props.open) {
                  props.open.set(false);
                } else {
                  setIsOpen(false);
                }
              }}
              className={`${styles.button} ${styles.close} ${props.classNames?.button}`}
							title="Close Menu"
							text="Close Navigation"
            />
          )}
        </ul>
      )}
    </nav>
  );
}
