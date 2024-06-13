import React, { useState } from "react";
import { useFamilyGroup } from "../../contexts/FamilyGroupContext";
import { Button, TextField } from "@mui/material";

export default function InviteFamilyMemberForm() {
  const [email, setEmail] = useState("");
  const { inviteMember } = useFamilyGroup();

  const handleSubmit = (e) => {
    e.preventDefault();
    inviteMember(email);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email del usuario"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Invitar un nuevo miembro</Button>
    </form>
  );
};
