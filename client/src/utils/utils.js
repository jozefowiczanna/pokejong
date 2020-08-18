export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const sortArray = (arr, property, order = "asc") => {
  const newArr = arr.slice();
  if (order === "asc") {
    newArr.sort((a, b) => (a[property] > b[property] ? 1 : -1));
  }
  if (order === "desc") {
    newArr.sort((a, b) => (a[property] > b[property] ? -1 : 1));
  }
  return newArr;
};

export const formatTime = (seconds) => {
  let min = 0;
  let sec = 0;
  if (seconds > 59) {
    min = Math.floor(seconds / 60);
    sec = seconds % 60;
  } else {
    sec = seconds;
  }
  sec = sec > 9 ? sec : "0" + sec;
  return `${min}:${sec}`;
};
