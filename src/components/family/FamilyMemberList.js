// FamilyMemberList.js
import React from "react";
import { useFamilyGroup } from "../../contexts/FamilyGroupContext";
import { Button, List, ListItem, ListItemText } from "@mui/material";

const FamilyMemberList = () => {
  const { familyGroup, removeMember } = useFamilyGroup();
  console.log(familyGroup);
  if (!familyGroup || familyGroup === undefined || familyGroup.length === 0)
    return null;

  return (
    <List>
      {familyGroup.members.map((member) => (
        <ListItem key={member.id}>
          <ListItemText primary={member.name} />
          <Button onClick={() => removeMember(member.id)}>Remove</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default FamilyMemberList;
