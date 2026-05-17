export default function GFIcon(props: { icon: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${props.className}`}>
      {props.icon}
    </span>
  );
}
