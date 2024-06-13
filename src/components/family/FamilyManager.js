import React, { useEffect } from "react";
import { Box, Typography, Fade, Divider } from "@mui/material";
import { styled } from "@mui/system";
import DashboardDrawer from "../custom/Drawer";
import CreateFamilyGroupForm from "./CreateFamilyGroupForm";
import InviteFamilyMemberForm from "./InviteFamilyMemberForm";
import AddFamilyMemberForm from "./AddFamilyMemberForm";
import FamilyMemberList from "./FamilyMemberList";
import { useFamilyGroup } from "../../contexts/FamilyGroupContext";
import {
  SBox,
  SPaper,
  SCenteredContainer,
} from "../../styles/StyledComponents";
import { useAppBar } from "../../contexts/AppBarContext";

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const SubtitleTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
}));

export function CreateFamilyGroup() {
  const { setOpen } = useAppBar();

  useEffect(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Box sx={{ display: "flex" }}>
      <DashboardDrawer />
      <SCenteredContainer>
        <SBox>
          <Fade in={true} timeout={1000}>
            <SPaper>
              <SBox>
                <TitleTypography variant="h3" component="h1">
                  Aun no tienes ningún grupo familiar
                </TitleTypography>
                <SubtitleTypography variant="h4" component="h2">
                  Puedes crear tu primer grupo familiar
                </SubtitleTypography>
                <Divider orientation="vertical" flexItem />
                <CreateFamilyGroupForm />
              </SBox>
            </SPaper>
          </Fade>
        </SBox>
      </SCenteredContainer>
    </Box>
  );
}

export default function FamilyManager() {
  const { familyGroup } = useFamilyGroup();
  if (!familyGroup || familyGroup === undefined || familyGroup.length === 0)
    return <CreateFamilyGroup />;
  else {
    return <FamilyGroup />;
  }
}

function FamilyGroup() {
  return (
    <Box sx={{ display: "flex" }}>
      <DashboardDrawer />
      <SCenteredContainer>
        <SBox>
          <Typography variant="h4" component="h1" gutterBottom>
            Tu familia
          </Typography>
          <InviteFamilyMemberForm />
          <AddFamilyMemberForm />
          <FamilyMemberList />
        </SBox>
      </SCenteredContainer>
    </Box>
  );
}
