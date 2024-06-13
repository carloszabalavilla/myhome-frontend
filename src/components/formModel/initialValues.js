import dayjs from "dayjs";
import { registerFormModel, loginFormModel, taskFormModel, resetPasswordFormModel } from "./formModel";

const {
  formField: {
    userEmail,
    userPassword,
    userPassword2,
    firstName,
    lastName,
    address,
    birthDate,
    phoneNumber,
    acceptTerms,
    activeNewsletter,
  },
} = registerFormModel;

export const registerInitialValues = {
  [userEmail.name]: "",
  [userPassword.name]: "",
  [userPassword2.name]: "",
  [firstName.name]: "",
  [lastName.name]: "",
  [address.name]: "",
  [birthDate.name]: dayjs().subtract(16, "year").toDate(),
  [phoneNumber.name]: "",
  [acceptTerms.name]: false,
  [activeNewsletter.name]: false,
};

const {
  formField: { loginEmail, loginPassword },
} = loginFormModel;

export const loginInitialValues = {
  [loginEmail.name]: "",
  [loginPassword.name]: "",
};

const {
  formField: {
    taskName,
    taskDescription,
    taskDate,
    taskStartHour,
    taskEndHour,
  },
} = taskFormModel;

export const taskFormInitialValues = {
  [taskName.name]: "",
  [taskDescription.name]: "",
  [taskDate.name]: new Date(),
  [taskStartHour.name]: today(),
  [taskEndHour.name]: today(),
};

function today() {
  const newDate = new Date();
  newDate.setHours(0);
  newDate.setMinutes(0);
  return newDate;
}

const {
  formField: { resetPassword, resetPassword2 },
} = resetPasswordFormModel;

export const resetInitialValues = {
  [resetPassword.name]: "",
  [resetPassword2.name]: "",
};
