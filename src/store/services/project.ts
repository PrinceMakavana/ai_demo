import { axiosBaseQuery } from "@/lib/axiosBaseQuery"
import { createApi } from "@reduxjs/toolkit/query/react"

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getDomainData: builder.mutation<any, { domain_name: string }>({
      query: (userData: { domain_name: string }) => ({
        url: "/projects/",
        method: "POST",
        data: userData,
      }),
      transformResponse: (response: any) => {
        console.log("======= response", response)
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
        return response
      },
    }),
    UpdateDomainEnginesData: builder.mutation<any, { domain_id: string; engines: string[] }>({
      query: (userData: { domain_id: string; engines: string[] }) => ({
        url: `/projects/${userData.domain_id}/engines`,
        method: "PUT",
        data: { project_id: userData.domain_id, engines: userData.engines },
      }),
      transformResponse: (response: any) => {
        console.log("======= response", response)
        return response
      },
    }),
    SuggestDoaminCompetitors: builder.mutation<any, { project_id: string }>({
      query: (userData: { project_id: string }) => ({
        url: `/projects/${userData.project_id}/suggest-competitors`,
        method: "POST",
        data: userData,
      }),
      transformResponse: (response: any) => {
        console.log("======= response", response)
        return response
      },
    }),

    // /api/v1/projects/{project_id}/competitors
    UpdateCompititorsData: builder.mutation<any, { project_id: string; competitors: string[] }>({
      query: (userData: { project_id: string; competitors: string[] }) => ({
        url: `/projects/${userData.project_id}/competitors`,
        method: "PUT",
        data: { project_id: userData.project_id, competitors: userData.competitors },
      }),
      transformResponse: (response: any) => {
        console.log("======= response", response)
        return response
      },
    }),

    // New endpoints for search queries and analysis
    generateQueries: builder.mutation<any, { project_id: string }>({
      query: (userData: { project_id: string }) => ({
        url: `/projects/${userData.project_id}/generate-queries`,
        method: "POST",
        data: { project_id: userData.project_id },
      }),
      transformResponse: (response: any) => {
        console.log("======= generate queries response", response)
        return response
      },
    }),

    updateSearchQueries: builder.mutation<any, { project_id: string; search_queries: Array<{ query: string; importance: number }> }>({
      query: (userData: { project_id: string; search_queries: Array<{ query: string; importance: number }> }) => ({
        url: `/projects/${userData.project_id}/search-queries`,
        method: "PUT",
        data: { search_queries: userData.search_queries },
      }),
      transformResponse: (response: any) => {
        console.log("======= update search queries response", response)
        return response
      },
    }),

    generateAnalysis: builder.mutation<any, { project_id: string; num_runs_p: number }>({
      query: (userData: { project_id: string; num_runs_p: number }) => ({
        url: `/projects/${userData.project_id}/analysis/generate`,
        method: "POST",
        data: { num_runs_p: userData.num_runs_p },
      }),
      transformResponse: (response: any) => {
        console.log("======= generate analysis response", response)
        return response
      },
    }),
    updatedomainProcess: builder.mutation<any, { project_id: string }>({
      query: (userData: { project_id: string }) => ({
        url: `/projects/${userData.project_id}/process`,
        method: "POST",
        data: userData,
      }),
      transformResponse: (response: any) => {
        console.log("======= response", response)
        return response
      },
    }),
    // http://localhost:8000/api/v1/projects/{project_id}/analysis/results
    projectAnalysisResult: builder.mutation<any, { project_id: string, start_date: string, end_date: string }>({
      query: (userData: { project_id: string, start_date: string, end_date: string }) => ({
        url: `/projects/${userData.project_id}/analysis/results?start_date=${userData.start_date}&end_date=${userData.end_date}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        console.log("======= response", response)
        return response
      },
    }),
  }),


})

export const {
  useGetDomainDataMutation,
  useUpdateDomainEnginesDataMutation,
  useSuggestDoaminCompetitorsMutation,
  useUpdateCompititorsDataMutation,
  useGenerateQueriesMutation,
  useUpdateSearchQueriesMutation,
  useGenerateAnalysisMutation,
  useUpdatedomainProcessMutation,
  useProjectAnalysisResultMutation,
} = projectApi
