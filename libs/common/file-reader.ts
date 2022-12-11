export const fileReader = async (payload) => {
  const file = await payload;

  const reader = file.createReadStream();

  const dataChunks = [];

  return new Promise((resolve, reject) => {
    reader.on('data', (data) => {
      dataChunks.push(Buffer.from(data));
    });

    reader.on('end', async () => {
      resolve(Buffer.concat(dataChunks));
    });

    reader.on('error', (error) => {
      reject(error);
    });
  });
};
