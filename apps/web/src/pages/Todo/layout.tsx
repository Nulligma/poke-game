import { Outlet } from "react-router-dom"
import styles from './todoStyles.module.css'

const TodoLayout = () => {
    return <div className="card">
        <section className={styles.layout}>
            <h3>My Todos</h3>
            <Outlet />
            
        </section>
    </div>
}

export default TodoLayout;