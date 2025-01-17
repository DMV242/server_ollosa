const SendVerificationCodeSchema = {
  body: {
    type: "object",
    required: ["email"],
    properties: {
      email: { type: "string", format: "email" },
    },
  },
};

const UserHeaderSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
  },
  required: ["email"],
  additionalProperties: false,
};

const UserHeaderResponseSchema = {
  200: {
    type: "object",
    properties: {
      message: { type: "string" },
    },
  },
  403: {
    type: "object",
    properties: {
      error: { type: "string" },
    },
  },
};

const UserBodySchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
    dateOfBirth: { type: "string", format: "date" },
    code: { type: "string", minLength: 6 },
    acceptTheTermsOfUse: { type: "boolean" },
  },
  required: [
    "firstName",
    "lastName",
    "email",
    "password",
    "dateOfBirth",
    "code",
    "acceptTheTermsOfUse",
  ],
  additionalProperties: false,
};

const LoginBodySchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
  },
};

const LoginGoogleBodySchema = {
  type: "object",
  required: ["email", "firstName", "lastName"],
  properties: {
    email: { type: "string", format: "email" },
    firstName: { type: "string" },
    lastName: { type: "string" },
  },
};

const LoginGoogleResponseSchema = {
  200: {
    type: "object",
    properties: {
      _id: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string", format: "email" },
      token: { type: "string" },
    },
  },
  403: {
    type: "object",
    properties: {
      error: { type: "string" },
    },
  },
};

const UserResponseSchema = {
  200: {
    type: "object",
    properties: {
      _id: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string", format: "email" },
      dateOfBirth: { type: "string", format: "date" },
    },
  },
};

const LoginResponseSchema = {
  200: {
    type: "object",
    properties: {
      _id: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string", format: "email" },
      dateOfBirth: { type: "string", format: "date" },
      token: { type: "string" },
    },
  },
  400: {
    type: "object",
    properties: {
      error: { type: "string" },
    },
  },
};

const ResetPasswordBodySchema = {
  type: "object",
  required: ["email", "newPassword", "code"],
  properties: {
    email: { type: "string", format: "email" },
    newPassword: { type: "string", minLength: 6 },
    code: { type: "string", minLength: 6 },
  },
};

const ResetPasswordResponseSchema = {
  200: {
    type: "object",
    properties: {
      message: { type: "string" },
    },
  },
  400: {
    type: "object",
    properties: {
      error: { type: "string" },
    },
  },
};

const deleteUserResponseSchema = {
  200: {
    type: "object",
    properties: {
      userId: { type: "string", description: "The ID of the deleted user." },
      message: { type: "string", default: "User deleted successfully." },
    },
  },
  400: {
    type: "object",
    properties: {
      error: { type: "string" },
    },
  },
  500: {
    type: "object",
    properties: {
      error: { type: "string" },
    },
  },
};

const UsersResponseSchema = {
  200: {
    description: "Succès - Liste des utilisateurs renvoyée",
    type: "array",
    items: {
      type: "object",
      properties: {
        _id: {
          type: "string",
          description: "L'identifiant unique de l'utilisateur",
        },
        firstName: {
          type: "string",
          description: "Le prénom de l'utilisateur",
        },
        lastName: {
          type: "string",
          description: "Le nom de famille de l'utilisateur",
        },
        email: {
          type: "string",
          format: "email",
          description: "L'email de l'utilisateur",
        },
        dateOfBirth: {
          type: "string",
          format: "date-time",
          description: "La date de naissance de l'utilisateur",
        },
        emailIsValid: {
          type: "boolean",
          description: "Indique si l'email a été validé",
        },
        acceptTheTermsOfUse: {
          type: "boolean",
          description:
            "Indique si l'utilisateur a accepté les conditions d'utilisation",
        },
        isAdmin: {
          type: "boolean",
          description: "Indique si l'utilisateur est administrateur",
        },
      },
      required: [
        "_id",
        "firstName",
        "lastName",
        "email",
        "emailIsValid",
        "acceptTheTermsOfUse",
        "isAdmin",
      ],
    },
  },
  403: {
    description: "Accès refusé - L'utilisateur n'est pas administrateur",
    type: "object",
    properties: {
      message: { type: "string" },
    },
  },
  500: {
    description: "Erreur serveur",
    type: "object",
    properties: {
      message: { type: "string" },
    },
  },
};

const getOneUserResponseSchema = {
  200: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        description: "The unique identifier for the user.",
      },
      firstName: { type: "string", description: "First name of the user." },
      lastName: { type: "string", description: "Last name of the user." },
      email: { type: "string", description: "Email address of the user." },
      dateOfBirth: {
        type: "string",
        description: "Date of birth of the user.",
      },
      isAdmin: {
        type: "boolean",
        description: "Whether the user is an administrator.",
      },
      accountGoogle: {
        type: "boolean",
        description: "Whether the user has a Google account linked.",
      },
      phoneNumber: { type: "string", description: "Phone number of the user." },
      pays: { type: "string", description: "Country of the user." },
      province: { type: "string", description: "Province of the user." },
      ville: { type: "string", description: "City of the user." },
      codePostale: { type: "string", description: "Postal code of the user." },
      adresse: { type: "string", description: "Address of the user." },
      adresseComplement: {
        type: "string",
        description: "Additional address details of the user.",
      },
    },
  },
  400: {
    type: "object",
    properties: {
      error: {
        type: "string",
        description:
          "Error message indicating the token is expired or invalid.",
      },
    },
  },
  404: {
    type: "object",
    properties: {
      error: {
        type: "string",
        description: "Error message indicating the user was not found.",
      },
    },
  },
  500: {
    type: "object",
    properties: {
      error: { type: "string", description: "Generic server error message." },
    },
  },
};

module.exports = {
  UserHeaderSchema,
  UserBodySchema,
  UserResponseSchema,
  LoginResponseSchema,
  LoginBodySchema,
  SendVerificationCodeSchema,
  ResetPasswordBodySchema,
  ResetPasswordResponseSchema,
  deleteUserResponseSchema,
  UsersResponseSchema,
  UserHeaderResponseSchema,
  LoginGoogleBodySchema,
  LoginGoogleResponseSchema,
  getOneUserResponseSchema,
};
