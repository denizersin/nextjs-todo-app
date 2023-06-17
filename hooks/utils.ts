import { queryClient } from '@/components/Providers';
import { UseQueryOptions, useQuery } from '@tanstack/react-query'




interface ISetQueryOptions extends UseQueryOptions {

}

export const useSetQueryKey = (queryKey: any, initialData: any = null, options?: ISetQueryOptions) => {
    return useQuery({
        queryKey,
        enabled: false,
        initialData,
        ...options
    })
}

export const getQueryData = (queryKey: [any]) => queryClient.getQueryData(queryKey);



interface prevCallback {
    (prev: any): any
}

export const updateQuery = (key: [any], data: any | prevCallback) => {
    queryClient.setQueryData(key,
        typeof data === 'function' ? data(getQueryData(key)) : data
    );
}

// setQueryData yeni datai'yi ayni olsa dahi gunceller (ayni data ise gereksiz  re-render olur)
// parent ve child ayni query var ise ve o query guncellenirse sadece parent>child re-render olur 