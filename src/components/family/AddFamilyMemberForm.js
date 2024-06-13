import React, { useState } from "react";
import { useFamilyGroup } from "../../contexts/FamilyGroupContext";
import { Button, TextField } from "@mui/material";

export default function AddFamilyMemberForm() {
  const [name, setName] = useState("");
  const { addMember } = useFamilyGroup();

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember({ name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Nombre del miembro"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit">Añadir</Button>
    </form>
  );
};

