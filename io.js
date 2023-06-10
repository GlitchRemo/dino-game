const { stdin } = process;
const main = () => {
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.on("data", (data) => {
    if (data === " ") {
      stdin.destroy();
      return;
    }
    console.log(data);
  });
};

main();
