import Style from "@site/src/components/home/bubble-dailog.module.scss";
import { a } from "@react-spring/web";

const BubbleDialog = ({
  text,
  onClick,
  spring
}: {
  text: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  spring?: any;
}) => {
  return (
    <a.div style={spring} onClick={onClick}>
      <div className={Style.dialogBubble}>
        <div>{text}</div>
        <div className={Style.dialogArrow}></div>
      </div>
    </a.div>
  );
};

export default BubbleDialog;
