import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles/form.module.css";

type Inputs = {
    title: string,
    due: Date
}

const AddTodoForm = () => {
    const { register, handleSubmit } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    return <form className={styles.create} onSubmit={handleSubmit(onSubmit)}>
        <input {...register('title')} className={styles.title} />
        <input type="date" {...register('due')} />
        <button type="submit">Add</button>
    </form>
}

export default AddTodoForm;