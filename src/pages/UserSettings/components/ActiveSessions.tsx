import { useEffect, useState, type JSX } from "react";
import { useActiveUser } from "../../../context/ActiveUserContext";
import Table from "../../../shared/Table";
import AgreementPopup from "../../../shared/AgreementPopup";
import CtaButton from "../../../shared/CtaButton";
import { useUpdateUserAccount, useUser } from "../../../features/users/hooks/useUser";
import Popup from "../../../shared/Popup";

const iconMap: Record<string, JSX.Element> = {
    desktop: <svg className="fill-txt-primary size-5 shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z"/></svg>,
    mobile: <svg className="fill-txt-primary size-5 shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v124q18 7 29 22t11 34v80q0 19-11 34t-29 22v404q0 33-23.5 56.5T680-40H280Zm0-80h400v-720H280v720Zm0 0v-720 720Zm200-600q17 0 28.5-11.5T520-760q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760q0 17 11.5 28.5T480-720Z"/></svg>,
    tablet: <svg className="fill-txt-primary size-5 shrink-0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-140q17 0 28.5-11.5T520-180q0-17-11.5-28.5T480-220q-17 0-28.5 11.5T440-180q0 17 11.5 28.5T480-140ZM200-40q-33 0-56.5-23.5T120-120v-720q0-33 23.5-56.5T200-920h560q33 0 56.5 23.5T840-840v720q0 33-23.5 56.5T760-40H200Zm0-200v120h560v-120H200Zm0-80h560v-400H200v400Zm0-480h560v-40H200v40Zm0 0v-40 40Zm0 560v120-120Z"/></svg>,
}

export default function ActiveSessions() {
    const {activeUserId: uid} = useActiveUser();
    const { data: user, isLoading, isError } = useUser(uid);
    const updateAccount = useUpdateUserAccount();
    
    const [removeAgreed, setRemoveAgreed] = useState<boolean | null>(null);    
    const [agreementShown, setAgreementShown] = useState(false);
    const [deviceToDelete, setDeviceToDelete] = useState<number | null>(null);
    const [deleteAll, setDeleteAll] = useState<boolean | null>(null);
    
    const columnNames = [        
        'Device',
        'Location',
        'First sign in',
        'Last active',
        ''
    ];
    
    const data = user?.account.activeSessions.map(session => {
        const device = <span className="mr-auto flex items-center gap-3">
            <span>{iconMap[session.deviceType]}</span>
            {session.device}
        </span>

        const remove = (
            <button
                onClick={() => {
                    if (agreementShown) return;
                    setAgreementShown(prev => !prev);
                    setDeviceToDelete(session.id);
                }}
                className="cursor-pointer">                
                <svg className="fill-sakura" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-392 300-212q-18 18-44 18t-44-18q-18-18-18-44t18-44l180-180-180-180q-18-18-18-44t18-44q18-18 44-18t44 18l180 180 180-180q18-18 44-18t44 18q18 18 18 44t-18 44L568-480l180 180q18 18 18 44t-18 44q-18 18-44 18t-44-18L480-392Z"/></svg>
            </button>
        );

        return [
            device,
            String(session.country + ', ' + session.city),
            session.firstSignedIn.toLocaleDateString(),
            session.lastActive.toLocaleDateString(),
            remove,
        ];        
    });

    useEffect(() => {
        if (removeAgreed === false) {
            setAgreementShown(false);
            setRemoveAgreed(null);
            return;
        }

        if (removeAgreed) {
            if (deviceToDelete) {
            removeDevice(deviceToDelete);
            setDeviceToDelete(null);
            } else if (deleteAll) {
            removeAllDevices();
            setDeleteAll(null);
            }

            setAgreementShown(false);
            setRemoveAgreed(null);
        }
    }, [removeAgreed, deviceToDelete, deleteAll]);


    function removeDevice(id: number) {
        const newDevices = user?.account.activeSessions.filter(s => s.id !== id);
        updateAccount.mutate({id: uid, updates: {activeSessions: newDevices}});        
    }
    
    function removeAllDevices() {
        updateAccount.mutate({id: uid, updates: { activeSessions: [] }});
    }

    if (isError || !data)
        return (
            <span className="text-neutral-300 dark:text-neutral-400 text-lg">
                Couldn’t load your account data, please try again later.
            </span>
        );
    
    return (
        <div className="flex flex-col gap-10 max-w-[225px] md:max-w-[400px] lg:max-w-[650px] xl:max-w-[800px]">                            
            <Table columns={columnNames} title="Sessions" data={data} isLoading={isLoading} isError={isError} />
            <CtaButton 
                onClick={() => {
                    if (data.length === 0) return;
                    if (agreementShown) return;
                    setAgreementShown(prev => !prev);
                    setDeleteAll(true);
                }}
                isBold={false}
                customStyle={"sm:self-end"}>
                Sign out from all devices
            </CtaButton>            
            <Popup isOpen={agreementShown} onClose={() => setAgreementShown(false)}>
                <AgreementPopup
                    query={
                        deleteAll
                            ? "Are you sure you want to sign out from all devices?"
                            : "Are you sure you want to remove this device?"
                    }
                    description={
                        deleteAll
                            ? "This will sign you out from all devices, including this one."
                            : undefined
                    }
                    setAgreed={setRemoveAgreed}
                />
            </Popup>            
        </div>
    )
}