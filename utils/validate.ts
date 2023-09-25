const validate = async (schema: any, values: any) => {
  try {
    await schema.validate(values);
    return null;
  } catch ({ errors }: any) {
    return errors[0];
  }
};

export default validate;
