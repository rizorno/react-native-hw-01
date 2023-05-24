import avaUser from "../images/avaUser.png";
import avaComment from "../images/avaComment.png";
import post1 from "../images/post1.png";
import post2 from "../images/post2.png";
import post3 from "../images/post3.png";

export const USER = [
  {
    id: "01-N-R",
    name: "Natali Romanova",
    email: "email@example.com",
    ava: avaUser,
  },
];

export const POSTS = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    picture: post1,
    title: "Forest in the west region of the Ukraine. Summe 2023",
    localisation: "Mount Dragobrat, village Dragobrat, West Region, Ukraine.",
    comments: "3",
    comments_text: [
      {
        id: "01",
        date: "2023-05-23T00:15:40.656Z",
        user_id: "02-S-F",
        user_ava: avaComment,
        user_text:
          "Really love your most recent photo. Ive been trying to capture the same thing for a few months and would love some tips!",
      },
      {
        id: "02",
        date: "2023-05-23T00:16:20.656Z",
        user_id: "01-N-R",
        user_ava: avaUser,
        user_text:
          "A fast 50mm like f1.8 would help with the bokeh. Ive been using primes as they tend to get a bit sharper images.",
      },
      {
        id: "03",
        date: "2023-05-24T00:10:12.656Z",
        user_id: "02-S-F",
        user_ava: avaComment,
        user_text: "Thank you! That was very helpful!",
      },
      {
         id: "04",
         date: "2023-05-23T00:15:40.656Z",
         user_id: "02-S-F",
         user_ava: avaComment,
         user_text:
           "Really love your most recent photo. Ive been trying to capture the same thing for a few months and would love some tips!",
       },
       {
         id: "05",
         date: "2023-05-23T00:16:20.656Z",
         user_id: "01-N-R",
         user_ava: avaUser,
         user_text:
           "A fast 50mm like f1.8 would help with the bokeh. Ive been using primes as they tend to get a bit sharper images.",
       },
       {
         id: "06",
         date: "2023-05-24T00:10:12.656Z",
         user_id: "02-S-F",
         user_ava: avaComment,
         user_text: "Thank you! That was very helpful!",
       },
    ],
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    picture: post2,
    title: "Forest. Summe 2023",
    localisation: "Mount Dragobrat, Ukraine",
    comments: "3",
    comments_text: [
      {
        id: "01",
        date: "2023-05-23T00:15:40.656Z",
        user_id: "02-S-F",
        user_ava: avaComment,
        user_text:
          "Really love your most recent photo. Ive been trying to capture the same thing for a few months and would love some tips!",
      },
      {
        id: "02",
        date: "2023-05-23T00:16:20.656Z",
        user_id: "01-N-R",
        user_ava: avaUser,
        user_text:
          "A fast 50mm like f1.8 would help with the bokeh. Ive been using primes as they tend to get a bit sharper images.",
      },
      {
        id: "03",
        date: "2023-05-24T00:10:12.656Z",
        user_id: "02-S-F",
        user_ava: avaComment,
        user_text: "Thank you! That was very helpful!",
      },
    ],
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    picture: post3,
    title: "Forest in the west region of the Ukraine. Summe 2023",
    localisation: "Mount Dragobrat, village Dragobrat, West Region, Ukraine.",
    comments: "3",
    comments_text: [
      {
        id: "01",
        date: "2023-05-23T00:15:40.656Z",
        user_id: "02-S-F",
        user_ava: avaComment,
        user_text:
          "Really love your most recent photo. Ive been trying to capture the same thing for a few months and would love some tips!",
      },
      {
        id: "02",
        date: "2023-05-23T00:16:20.656Z",
        user_id: "01-N-R",
        user_ava: avaUser,
        user_text:
          "A fast 50mm like f1.8 would help with the bokeh. Ive been using primes as they tend to get a bit sharper images.",
      },
      {
        id: "03",
        date: "2023-05-24T00:10:12.656Z",
        user_id: "02-S-F",
        user_ava: avaComment,
        user_text: "Thank you! That was very helpful!",
      },
    ],
  },
];
