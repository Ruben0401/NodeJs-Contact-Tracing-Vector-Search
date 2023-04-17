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
          contagiado,
        },
      },
    ],
    namespace:PINECONE_NAMESPACE
  };
  let nearestUsers = [];
  if(!contagiado){
     nearestUsers = await findNearestUsers(location, 10,userId);
    
  }
  await pineconeInstance.index.upsert({ upsertRequest });

  return nearestUsers;
};

const findNearestUsers = async (vector, topK,id) => {
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
  const matches = searchResponse["matches"]
  const final =[]
  for (let i=0;i<matches.length;i++){
    let obj = {...matches[i]}
    if(obj["id"] ===  id ) continue;
    let distance = calcularDistancia(vector[0],vector[1],obj.values[0],obj.values[1])
    obj["distance"] = distance
    final.push(obj)
  }
  return final;
};

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371000; // radio de la tierra en metros
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distancia = R * c;
  return distancia;
}

module.exports = {
  upsertLocation,
  findNearestUsers,
};
