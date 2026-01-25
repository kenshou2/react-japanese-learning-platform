import { useState } from "react";
import SelectForm from "../../../shared/SelectForm";
import { supportInquiryCategories, type SupportInquiry} from "../../../types/SupportInquiry";
import CtaButton from "../../../shared/CtaButton";
import { useCreateSupportInquiry } from "../../../features/supportInquiries/hooks/useSupportInquiries";
import { useNotification } from "../../../context/NotificationContext";

export default function ContactSupport() {    
    const [category, setCategory] = useState<string | null>(supportInquiryCategories[0]);
    const createInquiry = useCreateSupportInquiry();
    const notify = useNotification();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        notify('Request sent successfully');
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        const newInquiry: Omit<SupportInquiry, "id"> = {
            subject: (data['subject'] as string),
            description: (data['description'] as string),
            category: (category as SupportInquiry['category']),
        }        
        createInquiry.mutate(newInquiry);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-[500px]">
            <div className="flex flex-col gap-2">
                <label htmlFor="subject-input" className="font-bold  dark:text-neutral-400">Subject</label>
                <input 
                    type="text" 
                    name="subject" 
                    id="subject-input" 
                    placeholder="Short issue description" 
                    maxLength={600}
                    required
                    className="p-2 focus:outline-btn-primary dark:focus:outline-sakura focus:outline-2 focus:outline-offset-2 border-2 border-neutral-400 dark:border-neutral-500 rounded-md placeholder-neutral-500"/>                    
            </div>        
            <div className="flex flex-col gap-2">
                <h5 className="font-bold  dark:text-neutral-400">Category</h5>
                <SelectForm customStyles="max-w-max" selectOptions={[...supportInquiryCategories]} current={category} setCurrent={setCategory} />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="description-input" className="font-bold  dark:text-neutral-400">
                    Description{' '}
                    <span className="font-normal text-sm dark:text-neutral-300">(up to 600 characters)</span>
                </label>
                <textarea 
                name="description" 
                id="description-input" 
                placeholder="Enter your message" 
                maxLength={600}
                required
                className="resize-none min-h-[100px] overflow-auto p-2 focus:outline-btn-primary dark:focus:outline-sakura focus:outline-2 focus:outline-offset-2 border-2 border-neutral-400 dark:border-neutral-500 rounded-md placeholder-neutral-500"></textarea>
            </div>            
            <CtaButton type="submit" padY="8">Send request</CtaButton>
        </form>
    )
}