import axios from "./AxiosInstance";

const serviceURL = "/auth";

export async function NewUser(userData) {
  try {
    return await axios.post(`${serviceURL}/register`, userData);
  } catch (error) {
    throw error;
  }
}

export async function UserLogin(loginRequest) {
  try {
    const response = await axios.post(`${serviceURL}/login`, loginRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function StartRecovery(email) {
  try {
    const response = await axios.get(
      `${serviceURL}/recovery-password/start/${email}`
    );
    return response.data.message;
  } catch (error) {
    throw error;
  }
}

export async function LetRecoveryPassword(jwt) {
  try {
    return await axios.get(`${serviceURL}/recovery-password/let`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function ChangePassword(jwt, resetRequest) {
  try {
    return await axios.post(
      `${serviceURL}/recovery-password/change`,
      resetRequest,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}

export async function SendConfirmEmail(jwt) {
  try {
    return await axios.put(`${serviceURL}/confirm`, { token: jwt });
  } catch (error) {
    throw error;
  }
}

export async function ResendConfirmation(email) {
  try {
    return await axios.get(`${serviceURL}/resend-confirmation/${email}`);
  } catch (error) {
    throw error;
  }
}
