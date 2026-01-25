import { type JSX } from "react";

import Tooltip from "../../../../../shared/Tooltip";
import CtaButton from "../../../../../shared/CtaButton";
import useEditUserField from "../../../../../hooks/useEditUserField";

interface ProfileHeaderProps {
    inEditMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    achievementsMap: Record<string, JSX.Element>;
}
export default function ProfileHeader({inEditMode, setEditMode, achievementsMap}: ProfileHeaderProps) {
    const {
        value: displayName,
        setValue: setDisplayName,
        userQuery: { data: user, isLoading, isError }
    } = useEditUserField('profile', 'displayName', inEditMode);
    
    return (
        <div className="flex flex-col sm:flex-row sm:justify-between gap-10">
            <div className="flex w-full flex-col sm:flex-row gap-5">
                { isError
                 ? <div className="outline outline-txt-primary bg-bg-secondary size-15 rounded-[50%]"></div>
                 : <>                  
                    { isLoading
                    ? <div className={`${inEditMode ? 'outline-sakura outline-2' : 'outline outline-txt-primary'} lading bg-bg-secondary size-15 rounded-[50%]`}></div>                
                    : <img 
                        src={user.profile.userPfpUrl} 
                        alt="User profile picture" 
                        className={`${inEditMode ? 'outline-sakura outline-2' : 'outline outline-txt-primary'} size-15 rounded-[50%]`}
                    />
                    }
                 </>
                }                
                <div className="flex flex-1 flex-col gap-2">
                    <span className="flex items-center gap-1 text-xs">
                        { isError
                         ? <div className="text-neutral-500 dark:text-neutral-400">Error</div>
                         : <>
                            { isLoading
                            ? <div className="loading w-full h-3 rounded-md"></div>
                            : <span className="text-neutral-500 dark:text-neutral-400">@{user?.account.username}</span>                            
                            }
                            { !isLoading && user?.profile.visibility === "private" &&
                                <span className="group relative rounded-sm bg-bg-secondary p-1">
                                    Private profile
                                    <Tooltip>Only your display name and profile picture will be visible</Tooltip>
                                </span>
                            }
                            { !isLoading && user?.profile.customConfig && !user?.profile.customConfig?.usernameVisible &&
                                <span className="group relative">
                                    <svg className="size-3 fill-neutral-500 dark:fill-neutral-400" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                                    <Tooltip>Your username is private</Tooltip>
                                </span>
                            }
                         </>
                        }                        
                    </span>
                    { isError
                     ? <div className="text-2xl py-1 text-txt-primary">Error</div>
                     : <>
                        {isLoading
                            ? <div className="loading w-full h-5 rounded-md"></div>
                            : <input 
                                type="text"
                                value={displayName ?? ''} 
                                onChange={(e) => setDisplayName(e.target.value)}
                                disabled={!inEditMode}
                                className={`${inEditMode ? 'outline-2 outline-sakura px-2 py-1 my-2' : 'outline-none'} text-2xl py-1 text-txt-primary rounded-sm`}
                            />
                        }                
                     </>
                    }                    
                    <span className="text-sm">Estimated level: <span className="text-sakura">{user?.profile.languageProficiency}</span></span>
                    <div className="group flex items-center gap-1 text-sm">
                        <span>Achievements:</span>
                        <div className="flex items-center">
                            {user?.profile.achievements && (user.profile.achievements).map(({id}, i) =>
                                <span 
                                    key={id}
                                    style={{transitionDelay: `${i*30}ms`}}
                                    className={`group-hover:ml-[7px] -ml-[10px] transition-[margin] duration-50 ease-linear first:ml-0 p-[2px] outline-2 outline-golden size-4 rounded-[50%] bg-bg-primary`}>
                                    {achievementsMap[id]}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>            
            <CtaButton onClick={() => setEditMode(prev => !prev)} customStyle="self-start" borderRadius="5" padX="18" padY="6" fontSize="12">
                {inEditMode
                ? "Save"
                : "Edit"
                }
            </CtaButton>            
        </div>
    )
}