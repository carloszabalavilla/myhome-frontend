import * as Yup from "yup";
import { registerFormModel, loginFormModel, taskFormModel, resetPasswordFormModel } from "./formModel";
import dayjs from "dayjs";

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

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
const phoneRegex = /^[6789]\d{8}$/;
export const registerValidationSchema = [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(firstName.requiredErrorMsg),
    [userEmail.name]: Yup.string()
      .matches(emailRegex, userEmail.invalidErrorMsg)
      .required(userEmail.requiredErrorMsg),
    [userPassword.name]: Yup.string()
      .matches(passwordRegex, userPassword.invalidErrorMsg)
      .required(userPassword.requiredErrorMsg),
    [userPassword2.name]: Yup.string()
      .oneOf([Yup.ref(userPassword.name)], userPassword2.mismatchErrorMsg)
      .required(userPassword2.requiredErrorMsg),
  }),
  Yup.object().shape({
    [lastName.name]: Yup.string().required(lastName.requiredErrorMsg),
    [birthDate.name]: Yup.date()
      .required(birthDate.requiredErrorMsg)
      .min(
        dayjs().subtract(110, "year").format("YYYY-MM-DD"),
        birthDate.invalidMinErrorMsg
      )
      .max(
        dayjs().subtract(16, "year").format("YYYY-MM-DD"),
        birthDate.invalidMaxErrorMsg
      ),
    [address.name]: Yup.string().nullable().max(50),
    [phoneNumber.name]: Yup.string()
      .nullable()
      .matches(phoneRegex, phoneNumber.invalidErrorMsg),
  }),
  Yup.object().shape({
    [acceptTerms.name]: Yup.boolean().oneOf(
      [true],
      "Debe aceptar los términos y condiciones"
    ),
    [activeNewsletter.name]: Yup.boolean(),
  }),
];

const {
  formField: { loginEmail, loginPassword },
} = loginFormModel;

export const loginValidationSchema = Yup.object().shape({
  [loginEmail.name]: Yup.string().required(loginEmail.requiredErrorMsg),
  [loginPassword.name]: Yup.string().required(loginPassword.requiredErrorMsg),
});

const {
  formField: {
    taskName,
    taskDescription,
    taskDate,
    taskStartHour,
    taskEndHour,
  },
} = taskFormModel;

export const addTaskValidationSchema = Yup.object().shape({
  [taskName.name]: Yup.string()
    .required(taskName.requiredErrorMsg)
    .min(3)
    .max(25),
  [taskDescription.name]: Yup.string().nullable().max(50),
  [taskDate.name]: Yup.string().required(taskDate.requiredErrorMsg),
  [taskStartHour.name]: Yup.string().required(taskStartHour.requiredErrorMsg),
  [taskEndHour.endHour]: Yup.string().required(taskEndHour.requiredErrorMsg),
});

const {
  formField: { resetPassword, resetPassword2 },
} = resetPasswordFormModel;

export const resetPasswordValidationSchema = Yup.object().shape({
  [resetPassword.name]: Yup.string()
    .matches(passwordRegex, resetPassword.invalidErrorMsg)
    .required(resetPassword.requiredErrorMsg),
  [resetPassword2.name]: Yup.string()
    .oneOf([Yup.ref(resetPassword.name)], resetPassword2.mismatchErrorMsg)
    .required(resetPassword2.requiredErrorMsg),
});
