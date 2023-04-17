const { pineconeInstance } = require('../config/pinecone.config');
const { PINECONE_NAMESPACE } = require('../config/config');

const upsertLocation = async (userId, location,contagiado) => {
  const upsertRequest = {
    vectors: [
      {
        id: userId,
        values: location,
        metadata: {
          userId,
          contagiado
        },
      },
    ],
  };
  const nearestUsers = await findNearestUsers(location, 10);
  await pineconeInstance.index.upsert({ upsertRequest });

  return nearestUsers;
};

const findNearestUsers = async (vector, topK) => {
  const queryRequest = {
    vector,
    topK,
    includeValues: true,
    includeMetadata: true,
    namespace: PINECONE_NAMESPACE,
    filter:{
      contagiado:true
    }
  };
  const searchResponse = await pineconeInstance.index.query({
    queryRequest,
  });
  return searchResponse;
};

module.exports = {
  upsertLocation,
  findNearestUsers,
};
