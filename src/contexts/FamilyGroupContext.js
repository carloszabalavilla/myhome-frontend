import React, { createContext, useContext, useEffect, useState } from "react";
import { getFamilyGroup, createFamilyGroup } from "../services/FamilyGroupService";
import { useUser } from "./UserContext";

const FamilyGroupContext = createContext();
export const FamilyGroupProvider = ({ children }) => {
  const [familyGroup, setFamilyGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useUser();
  const familyId = user?.familyGroup;
  useEffect(() => {
    let active = true;
    if (!familyId) { setFamilyGroup(null); return; }
    setLoading(true);
    getFamilyGroup(familyId).then(group => { if (active) setFamilyGroup(group); })
      .catch(() => { if (active) setFamilyGroup(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [familyId]);
  const createGroup = async name => {
    const group = await createFamilyGroup(user.id, name);
    setFamilyGroup(group);
    updateUser({ ...user, familyGroup: group.id });
  };
  return <FamilyGroupContext.Provider value={{ familyGroup, loading, createGroup }}>{children}</FamilyGroupContext.Provider>;
};
export const useFamilyGroup = () => useContext(FamilyGroupContext);
