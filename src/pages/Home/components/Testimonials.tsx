import { useTestimonials } from "../../../features/testimonials/hooks/useTestimonials";
import Slider from "../../../shared/Slider";

export default function Testimonials() {
    const {data: testimonials, isLoading, isError} = useTestimonials();

    if (isError)
        return (
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="font-semibold text-2xl text-center">
                    <h1>Couldn't load the course contents, please try again later.</h1>                    
                </div>
            </div>
        )
    
    return (
        <section className='px-[3%] md:px-[12%] py-[4%] bg-bg-primary border-b-2 border-b-bg-secondary'>
            <div className='mx-auto flex flex-col items-center lg:max-w-[80%] text-txt-primary text-center'>
                <h1 className='text-[32px] px-[5%] sm:px-0 lg:text-[48px] lx:text-[64px] font-bold'>Here's what users have to say about JP-Input</h1>                    
                <Slider itemsPerSlide={1} isLoading={isLoading}>
                    {testimonials?.map((testimonial, index) => (
                        <div key={index} className='flex flex-col items-center'>
                            <p className='my-8 text-md md:text-xl max-h-[200px] md:max-h-auto overflow-y-auto scrollbar-hidden'>{testimonial.text}</p>
                            <div className='flex flex-col items-center gap-3'>
                                {testimonial.pfpUrl && <img src={testimonial.pfpUrl} alt='User profile picture' className="size-10 md:size-16 rounded-full"/>}
                                <span className='text-sm md:text-lg'>{testimonial.userName}</span>
                                <div className='flex'>
                                    {[...Array(5)].map((_, i) => 
                                        i < testimonial.rating                                                
                                            ? <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="#F3C63F" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-292.463-155.615 93.845q-8.692 5.077-17.422 4.27-8.731-.808-15.808-5.885-7.076-5.077-10.922-13.269-3.847-8.192-1.231-18.115l41.307-176.691-137.384-118.923q-7.692-6.692-9.807-15.499-2.115-8.808 1.115-17.115 3.231-8.308 9.308-13.577t16.615-6.884l181.307-15.846 70.384-166.846q3.846-9.307 11.653-13.769 7.808-4.461 16.5-4.461t16.5 4.461q7.807 4.462 11.653 13.769l70.384 166.846 181.307 15.846q10.538 1.615 16.615 6.884 6.077 5.269 9.308 13.577 3.23 8.307 1.115 17.115-2.115 8.807-9.807 15.499L639.691-408.308l41.307 176.691q2.616 9.923-1.231 18.115-3.846 8.192-10.922 13.269-7.077 5.077-15.808 5.885-8.73.807-17.422-4.27L480-292.463Z"/></svg>
                                            : <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="#F3C63F" height="24" viewBox="0 -960 960 960" width="24"><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm126-5.463-155.615 93.845q-8.692 5.077-17.422 4.27-8.731-.808-15.808-5.885-7.076-5.077-10.922-13.269-3.847-8.192-1.231-18.115l41.307-176.691-137.384-118.923q-7.692-6.692-9.807-15.499-2.115-8.808 1.115-17.115 3.231-8.308 9.308-13.577t16.615-6.884l181.307-15.846 70.384-166.846q3.846-9.307 11.653-13.769 7.808-4.461 16.5-4.461t16.5 4.461q7.807 4.462 11.653 13.769l70.384 166.846 181.307 15.846q10.538 1.615 16.615 6.884 6.077 5.269 9.308 13.577 3.23 8.307 1.115 17.115-2.115 8.807-9.807 15.499L639.691-408.308l41.307 176.691q2.616 9.923-1.231 18.115-3.846 8.192-10.922 13.269-7.077 5.077-15.808 5.885-8.73.807-17.422-4.27L480-292.463ZM480-470Z"/></svg>                                            
                                    )}                                        
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>                                    
            </div>
        </section>
    )
}