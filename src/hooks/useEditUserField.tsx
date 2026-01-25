import { useEffect, useRef, useState } from "react";
import { useActiveUser } from "../context/ActiveUserContext";
import type { AccountUpdate, ProfileUpdate } from "../fakeServer/db/users";
import {
  useUpdateUserAccount,
  useUpdateUserProfile,
  useUser,
} from "../features/users/hooks/useUser";

export default function useEditUserField<
  S extends 'account' | 'profile',
  F extends S extends 'account' ? keyof AccountUpdate : keyof ProfileUpdate
>(
  section: S,
  field: F,
  inEditMode: boolean
) {
  const { activeUserId: uid } = useActiveUser();
  const userQuery = useUser(uid);
  const { data: user } = userQuery;
  const updateAccount = useUpdateUserAccount();
  const updateProfile = useUpdateUserProfile();

  // infer correct field type depending on section
  type ValueType = S extends 'account'
    ? AccountUpdate[F & keyof AccountUpdate]
    : ProfileUpdate[F & keyof ProfileUpdate];

  const [value, setValue] = useState<ValueType | null>(null);
  const prevInEditMode = useRef(inEditMode);

  // sync state
  useEffect(() => {
    if (!user) return;

    if (section === 'account' && user.account[field as keyof AccountUpdate] !== undefined) {
      setValue(user.account[field as keyof AccountUpdate] as ValueType);
    } else if (section === 'profile' && user.profile[field as keyof ProfileUpdate] !== undefined) {
      setValue(user.profile[field as keyof ProfileUpdate] as ValueType);
    }
  }, [user, uid, field, section]);

  // persist on exit edit mode
  useEffect(() => {
    if (prevInEditMode.current && !inEditMode && user) {
      if (section === 'account') {
        if (user.account[field as keyof AccountUpdate] !== value)
          updateAccount.mutate({
            id: uid,
            updates: { [field]: value } as AccountUpdate,
          });
      } else {
        if (user.account[field as keyof AccountUpdate] !== value)
          updateProfile.mutate({
            id: uid,
            updates: { [field]: value } as ProfileUpdate,
          });        
      }
    }    
    prevInEditMode.current = inEditMode;
  }, [inEditMode, value, user, uid, section, field]);  

  return {
    value,
    setValue,
    userQuery,
  };
}
