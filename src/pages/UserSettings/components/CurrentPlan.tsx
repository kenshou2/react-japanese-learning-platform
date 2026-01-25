import { useState } from "react";
import { Link } from "react-router";
import { useActiveUser } from "../../../context/ActiveUserContext";
import CtaButton from "../../../shared/CtaButton";
import { useUser } from "../../../features/users/hooks/useUser";
import { useGetSubscriptionPrice, useUserSubscription } from "../../../features/userSubscriptions/hooks/useUserSubscriptions";
import { useSubscriptionPlan, useSubscriptionPlans } from "../../../features/subscriptionPlans/hooks/useSubscriptionPlans";

export default function CurrentPlan() {
    const { activeUserId: uid} = useActiveUser();
    const { data: user, isLoading: userLoading, isError: userError } = useUser(uid);
    const { data: userSubscription, isLoading: userSubscriptionLoading, isError: userSubscriptionError } = useUserSubscription(user?.account.subscriptionId ?? null);
    const { data: subscriptionPrice } = useGetSubscriptionPrice(userSubscription ?? null);
    const { data: userSubscriptionPlan, isLoading: userSubscriptionPlanLoading, isError: userSubscriptionPlanError } = useSubscriptionPlan(userSubscription?.planId ?? null);
    const { data: subscriptionPlans, isLoading: subscriptionPlansLoading, isError: subscriptionPlansError } = useSubscriptionPlans();
    const [pricingMode, setPricingMode] = useState<'monthly' | 'annual'>('monthly');

    const error = userError || userSubscriptionError || userSubscriptionPlanError || subscriptionPlansError;
    const loading = userLoading || userSubscriptionLoading || userSubscriptionPlanLoading || subscriptionPlansLoading;
    
    if (error)
        return <div className="font-semibold">Couln't load your subscription, please try again later. <Link to='/' className="font-bold underline text-neutral-400 dark:text-neutral-400">Contact support</Link></div>
    
    return (
        <div className="flex flex-col gap-20">
            <div className="flex flex-col md:flex-row gap-10">
                { loading
                 ? <div className="loading w-[200px] shrink-0 h-[250px] rounded-xl"></div>                 
                 : <div 
                        style={{background: `${userSubscriptionPlan?.backgroundStyle}`}}
                        className="flex flex-col justify-between p-3 w-[200px] shrink-0 h-[250px] overflow-auto rounded-xl">
                        <div className="flex flex-col gap-1 text-neutral-100">
                            <h3 className="text-3xl font-bold">{userSubscriptionPlan?.name}</h3>
                            {userSubscription?.nextChargeDate && <span className="font-semibold">charge on: {userSubscription?.nextChargeDate.toLocaleDateString()}</span>}
                        </div>                    
                        <div className="flex flex-col text-neutral-700 font-extrabold items-end">
                            <h3 className="text-3xl/6">{subscriptionPrice}$</h3>
                            <span className="text-2xl/6">{userSubscription?.paymentInterval}</span>
                        </div>
                    </div>
                }
                <div className="flex flex-col gap-3 w-full">
                    { loading
                     ? <>
                        {[...Array(3)].map((_, i) =>
                            <div key={i} className="loading h-5 rounded-md"></div>
                        )}
                        <ul className="pl-3">
                            {[...Array(3)].map((_, i) =>
                                <li key={i}>
                                    <div className="loading w-1/2 h-3 my-3 rounded-md"></div>
                                </li>
                            )}
                        </ul>
                     </>
                     : <>
                        <p className="font-[500]">{userSubscriptionPlan?.description}</p>
                        <ul className="list-disc pl-6 text-neutral-500 dark:text-neutral-400 font-semibold">
                            {userSubscriptionPlan?.features.map((feature, i) => 
                                <li key={i}>{feature}</li>
                            )}
                        </ul>
                     </>
                    }                    
                </div>
            </div>                    
            <div className="flex flex-col gap-5">
                <h2 className='text-2xl font-semibold'>Other plans</h2>        
                <div className="flex flex-col">
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setPricingMode("monthly")} 
                            className={`${pricingMode === 'monthly' ? 'text-neutral-200 dark:text-neutral-800 bg-neutral-800 dark:bg-neutral-200' : 'border-1 border-neutral-800 dark:border-neutral-300'} px-1 py-[3px] font-[500] text-xs rounded-sm cursor-pointer`}>
                            Monthly
                        </button>
                        <button 
                            onClick={() => setPricingMode("annual")} 
                            className={`${pricingMode === 'annual' ? 'text-neutral-200 dark:text-neutral-800 bg-neutral-800 dark:bg-neutral-200' : 'border-1 border-neutral-800 dark:border-neutral-300'} px-[6px] py-[3px] font-[500] text-xs rounded-sm cursor-pointer`}>
                            Annual
                        </button>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        { loading
                         ? [...Array(2)].map((_, i) => 
                                <div key={i} className="loading mt-4 w-[200px] shrink-0 h-[250px] rounded-xl"></div>
                            )
                         : subscriptionPlans?.filter(s => s.id !== userSubscription?.planId).map((plan, i) =>
                            <div
                                key={i} 
                                className="relative z-10 mt-4 flex flex-col gap-3 w-[200px] shrink-0 overflow-auto">
                                <div className="flex flex-col gap-3 *:px-3 h-[250px] outline-1 outline-txt-primary outline-offset-[-1px] rounded-xl">
                                    <div
                                        style={{background: `${plan.backgroundStyle}`}}
                                        className="relative z-20 py-3 text-3xl text-neutral-100 font-bold rounded-xl">
                                        {plan.name}
                                    </div>
                                    <ul className="list-disc ml-4 font-semibold max-h-full overflow-auto text-sm">
                                        {plan.features.map((feature, i) =>
                                            <li key={i}>{feature}</li>
                                        )}
                                    </ul>
                                    <div className="mt-auto py-3 flex flex-col font-bold items-end border-t-1 border-txt-primary">
                                        <h3 className="text-3xl/6">{pricingMode === 'annual' ? plan.annualPrice : plan.monthlyPrice}$</h3>
                                        <span className="text-2xl/6">{pricingMode === 'annual' ? 'annually' : 'monthly'}</span>
                                    </div>
                                </div>
                                <CtaButton url="/" borderRadius="8" fullSpace>Change plan</CtaButton>
                            </div>
                        )
                        }
                    </div>
                </div>        
            </div>
        </div>
    )
}