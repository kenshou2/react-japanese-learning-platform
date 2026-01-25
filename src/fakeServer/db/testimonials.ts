import type { Testimonial } from "../../types/Testimonial";

const BASE_PFP_URL = '/storage/users/userAvatars';

let testimonialId = 0;
let testimonials: Testimonial[] = populateTestimonials();

export const testimonialsDb = {
    getAll: () => {
        return [...testimonials]
    },
    getById: (id: number) => {
        const testimonial = testimonials.find(t => t.id === id);
        if (!testimonial) throw new Error(`Testimonial with ${id} not found.`);
        return testimonial;
    },
    create: (testimonial: Omit<Testimonial, 'id'>) => {
        const newTestimonial: Testimonial = {
            id: testimonialId++,
            ...testimonial,
        };
        testimonials.push(newTestimonial);
        return newTestimonial;
    },
    update: (id: number, updates: Partial<Testimonial>) => {
        const toUpdateIndex = testimonials.findIndex(t => t.id === id);
        if (toUpdateIndex === -1)
            throw new Error(`Testimonial with ${id} not found.`);
        testimonials[toUpdateIndex] = {...testimonials[toUpdateIndex], ...updates};
        return testimonials[toUpdateIndex];
    },
    delete: (id: number) => {
        const lengthBefore = testimonials.length;
        testimonials = testimonials.filter(a => a.id !== id);
        if (lengthBefore !== testimonials.length)
            return true;
        else throw new Error(`Testimonial with ${id} not found.`);        
    },
}

function populateTestimonials(): Testimonial[] {return [
    {
        id: testimonialId++,
        pfpUrl: `${BASE_PFP_URL}/0.png`,
        userName: 'John T.',
        text: 'I love how practical and immersive the lessons are! The focus on real conversations, rather than just textbook dialogues, has really helped me understand how Japanese is actually spoken in daily life.',
        rating: 5
    },
    {
        id: testimonialId++,
        pfpUrl: `${BASE_PFP_URL}/1.png`,
        userName: 'Emily R.',
        text: 'The structured modules make learning Japanese enjoyable and manageable. I especially enjoy the travel and conversation decks, which allow me to practice vocabulary and expressions I can actually use when I travel.',
        rating: 4
    },
    {
        id: testimonialId++,
        pfpUrl: `${BASE_PFP_URL}/2.png`,
        userName: 'Justin L.',
        text: 'The combination of listening, reading, and speaking exercises is excellent. I feel like I retain grammar and vocabulary more naturally, and I can follow real-world conversations much better than before.',
        rating: 5
    },
    {
        id: testimonialId++,
        pfpUrl: `${BASE_PFP_URL}/3.png`,
        userName: 'Daniel K.',
        text: 'I really appreciate the step-by-step approach from beginner to advanced levels. The N1 course materials are challenging but realistic, and they give me confidence that I can handle professional and social situations in Japanese.',
        rating: 5
    },
    {
        id: testimonialId++,
        pfpUrl: `${BASE_PFP_URL}/4.png`,
        userName: 'Maya S.',
        text: 'The example sentences and practical dialogues are invaluable. I can immediately apply what I learn in real-life situations, whether ordering at a restaurant, asking for directions, or chatting with native speakers.',
        rating: 4
    },    
]};