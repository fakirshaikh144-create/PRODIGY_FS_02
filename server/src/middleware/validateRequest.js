export const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({ body: req.body, params: req.params, query: req.query });
    next();
  } catch (error) {
    const issues = error.errors?.map((issue) => ({ field: issue.path.join('.'), message: issue.message })) || [];
    return res.status(400).json({ error: 'Validation failed.', details: issues });
  }
};
