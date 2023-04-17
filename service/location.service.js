const { upsertLocation } = require('../repository/pinecone.repository');

const updateLocation = async (userId, latitude, longitude,contagiado) => {
  return await upsertLocation(userId, [latitude, longitude],contagiado,[latitude*100000, longitude*100000]);
};

module.exports = {
  updateLocation,
};
