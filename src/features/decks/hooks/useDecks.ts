import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { deckService } from "../services/deckService";
import type { Deck } from "../../../types/Deck";

export const useDecks = () => {
    return useQuery({
        queryKey: ['decks'],
        queryFn: deckService.getAll,
    });
}

export const useDeck = (id: number) => {
    return useQuery({
        queryKey: ['deck', id],
        queryFn: () => deckService.getById(id),
        enabled: !!id,
    });
}

export const useCreateDeck = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDeck: Omit<Deck, 'id'>) => 
            deckService.create(newDeck),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['decks']}),
    });
}

export const useUpdateDeck = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updates}: {id: number, updates: Partial<Deck>}) => 
            deckService.update(id, updates),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({queryKey: ['deck', variables.id]}),
    });
}

export const useDeleteDeck = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deckService.delete(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['decks']}),
    });
}

export const useDeckCards = (id: number) => {    
    return useQuery({
        queryKey: ['deckCards', id],
        queryFn: () => deckService.getDeckCards(id),
        enabled: !isNaN(id),
    });
}