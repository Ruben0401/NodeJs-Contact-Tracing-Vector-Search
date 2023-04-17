const { upsertLocation } = require('../repository/pinecone.repository');

const updateLocation = async (userId, latitude, longitude,contagiado) => {
  return await upsertLocation(userId, [latitude, longitude],contagiado,[latitude*10000, longitude*10000]);
};

module.exports = {
  updateLocation,
};
