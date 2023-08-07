import { InputForm } from "./components/InputForm";
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.page}>
      <InputForm />
    </div>
  );
}
