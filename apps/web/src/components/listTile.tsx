import { TodoObj } from "@mono/types/src/api/response";

const ListTile = ({ _id, title, dueDate, done }: TodoObj) => {
    return <li>
        <input type="checkbox" id={_id} name={_id} value={title} defaultChecked={done} />
        <label htmlFor={_id}>{title}</label>
        <i>{dueDate.toDateString()}</i>
    </li>
}

export default ListTile;