import "./button.css";

export default function Button(text, _class) {
  return <button class={_class}>{text}</button>;
}
