import { useActiveUser } from "../../../context/ActiveUserContext";
import { Link } from "react-router";
import CtaButton from "../../../shared/CtaButton";
import { useGetSubscriptionPrice, useUserSubscription } from "../../../features/userSubscriptions/hooks/useUserSubscriptions";
import { useSubscriptionPlan } from "../../../features/subscriptionPlans/hooks/useSubscriptionPlans";
import { useUser } from "../../../features/users/hooks/useUser";

export default function CancelSubscription() {
    const { activeUserId: uid} = useActiveUser();
    const { data: user, isLoading: userLoading, isError: userError } = useUser(uid);
    const { data: userSubscription, isLoading: userSubscriptionLoading, isError: userSubscriptionError } = useUserSubscription(user?.account.subscriptionId ?? null);        
    const { data: subscriptionPrice } = useGetSubscriptionPrice(userSubscription ?? null);
    const { data: userSubscriptionPlan, isLoading: userSubscriptionPlanLoading, isError: userSubscriptionPlanError } = useSubscriptionPlan(userSubscription?.planId ?? null);

    const error = userError || userSubscriptionError || userSubscriptionPlanError;
    const loading = userLoading || userSubscriptionLoading || userSubscriptionPlanLoading;

    if (error)
        return <div className="font-semibold">Couln't load your subscription, please try again later. <Link to='/' className="font-bold underline text-neutral-400 dark:text-neutral-400">Contact support</Link></div>
    
    return (
        <div className="flex flex-col md:flex-row gap-10">
            { loading
             ? <div className="loading w-[200px] shrink-0 h-[250px] rounded-xl"></div>
             : <div 
                style={{background: `${userSubscriptionPlan?.backgroundStyle}`}}
                className={`flex flex-col justify-between p-3 w-[200px] shrink-0 h-[250px] overflow-auto rounded-xl`}>                
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
            <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-xl dark:text-neutral-400">Your current plan is {userSubscriptionPlan?.name}</h2>
                <p>You can cancel your subscription at any time. Once canceled, you’ll retain access to all premium features until the end of your current billing period. No further charges will be made after that.</p>
                <div className="flex flex-wrap gap-2 whitespace-nowrap">
                    <CtaButton padX="6" padY="4" disabled={loading} isBold={false}>Cancel</CtaButton>
                    <CtaButton padX="6" padY="4" disabled={loading} isBold={false} outlined={true}>Pause</CtaButton>
                    <CtaButton padX="6" padY="4" disabled={loading} isBold={false} outlined={true}>Change the plan</CtaButton>
                </div>
            </div>
        </div>
    )
}