import React, { useState } from "react";
import { useFamilyGroup } from "../../contexts/FamilyGroupContext";
import { Alert, Button, TextField } from "@mui/material";
import { SBox } from "../../styles/StyledComponents";

const CreateFamilyGroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const { createGroup } = useFamilyGroup();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!groupName.trim()) return;
    setSaving(true); setError("");
    try { await createGroup(groupName.trim()); setGroupName(""); }
    catch { setError("No se pudo guardar el grupo. Comprueba la conexión."); }
    finally { setSaving(false); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SBox>
        <TextField
          label="Nombre de la familia"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
      <Button disabled={saving || !groupName.trim()} type="submit">Crear</Button>
      </SBox>
    </form>
  );
};

export default CreateFamilyGroupForm;

