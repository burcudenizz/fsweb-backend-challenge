const db = require("./data/db-config");
const request = require("supertest");
const server = require("./api/server");

afterAll(async () => {
  await db.destroy();
});
beforeAll(async () => {
  await db.migrate.rollback(); // yapılan değişiklikleri geri alır.
  await db.migrate.latest(); // yapılan değişiklikleri günceller.
  await db.seed.run(); //veritabanını doldurur.
});

//Veritabanı için bir test ortamı oluşturmak için önceki göçleri geri alır, ardından en son göçleri uygular ve başlangıç verilerini veritabanına ekler.

describe("UserTestler", () => {
  test("[1]Post(/register) ile kayıt olunuyor mu?", async () => {
    //arrange
    const userData = {
      owner_name: "guns and roses",
      password: "123456",
      email: "gunsandroses@example.com",
    };

    //act
    let actual = await request(server)
      .post("/api/auth/register")
      .send(userData);

    //assert
    expect(actual.status).toBe(201);
    expect(actual.body[0]).toHaveProperty("owner_name", "guns and roses");
    expect(actual.body[0]).toHaveProperty("email", "gunsandroses@example.com");
  });

  test("[2] Post(/register) ile kayıt olurken eksik alan olunca hata mesajı dönüyor mu?", async () => {
    //arrange
    const userData = {
      password: "123456",
    };
    let expectedMessage = "Girdiğiniz alanları kontrol ediniz!";

    //act
    let actual = await request(server)
      .post("/api/auth/register")
      .send(userData);

    //assert
    expect(actual.status).toBe(400);
    expect(actual.body.message).toEqual(expectedMessage);
  });

  test("[3] Post(/login) ile yanlış bilgiler girildiğinde hata mesajı dönüyor mu?", async () => {
    //arrange
    const userData = {
      password: "1234567",
      email: "gunsandroses@example.com",
    };

    //act
    let actual = await request(server).post("/api/auth/login").send(userData);

    //assert
    expect(actual.status).toBe(401);
  });

  test("[4]Get tüm kullanıcılar geliyor mu", async () => {
    // Arrange
    let loginPayload = {
      password: "123456",
      email: "gunsandroses@example.com",
    };
    let actual = await request(server)
      .post("/api/auth/login")
      .send(loginPayload);
    expect(actual.status).toBe(200);
    /// Act
    const response = await request(server)
      .get("/api/auth/users")
      .set("authorization", actual.body.token);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("Tweets testleri", () => {
  test("[5] Get(/tweets) ile tüm tweetler geliyor mu?", async () => {
    //act
    let loginPayload = {
      password: "123456",
      email: "gunsandroses@example.com",
    };
    let actual = await request(server)
      .post("/api/auth/login")
      .send(loginPayload);
    expect(actual.status).toBe(200);
    /// Act
    const response = await request(server)
      .get("/api/tweets")
      .set("authorization", actual.body.token);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
