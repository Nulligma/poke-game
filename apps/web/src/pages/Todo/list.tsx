import AddTodoForm from "../../components/addTodoForm";
import ListTile from "../../components/listTile";
import styles from "./todoStyles.module.css"
import { useQuery } from "@tanstack/react-query";
import { getTodoList } from "../../api/todoApi";
import QueryVaiidator from "../../components/queryVAlidator";
import { Api } from "@mono/types";


const List = () => {
    const query = useQuery({ initialData: [], queryKey: ['todo-list'], queryFn: getTodoList });

    return <QueryVaiidator query={query} schema={Api.TodoObjs}>
        <div className={styles.todoList}>
            <ul>
                {query.data.map(todo => <ListTile key={todo._id} {...todo} />)}
            </ul>

            <AddTodoForm />

            {/* <section className={styles.create}>
            <input placeholder="Add a new todo" id="title" className={styles.title}/>
            <input type="date" id="due" name="birthday" placeholder="due date"/>
            <button>Add</button>
        </section> */}
        </div>
    </QueryVaiidator>
}

export default List;

