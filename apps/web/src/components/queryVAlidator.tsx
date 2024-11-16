import { DefinedUseQueryResult, UseQueryResult } from "@tanstack/react-query"
import React from "react";
import * as z from 'zod'

interface ValidatorProps {
    query: UseQueryResult
    children: React.ReactNode
    schema: z.ZodSchema
}

const QueryVaiidator = ({ query, children, schema }: ValidatorProps) => {

    if (query.isFetching) return <div>Loading....</div>;

    if (query.isError)
        return (
            <div>
                {query.error.status}: {query.error.message}:
                {JSON.stringify(query.error.response?.data) || "No added message"}
            </div>
        );

    try {
        schema.parse(query.data)
    } catch (error) {
        const errorMessage = `Validation Error: ${(error as z.ZodError).errors.map(e => e.message).join(', ')}`;
        return <div>{errorMessage}</div>
    }

    return <>{children}</>
}

export default QueryVaiidator;