export const registerFormModel = {
  formId: "userForm",
  formField: {
    userEmail: {
      name: "userEmail",
      autoComplete: "email",
      autoFocus: false,
      label: "Correo Electrónico",
      required: true,
      requiredErrorMsg: "El correo electrónico es obligatorio",
      invalidErrorMsg: "Correo electrónico inválido",
    },
    userPassword: {
      name: "userPassword",
      autoFocus: false,
      label: "Contraseña",
      required: true,
      requiredErrorMsg: "La contraseña es obligatoria",
      invalidErrorMsg:
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial",
    },
    userPassword2: {
      name: "userPassword2",
      autoFocus: false,
      label: "Confirma la contraseña",
      required: true,
      requiredErrorMsg: "Por favor confirma tu contraseña",
      mismatchErrorMsg: "Las contraseñas no coinciden",
    },
    firstName: {
      name: "firstName",
      autoFocus: true,
      label: "Nombre",
      required: true,
      requiredErrorMsg: "El nombre es obligatorio",
    },
    lastName: {
      name: "lastName",
      autoFocus: true,
      label: "Apellido",
      required: true,
      requiredErrorMsg: "El apellido es obligatorio",
    },
    address: {
      name: "address",
      autoFocus: false,
      label: "Dirección",
      requiredErrorMsg: "La dirección es obligatoria",
    },
    birthDate: {
      name: "birthDate",
      label: "Fecha de Nacimiento",
      required: true,
      requiredErrorMsg: "La fecha de nacimiento es obligatoria",
      invalidMaxErrorMsg: "Debes tener al menos 16 años",
      invalidMinErrorMsg: "La fecha no puede ser anterior a 110 años",
    },
    phoneNumber: {
      name: "phoneNumber",
      autoFocus: false,
      label: "Numero de telefono",
      invalidErrorMsg:
        "El número de teléfono debe ser un número válido de España",
    },
    acceptTerms: {
      name: "acceptTerms",
      label: "Acepto los términos y condiciones",
    },
    activeNewsletter: {
      name: "activeNewsletter",
      label: "Acepto recibir información sobre promociones y novedades",
    },
  },
};

export const {
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

export const loginFormModel = {
  formId: "loginForm",
  formField: {
    loginEmail: {
      name: "loginEmail",
      autoComplete: "email",
      autoFocus: true,
      label: "Correo Electrónico",
      required: true,
      requiredErrorMsg: "El correo electrónico es obligatorio",
      invalidErrorMsg: "Correo electrónico inválido",
    },
    loginPassword: {
      name: "loginPassword",
      autoFocus: false,
      label: "Contraseña",
      required: true,
      requiredErrorMsg: "La contraseña es obligatoria",
    },
  },
};

export const {
  formField: { loginEmail, loginPassword },
} = loginFormModel;

export const taskFormModel = {
  formId: "taskForm",
  formField: {
    taskName: {
      name: "name",
      label: "Nombre",
      required: true,
      requiredErrorMsg: "El nombre es obligatorio",
    },
    taskDescription: {
      name: "description",
      label: "Descripción",
      required: false,
    },
    taskDate: {
      name: "date",
      label: "Fecha",
      required: true,
      requiredErrorMsg: "La fecha es obligatoria",
    },
    taskStartHour: {
      name: "startHour",
      label: "Hora de inicio",
      required: true,
      requiredErrorMsg: "La hora de inicio es obligatoria",
    },
    taskEndHour: {
      name: "endHour",
      label: "Hora de fin",
      required: true,
      requiredErrorMsg: "La hora de fin es obligatoria",
    },
  },
};

export const {
  formField: {
    taskName,
    taskDescription,
    taskDate,
    taskStartHour,
    taskEndHour,
  },
} = taskFormModel;

export const resetPasswordFormModel = {
  formId: "resetForm",
  formField: {
    resetPassword: {
      name: "resetPassword",
      autoFocus: false,
      label: "Contraseña",
      required: true,
      requiredErrorMsg: "La contraseña es obligatoria",
      invalidErrorMsg:
        "Minimo 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial",
    },
    resetPassword2: {
      name: "resetPassword2",
      autoFocus: false,
      label: "Confirma la contraseña",
      required: true,
      requiredErrorMsg: "Por favor confirma tu contraseña",
      mismatchErrorMsg: "Las contraseñas no coinciden",
    },
  },
};

export const {
  formField: { resetPassword, resetPassword2 },
} = resetPasswordFormModel;
