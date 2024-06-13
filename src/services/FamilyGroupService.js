import axios from "./AxiosInstance";

const SERVICE_URL = "/family-group";

export const getFamilyGroup = async (id) => {
  const response = await axios.get(`${SERVICE_URL}?id=${id}`);
  return response.data;
};

export const addFamilyMember = async (groupId, member) => {
  const response = await axios.post(
    `${SERVICE_URL}/${groupId}/members`,
    member
  );
  return response.data;
};

export const removeFamilyMember = async (groupId, memberId) => {
  await axios.delete(`${SERVICE_URL}/${groupId}/members/${memberId}`);
};

export const createFamilyGroup = async (userId, groupName) => {
  const response = await axios.post(`${SERVICE_URL}`, {
    userId,
    name : groupName,
  });
  return response.data;
};

export const sendInvitation = async (groupId, email) => {
  await axios.post(`${SERVICE_URL}/${groupId}/invite`, { email });
};
