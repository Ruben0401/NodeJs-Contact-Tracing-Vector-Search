const { upsertLocation } = require('../repository/pinecone.repository');

const updateLocation = async (userId, latitude, longitude,contagiado) => {
  return await upsertLocation(userId, [latitude*100000, longitude*100000],contagiado);
};

module.exports = {
  updateLocation,
};
