let startTime: any, endTime: any;

const start = () => {
  startTime = new Date();
}

const end = () => {
  endTime = new Date();
  return Math.round(endTime - startTime)
}

const wait = async (ms: number) => {
  await new Promise(resolve => setTimeout(resolve, ms));
}

export {
    start,
    end,
    wait
}