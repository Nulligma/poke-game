import { useQuery } from "@tanstack/react-query";
import { getHomePage } from "../../api/todoApi";
import QueryVaiidator from "../../components/queryVAlidator";
import * as z from 'zod';
import { Api } from "@mono/types";

const HomePage = () => {
    const query = useQuery({ queryKey: ['home-page'], queryFn: getHomePage });

    return <QueryVaiidator query={query} schema={Api.Message}>
        <div>{query.data?.message}</div>
    </QueryVaiidator>
}

export default HomePage;