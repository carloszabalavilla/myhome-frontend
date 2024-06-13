// FamilyGroupContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getFamilyGroup,
  addFamilyMember,
  removeFamilyMember,
  createFamilyGroup,
  sendInvitation,
} from "../services/FamilyGroupService";
import { useUser } from "./UserContext";

const FamilyGroupContext = createContext();

export const FamilyGroupProvider = ({ children }) => {
  const [familyGroup, setFamilyGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    async function loadFamilyGroup(){
      const familyId = user.familyGroup;
      if(!familyId)
         return setLoading(false);
      try {
        const group = await getFamilyGroup(familyId);
        setFamilyGroup(group);
      } catch (error) {
        console.error("Error fetching family group:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFamilyGroup();
  }, [user.familyGroup]);

  const addMember = async (member) => {
    try {
      const newMember = await addFamilyMember(familyGroup.id, member);
      setFamilyGroup((prevGroup) => ({
        ...prevGroup,
        members: [...prevGroup.members, newMember],
      }));
    } catch (error) {
      console.error("Error adding family member:", error);
    }
  };

  const removeMember = async (memberId) => {
    try {
      await removeFamilyMember(familyGroup.id, memberId);
      setFamilyGroup((prevGroup) => ({
        ...prevGroup,
        members: prevGroup.members.filter((member) => member.id !== memberId),
      }));
    } catch (error) {
      console.error("Error removing family member:", error);
    }
  };

  const createGroup = async (familyName) => {
    try {
      const newGroup = await createFamilyGroup(user.id, familyName);
      setFamilyGroup(newGroup);
    } catch (error) {
      console.error("Error creating family group:", error);
    }
  };

  const inviteMember = async (email) => {
    try {
      await sendInvitation(familyGroup.id, email);
    } catch (error) {
      console.error("Error sending invitation:", error);
    }
  };

  return (
    <FamilyGroupContext.Provider
      value={{
        familyGroup,
        loading,
        addMember,
        removeMember,
        createGroup,
        inviteMember,
      }}
    >
      {children}
    </FamilyGroupContext.Provider>
  );
};

export const useFamilyGroup = () => useContext(FamilyGroupContext);
