import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://brkzmn:<password>@cluster0.bbbfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const main = async () => {
  const newCity = {
    ID: "4080",
    Name: "NewRotterdam",
    CountryCode: "NLD",
    District: "Zuid-Holland",
    Population: "623652",
  };

  try {
    await client.connect();
    const collection = client.db("world").collection("city");
    const addResult = await collection.insertOne(newCity);
    console.log(addResult);
    const updateResult = await collection.updateOne(
      { ID: "4080" },
      { $set: { Population: "1111111" } }
    );
    console.log(updateResult);
    const findCity = await collection.findOne({ Name: "NewRotterdam" });
    console.log(findCity);
    const findCountryCode = await collection
      .find({ CountryCode: "NLD" })
      .toArray();
    console.log(findCountryCode);
    const deleteCity = await collection.deleteMany({ Name: "NewRotterdam" });
    console.log(deleteCity);
  } catch (error) {
    console.log(error);
  }
  client.close();
};

main().catch((err) => console.log(err));
