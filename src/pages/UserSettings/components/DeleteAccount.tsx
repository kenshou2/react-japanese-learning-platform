import { useEffect, useRef, useState } from "react";
import CtaButton from "../../../shared/CtaButton";
import AgreementPopup from "../../../shared/AgreementPopup";
import Popup from "../../../shared/Popup";

export default function DeleteAccount() {
    const [deleteApproved, setDeleteApproved] = useState<boolean | null>(null);
    const [deletePopupShown, setDeletePopupShown] = useState<boolean>(false);

    const deleteButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {        
        if (deleteApproved === false) {
            setDeletePopupShown(false);
            setDeleteApproved(null);
            return;
        }

        if (deleteApproved) {
            console.log("Account deleted"); // PLACEHOLDER, TODO        
            setDeletePopupShown(false);
            setDeleteApproved(null);
        }
    }, [deleteApproved, deletePopupShown])
    
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <h2 className='text-2xl font-semibold dark:text-neutral-400'>WARNING</h2>
                <p>Deleting your account is a permanent action that cannot be reversed. Once completed, all data associated with your account will be removed and access to any services or subscriptions will be lost. Please review the implications carefully before proceeding.</p>
                <ul className="list-disc ml-7 *:my-1">
                    <li>All personal and profile data will be permanently deleted.</li>
                    <li>Any saved content, settings, and preferences will be lost.</li>
                    <li>Access to premium features or subscriptions will end immediately.</li>
                    <li>This action cannot be undone, so ensure you have backed up any important information.</li>
                </ul>
            </div>
            <span className="text-neutral-600 dark:text-neutral-400 font-bold">
                Do you wish to delete your account?{" "}
                <span className="text-txt-primary font-normal">(This action cannot be undone)</span>
            </span>
            <div className="flex gap-3">
                <div ref={deleteButtonRef}>
                    <CtaButton onClick={() => setDeletePopupShown(prev => !prev)} fontSize="14" isBold={false} padX="6" padY="4" borderRadius="6">Delete account</CtaButton>
                </div>
                <CtaButton fontSize="14" isBold={false} padX="6" padY="4" borderRadius="6" outlined>Go back</CtaButton>
            </div>
            {deletePopupShown && 
                <Popup isOpen={deletePopupShown} onClose={() => setDeletePopupShown(false)} ignoreRef={deleteButtonRef}>
                    <AgreementPopup query="Confirm account deletion?" description="This acition cannot be undone" setAgreed={setDeleteApproved} />
                </Popup>
            }
        </div>
    )
}