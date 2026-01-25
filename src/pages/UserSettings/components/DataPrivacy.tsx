import { useEffect, useState } from "react";

import { useActiveUser } from "../../../context/ActiveUserContext";
import SelectForm from "../../../shared/SelectForm";
import ToggleButton from "../../../shared/ToggleButton";
import { type ConfigKey, type ConfigEntry, type User } from "../../../types/User";
import { useUpdateUserProfile, useUser } from "../../../features/users/hooks/useUser";

export default function DataPrivacy() {
    const {activeUserId: uid} = useActiveUser();
    const { data: user, isLoading, isError } = useUser(uid);
    const updateProfile = useUpdateUserProfile();
        
    const [advancedOpen, setAdvancedOpen] = useState(false);
    const [profileVisibility, setProfileVisibility] = useState<string | null>(null);
    const [userConfig, setUserConfig] = useState<User['profile']['customConfig'] | null>(null);
    const visibilityOptions = ["private", "public"];

    function handleAdvancedSettings(configKey: ConfigKey, value: ConfigEntry) {
        if (!user)
            return;        
        const newConfig = {...user.profile.customConfig,
            [configKey]: {...user.profile.customConfig[configKey], state: !value.state},
        }
        setUserConfig(newConfig);
        updateProfile.mutate({id: uid, updates: {customConfig: newConfig}});
    }

    useEffect(() => {
        if (!profileVisibility)
            return;        
        updateProfile.mutate({id: uid, updates: {visibility: (profileVisibility as ('private' | 'public')) }})
    }, [profileVisibility]);

    useEffect(() => {
        if (user?.profile.visibility) {
            setProfileVisibility(user.profile.visibility);
            setUserConfig(user.profile.customConfig);
        }
    }, [user]);

    if (isError)
        return (
            <span className="text-neutral-300 dark:text-neutral-400 text-lg">
                Couldn’t load your account data, please try again later.
            </span>
        );
    
    if (isLoading || !user)
    return (
      <div className="flex flex-col gap-10 w-[200px] sm:w-[300px]">
        <div>
          <div className="loading w-1/2 h-6 rounded-lg my-2"></div>
          <div className="loading w-full h-8 rounded-lg"></div>
        </div>
        <div className="flex flex-col gap-2">
          {[...Array(1)].map((_, i) => (
            <div key={i}>
              <div className="loading w-1/2 h-6 rounded-lg my-2"></div>
              <div className="loading w-full h-8 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
                <h2 className='text-2xl font-semibold'>Profile visibility</h2>
                <SelectForm customStyles="max-w-[100px]" selectOptions={visibilityOptions} current={profileVisibility} setCurrent={setProfileVisibility}></SelectForm>
            </div>
            <div className="flex flex-col gap-5 max-w-[300px]">
                <div onClick={() => setAdvancedOpen(prev => !prev)} aria-label="Advanced visibility settings" className="flex justify-between items-center cursor-pointer">
                  <h2 className="text-2xl font-semibold">Advanced settings</h2>
                  <svg className={`${advancedOpen ? '-rotate-90' : 'rotate-90'}  fill-blue-600 dark:fill-blue-400 size-5`} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m367.384-480 301.308 301.308q11.923 11.923 11.615 28.077-.308 16.153-12.231 28.076-11.922 11.923-28.076 11.923t-28.076-11.923L305.078-428.77q-10.847-10.846-16.077-24.307-5.231-13.462-5.231-26.923 0-13.461 5.231-26.923 5.23-13.461 16.077-24.307l306.846-306.846q11.922-11.923 28.384-11.616 16.461.308 28.384 12.231 11.923 11.923 11.923 28.076 0 16.154-11.923 28.077L367.384-480Z"/></svg>
                </div>
                <div className={`${advancedOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} grid transition-[grid-template-rows] duration-300`}>
                    <div className="overflow-hidden flex flex-col gap-5">
                        {userConfig &&
                        (Object.entries(userConfig) as [ConfigKey, ConfigEntry][]).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between gap-3">
                                <span className="text-neutral-500 dark:text-neutral-400">{value.label}</span>
                                <ToggleButton onToggle={() => handleAdvancedSettings(key, value)} state={value.state} />
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}