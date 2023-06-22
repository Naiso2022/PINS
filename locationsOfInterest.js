export const locationsOfInterest = [
  {
    title: "Rondellen",
    location: {
      latitude: 59.182415,
      longitude: 17.420723,
    },
    description: "Här har det alltid snurrat på.",
    pinColor: "#0213d6",
    pinID: 1,
    locationDone: false,
    icon: "disc",
    pinDoneDescription: "ha besökt rondellen i Nykvarns kommun.",
    logo: require("./assets/Nykvarn.png"),
  },

  {
    title: "Tennisbanorna",
    location: {
      latitude: 59.177946,
      longitude: 17.423755,
    },
    description: "En smash-hit!",
    pinColor: "#fc44ea",
    pinID: 1,
    locationDone: false,
    icon: "tennisball",
    pinDoneDescription: "ha besökt tennisbanorna i Nykvarns kommun.",
    logo: require("./assets/Nykvarn.png"),
  },
  {
    title: "Borgen",
    location: {
      latitude: 59.178601,
      longitude: 17.422308,
    },
    description: "En känsla av hemma!",
    pinColor: "#fc44ea",
    pinID: 1,
    locationDone: false,
    icon: "headset",
    pinDoneDescription: "ha besökt grannen.",
    logo: require("./assets/Nykvarn.png").default,
  },
  {
    title: "Grekiska kolgrillsbaren",
    location: {
      latitude: 59.294887,
      longitude: 18.080433,
    },
    description: "En smak av Grekland!",
    pinColor: "#0213d6",
    pinID: 2,
    locationDone: false,
    icon: "beer",
    pinDoneDescription: "ha besökt Grekiska kolgrillsbaren vid Globen.",
    logo: require("./assets/StockholmsStad2.png"),
  },
  {
    title: "Globen",
    location: {
      latitude: 59.293247,
      longitude: 18.082369,
    },
    description: "Pump it up!",
    pinColor: "#fc44ea",
    pinID: 2,
    locationDone: false,
    icon: "headset",
    pinDoneDescription: "ha besökt världens största sfäriska byggnad.",
    logo: require("./assets/StockholmsStad2.png"),
  },
  {
    title: "Stugan",
    location: {
      latitude: 59.243315,
      longitude: 17.587202,
    },
    description: "Utsikten, poolen och den heliga anden.",
    pinColor: "#fc44ea",
    pinID: 3,
    locationDone: false,
    icon: "wine",
    pinDoneDescription: "ha stormat poolen.",
    logo: require("./assets/sodertalje.jpg"),
  },
];

export const pinsOfInterest = [
  {
    title: "HotBall",
    id: 1,
    pinCheck: false,
  },
  {
    title: "GlobenPizza",
    id: 2,
    pinCheck: false,
  },
];
