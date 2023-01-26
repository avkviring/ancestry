import { firstLetter } from "../../helpers/utils";
import styles from "./styles.module.scss";

type Props = React.HtmlHTMLAttributes<
  Omit<HTMLLIElement, "className" | "style">
> & {
  index: number;
  img?: string;
  name?: string;
  surname?: string;
};

const PersonSlider = ({ index, img, name, surname, ...rest }: Props) => {
  return (
    <li
      className={styles.slider__info_person}
      style={{ transform: `translateX(${index * -50}%)` }}
      key={index}
      {...rest}
    >
      {img ? (
        <img src={img} alt="" key={index} />
      ) : (
        <>
          {firstLetter(name)}
          {firstLetter(surname)}
        </>
      )}
    </li>
  );
};

export default PersonSlider;
