import { useEffect, useState } from "react";
import { useActiveUser } from "../../../context/ActiveUserContext";
import EditableForm from "../../../shared/EditableForm";
import { type FieldConfig } from "../../../shared/EditableForm";
import Tooltip from "../../../shared/Tooltip";
import { useUpdateUserAccount, useUser } from "../../../features/users/hooks/useUser";
import type { User } from "../../../types/User";

export default function Account() {
  const { activeUserId: uid } = useActiveUser();
  const { data: user, isLoading, isError } = useUser(uid);
  const updateAccount = useUpdateUserAccount();
  const [inEditMode, setInEditMode] = useState(false);
  const [inputs, setInputs] = useState<User['account'] | null>(null);

  useEffect(() => {
    if (user?.account) {
      setInputs(user.account);
    }
  }, [user]);

  const accountConfig: FieldConfig<User['account']>[] = [
    { key: "email", label: "Email", type: "email" },
    { key: "phoneNumber", label: "Phone Number", type: "tel" },
  ];

  if (isError)
    return (
      <span className="text-neutral-300 dark:text-neutral-400 text-lg">
        Couldn’t load your account data, please try again later.
      </span>
    );

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
      <div className="flex flex-col gap-2 w-[200px] sm:w-[300px]">
        <h2 className="text-2xl font-semibold">Username</h2>
        <span className="relative group w-full px-3 py-2 bg-neutral-200 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-500 rounded-md">
          {inputs.username}
          <Tooltip>Your username cannot be changed after registration</Tooltip>
        </span>
      </div>

      <EditableForm
        data={inputs}
        config={accountConfig}
        editable={inEditMode}
        onChange={(updated) => setInputs(updated)}
        onSubmit={() => {
          setInEditMode((prev) => !prev);
          updateAccount.mutate({ id: uid, updates: inputs });
        }}
      />
    </div>
  );
}