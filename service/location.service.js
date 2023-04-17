const { upsertLocation } = require('../repository/pinecone.repository');

const updateLocation = async (userId, latitude, longitude,contagiado) => {
  return await upsertLocation(userId, [latitude, longitude],contagiado);
};

module.exports = {
  updateLocation,
};
