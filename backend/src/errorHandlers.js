const remoteApiHandleErrorResponse = (res, error) => {
  if (error.response && error.response.data) {
    res.status(error.response.status).json({ error: error.response.data.message });
  } else {
    res.status(error.status || 500).json({ error: error.message || 'An error occurred' });
  }
};


module.exports = {
    remoteApiHandleErrorResponse
}