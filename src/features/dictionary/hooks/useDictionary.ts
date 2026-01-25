import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { dictionaryService } from "../services/dictionaryService";
import type { DictionaryEntry } from "../../../types/DictionaryEntry";

export const useDictionary = () => {
    return useQuery({
        queryKey: ['dictionaryEntries'],
        queryFn: dictionaryService.getAll,
    });
}

export const useDictionaryEntry = (id: number) => {
    return useQuery({
        queryKey: ['dictionaryEntry', id],
        queryFn: () => dictionaryService.getById(id),
        enabled: !!id,
    });
}

export const useCreateDictionaryEntry = () => {
    const queryClient = useQueryClient();
    return useMutation({        
        mutationFn: (newEntry: Omit<DictionaryEntry, 'id'>) => dictionaryService.create(newEntry),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['dictionaryEntries']}),
    });
}

export const useUpdateDictionaryEntry = () => {
    const queryClient = useQueryClient();
    return useMutation({        
        mutationFn: ({id, updates}: {id: number, updates: Partial<DictionaryEntry>}) => dictionaryService.update(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({queryKey: ['dictionaryEntry', variables.id]}),
    });
}

export const useDeleteDictionaryEntry = () => {
    const queryClient = useQueryClient();
    return useMutation({        
        mutationFn: (id: number) => dictionaryService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['dictionaryEntries']}),
    });
}