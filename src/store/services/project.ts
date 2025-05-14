import { axiosBaseQuery } from "@/lib/axiosBaseQuery"
import { createApi } from "@reduxjs/toolkit/query/react"

export const projectApi = createApi({
    reducerPath: "projectApi",
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getDomainData: builder.mutation<any, { "domain_name": string }>({
            query: (userData: { "domain_name": string }) => ({
                url: "/projects/",
                method: "POST",
                data: userData,
            }),
            transformResponse: (response: any) => {
                console.log("======= response", response);
                // {
                // analysis_results: null
                // competitors: null
                // content: null
                // created_at: "2025-05-12T2:1:45.640354"
                // domain_name: "princemakavana.com"
                // project_id: "projec:2181db63-1e42-43b6-9ba0-2eab921bf38e"
                // search_queries: null
                // selected_engines: null
                // status_analysis: "pending"
                // status_competitor_generation: "pending"
                // status_content_processing: "pending"
                // status_query_generation: "pending"
                // }
                return response;
            }
        }),
        UpdateDomainEnginesData: builder.mutation<any, { "domain_id": string, engines: string[] }>({
            query: (userData: { "domain_id": string, engines: string[] }) => ({
                url: `/projects/${userData.domain_id}/engines`,
                method: "PUT",
                data: { "project_id": userData.domain_id, "engines": userData.engines },
            }),
            transformResponse: (response: any) => {
                console.log("======= response", response);
                return response;
            }
        }),
        SuggestDoaminCompetitors: builder.mutation<any, { "project_id": string }>({
            query: (userData: { "project_id": string }) => ({
                url: `/projects/${userData.project_id}/suggest-competitors`,
                method: "POST",
                data: userData,
            }),
            transformResponse: (response: any) => {
                console.log("======= response", response);
                return response;
            }
        }),

        // /api/v1/projects/{project_id}/competitors

        UpdateCompititorsData: builder.mutation<any, { "project_id": string, competitors: string[] }>({
            query: (userData: { "project_id": string, competitors: string[] }) => ({
                url: `/projects/${userData.project_id}/competitors`,
                method: "PUT",
                data: { "project_id": userData.project_id, "competitors": userData.competitors },
            }),
            transformResponse: (response: any) => {
                console.log("======= response", response);
                return response;
            }
        }),
    })
})

export const { useGetDomainDataMutation, useUpdateDomainEnginesDataMutation, useSuggestDoaminCompetitorsMutation, useUpdateCompititorsDataMutation } = projectApi