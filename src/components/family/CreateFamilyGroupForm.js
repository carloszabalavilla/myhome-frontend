import React, { useState } from "react";
import { useFamilyGroup } from "../../contexts/FamilyGroupContext";
import { Button, TextField } from "@mui/material";
import { SBox, SCenteredContainer } from "../../styles/StyledComponents";

const CreateFamilyGroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const { createGroup } = useFamilyGroup();

  const handleSubmit = (e) => {
    e.preventDefault();
    createGroup(groupName);
    setGroupName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <SBox>
        <TextField
          label="Nombre de la familia"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Button type="submit">Crear</Button>
      </SBox>
    </form>
  );
};

export default CreateFamilyGroupForm;

