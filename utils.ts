let startTime: any, endTime: any;

const start = () => {
  startTime = new Date();
}

const end = () => {
  endTime = new Date();
  const timeDiff = endTime - startTime; //in ms
  return Math.round(endTime - startTime)
}

export {
    start,
    end
}