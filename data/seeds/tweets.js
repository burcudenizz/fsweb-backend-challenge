/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users").truncate();
  await knex("tweets").truncate();

  const defaultTweets = [
    {
      img_url:
        "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png",
      owner_name: "Ahmet",
      body: "Hava çok sıcakkkk!!!!",
      owner_id: "1",
    },
    {
      img_url:
        "https://img.favpng.com/14/6/3/computer-icons-user-profile-avatar-woman-png-favpng-YdKuA8GaKJMLBvX70sbctFDSh.jpg",
      owner_name: "Ayşen",
      body: "Yazılım öğrenmek çok keyifli,fakat zor :)",
      owner_id: "2",
    },
    {
      img_url:
        "https://images.freeimages.com/fic/images/icons/1994/vista_style_business_and_data/256/users.png?ref=findicons",
      owner_name: "Ayşen",
      body: "About",
      owner_id: "2",
    },
    {
      img_url:
        "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Images.png",
      owner_name: "Elif",
      body: "Yanlışlıkla veritabanını sildim :) ",
      owner_id: "3",
    },
  ];

  const defaultUsers = [
    {
      email: "ahmet@gmail.com",
      password: "123456",
      owner_name: "Ahmet",
    },
    {
      email: "aysen@gmail.com",
      password: "123456",
      owner_name: "Ayşen",
    },
    {
      email: "elif@gmail.com",
      password: "123456",
      owner_name: "Elif",
    },
  ];

  await knex("users").insert(defaultUsers);
  await knex("tweets").insert(defaultTweets);
};
