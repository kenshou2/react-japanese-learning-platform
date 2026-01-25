import { useActiveUser } from "../../../context/ActiveUserContext"
import Table from "../../../shared/Table";
import { Link } from "react-router";
import capitalizeText from "../../../utils/capitalizeText";
import { useUserSubscriptions } from "../../../features/userSubscriptions/hooks/useUserSubscriptions";
import { useUser } from "../../../features/users/hooks/useUser";
import { useSubscriptionPlans } from "../../../features/subscriptionPlans/hooks/useSubscriptionPlans";

export default function BillingDetails() {
    const {activeUserId: uid} = useActiveUser();
    const {data: user} = useUser(uid);
    const {data: userSubscriptions, isLoading: userSubscriptionLoading, isError: userSubscriptionError} = useUserSubscriptions();    
    const {data: subscriptionPlans } = useSubscriptionPlans();

    const columnNames = [
        'Plan',
        'Recurring',
        'Date',
        'Status',
        'Payment method',
        'Price',
        'Invoice',
    ];

    const historyData: React.ReactNode[][] = [];
    const upcomingData: React.ReactNode[][] = [];
    user?.account.billingHistory.forEach(({subscriptionId, date}) => {
        const subscription = userSubscriptions?.find(sub => sub.id === subscriptionId);
        const plan = subscriptionPlans?.find(plan => subscription?.planId === plan.id);

        const planName = plan?.name;        
        const price = subscription?.paymentInterval === "monthly" ? plan?.monthlyPrice : plan?.annualPrice        
        const recurring = subscription?.paymentInterval;
        const status = subscription?.status;
        const paymentMethod = user.account.paymentMethods.find(p => subscription?.paymentMethodId === p.id)?.cardNumber;
        const paymentMethodTrimmed = "*" + paymentMethod?.slice(paymentMethod.length-4, paymentMethod.length);    

        const rowSet = [
            planName,
            capitalizeText(recurring), 
            date.toLocaleDateString(), 
            capitalizeText(status),
            paymentMethodTrimmed, 
            String(price)+"$",
            <Link aria-label="Download invoice" to='/'><svg className="hover:bg-bg-secondary p-1 rounded-md size-7 fill-txt-primary" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg></Link>
        ];

        if (status === 'active')
            upcomingData.push(rowSet);
        else
            historyData.push(rowSet);        
    });    
    
    return (
        <div className="flex flex-col gap-10 max-w-[225px] md:max-w-[400px] lg:max-w-[650px] xl:max-w-[800px]">                            
            <Table columns={columnNames} title="Upcoming" data={upcomingData} isLoading={userSubscriptionLoading} isError={userSubscriptionError} />
            <Table columns={columnNames} title="History" data={historyData} isLoading={userSubscriptionLoading} isError={userSubscriptionError} />
        </div>
    )
}

