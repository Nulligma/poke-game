import { BrowserRouter, Route, Routes } from "react-router-dom"
import List from "./pages/Todo/list"
import TodoLayout from "./pages/Todo/layout"
import HomePage from "./pages/Home/homePage"
import TodoItem from "./pages/Todo/Item"
import NotFound from "./pages/Handlers/notFound"
import './app.css'

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/todo" element={<TodoLayout />}>
                <Route index element={<List />} />
                <Route path=":id" element={<TodoItem />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
}

export default Router;