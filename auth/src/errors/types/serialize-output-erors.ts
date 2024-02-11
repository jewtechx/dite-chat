export type serializedErrorField = {
  [key: string]: string[];
};

export type serializedError = {
  message: string;
  fields?: serializedErrorField;
};

export type serializeErrorOutput = {
  errors: serializedError[];
};
