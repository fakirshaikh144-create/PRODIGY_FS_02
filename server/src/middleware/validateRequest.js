export const validateRequest = (schema) => async (req, res, next) => {
  try {
    const parsed = await schema.parseAsync({ body: req.body, params: req.params, query: req.query });
    if (parsed.body !== undefined) {
      req.body = parsed.body;
    }
    if (parsed.params !== undefined) {
      req.params = parsed.params;
    }
    if (parsed.query !== undefined) {
      req.query = parsed.query;
    }
    next();
  } catch (error) {
    const issues = error.errors?.map((issue) => ({ field: issue.path.join('.'), message: issue.message })) || [];
    return res.status(400).json({ error: 'Validation failed.', details: issues });
  }
};