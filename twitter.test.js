const db = require("./data/db-config");
const request = require("supertest");
const server = require("./api/server");

afterAll(async () => {
  await db.destroy();
});
beforeEach(async () => {
  await db.migrate.rollback(); // yapılan değişiklikleri geri alır.
  await db.migrate.latest(); // yapılan değişiklikleri günceller.
  await db.seed.run(); //veritabanını doldurur.
});

//Veritabanı için bir test ortamı oluşturmak için önceki göçleri geri alır, ardından en son göçleri uygular ve başlangıç verilerini veritabanına ekler.

/*
describe("TweetTestler", () => {
  test("[1] Get(/) methoduyla tüm tweetler geliyor mu", async () => {
    //act
    const allTweets = await request(server).get("/api/tweets");
    //assert
    expect(allTweets.statusCode).toBe(200);
    expect(allTweets.body.length).toBe(4);
  });

  test("[2] Get(/owner_id) methoduyla istenen id'deki kullanıcıa ait tweetler geliyor mu", () => {});
});

*/

describe("UserTestler", () => {
  test("[1]Post(/register) ile kayıt olunuyor mu?", async () => {
    //arrange
    const userData = {
      owner_name: "Burcudeniz",
      password: "123456",
      email: "burcuu@example.com",
    };

    //act
    let actual = await request(server)
      .post("/api/auth/register")
      .send(userData);

    //assert
    expect(actual.status).toBe(201);
    expect(actual.body[0]).toHaveProperty("owner_name", "Burcudeniz");
    expect(actual.body[0]).toHaveProperty("email", "burcuu@example.com");
  });

  test("[2] Post(/register) ile kayıt olurken eksik alan olunca hata mesajı dönüyor mu?", async () => {
    //arrange
    const userData = {
      owner_name: "Polly",
      password: "123456",
    };
    let expectedMessage = "Girdiğiniz alanları kontrol ediniz!";
    //act
    let actual = await request(server)
      .post("/api/auth/register")
      .send(userData);

    //assert
    expect(actual.status).toBe(400);
    expect(actual.body[0][message]).toEqual(expectedMessage);
  });
});
