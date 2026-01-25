import { useEffect, useState } from "react";
import EditableForm, { type FieldConfig } from "../../../shared/EditableForm";
import { useActiveUser } from "../../../context/ActiveUserContext";
import CtaButton from "../../../shared/CtaButton";
import { useUpdateUserAccount, useUser } from "../../../features/users/hooks/useUser";
import type { User } from "../../../types/User";

export default function PasswordAndLogin() {
    const {activeUserId: uid} = useActiveUser();
    const { data: user, isLoading, isError } = useUser(uid);    
    const updateAccount = useUpdateUserAccount();
    const [inputs, setInputs] = useState<User['account'] | null>(null);
    const [inEditMode, setInEditMode] = useState(false);

    const accountConfig: FieldConfig<User['account']>[] = [
        { key: "email", label: "Email", type: "email" },
        { key: "password", label: "Password", type: "password" },
    ];

    useEffect(() => {
        if (user?.account) {
          setInputs(user.account);
        }
      }, [user]);

    if (isError)
        return (
        <span className="text-neutral-300 dark:text-neutral-400 text-lg">
            Couldn’t load your account data, please try again later.
        </span>
        );
      
    function toggleTwoFactor() {
        updateAccount.mutate({id: uid, updates: {
            twoFactorOn: {
                enabled: !user?.account.twoFactorOn.enabled,
                dateChanged: new Date(),
            }
        }})        
    }

    if (isLoading || !inputs)
    return (
      <div className="flex flex-col gap-10 w-[200px] sm:w-[300px]">
        <div>
          <div className="loading w-1/2 h-6 rounded-lg my-2"></div>
          <div className="loading w-full h-8 rounded-lg"></div>
        </div>
        <div className="flex flex-col gap-2">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <div className="loading w-1/2 h-6 rounded-lg my-2"></div>
              <div className="loading w-full h-8 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
    
    return (
        <div className="flex flex-col gap-10">
            <EditableForm 
                data={inputs} 
                config={accountConfig} 
                editable={inEditMode}
                onChange={(updated) => setInputs(updated)}
                onSubmit={() => {
                    setInEditMode((prev) => !prev);
                    updateAccount.mutate({ id: uid, updates: inputs });
                }}
                >
            </EditableForm>            
            <div className="flex flex-col gap-5">
                <h2 className='text-2xl font-semibold'>Two-Factor Authentication</h2>
                {user?.account.twoFactorOn.enabled
                    ? <span>
                            Enabled from {user.account.twoFactorOn.dateChanged?.toLocaleDateString()}.{" "}
                            <span onClick={() => toggleTwoFactor()} aria-label="Disable two-factor authentication" className="text-btn-primary dark:text-sakura underline font-semibold cursor-pointer">Disable</span>
                        </span>
                    : <span>
                            Two-factor authentication not enabled.{" "}
                            <span onClick={() => toggleTwoFactor()} aria-label="Disable two-factor authentication" className="text-btn-primary dark:text-sakura underline font-semibold cursor-pointer">Enable</span>
                        </span>
                }
            </div>
            <div className="flex flex-col gap-5">
                <h2 className='text-2xl font-semibold'>Backup codes</h2>
                <div className="flex flex-wrap gap-2 whitespace-nowrap">
                    <CtaButton padX="6" padY="4" isBold={false}>Cancel</CtaButton>                    
                    <CtaButton padX="6" padY="4" isBold={false} outlined>Regenerate</CtaButton>
                </div>
            </div>
        </div>
    )
}