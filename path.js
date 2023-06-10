const getRandomTill = (n) => Math.floor(Math.random() * n);

const createBackground = (length) => {
  const upperSky = new Array(length).fill(" ");
  const middleSky = new Array(length).fill(" ");
  const lowerSky = new Array(length).fill(" ");
  const road = new Array(length).fill("_");
  const pebble = new Array(length).fill().map((_, i) => {
    if (i % 2 === 0) return " ";
    return "-";
  });

  const background = { upperSky, middleSky, lowerSky, road, pebble };
  return background;
};

const gameLoop = (
  { upperSky, middleSky, lowerSky, road, pebble },
  dinoPosition
) => {
  console.clear();
  showDino(dinoPosition, road, upperSky, middleSky, lowerSky);
  console.log(
    [upperSky, middleSky, lowerSky, road, pebble]
      .map((e) => e.join(""))
      .join("\n")
  );
  road[0] = "_";

  const firstPixelOfUpper = road.shift();
  road.push(firstPixelOfUpper);

  const firstPixelOfLower = pebble.shift();
  pebble.push(firstPixelOfLower);

  if (dinoPosition.y === 0) {
    return;
  }

  --dinoPosition.y;
};

const plantTree = (road) => {
  setInterval(() => {
    road.shift();
    road.shift();
    road.push("🌴");
  }, 1000);
};

const showDino = (dinoPosition, road, upperSky, middleSky, lowerSky) => {
  if (dinoPosition.y === 3) {
    upperSky[0] = "🦖";
    road[0] = "_";
    return;
  }

  if (dinoPosition.y === 2) {
    upperSky[0] = " ";
    middleSky[0] = "🦖";
    road[0] = "_";
    return;
  }

  if (dinoPosition.y === 1) {
    middleSky[0] = " ";
    lowerSky[0] = "🦖";
    road[0] = "_";
    return;
  }

  road[0] = "🦖";
  lowerSky[0] = " ";
};

const main = (length) => {
  const { stdin } = process;

  const { road, upperSky, middleSky, lowerSky, pebble } =
    createBackground(length);
  plantTree(road);

  const dinoPosition = { y: 0 };

  const gameInterval = setInterval(() => {
    if (road[0] === "🌴" && dinoPosition.y === 0) {
      console.log("GAME OVER");
      clearInterval(gameInterval);
      process.exit();
      return;
    }

    gameLoop({ upperSky, middleSky, lowerSky, road, pebble }, dinoPosition);
  }, 100);

  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.on("data", (data) => {
    if (data === " ") {
      dinoPosition.y = 3;
    }
  });
};

const length = process.stdout.columns;
main(length - 5);
