function getRandomInteger(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

function getNewId(max) {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    if (lastGeneratedId > max) {
      return null;
    }
    return lastGeneratedId;
  };
}

function createArray(arrayLength, inputFunction) {
  const newArray = [];
  while (newArray.length < arrayLength) {
    newArray.push(inputFunction());
  }
  return newArray;
}

const names = [
  'Fuyuki Tenge',
  'Jill',
  'Shiren',
  'Aimer',
  'Sakuzyo',
  'Kamada Shuhei',
  'Yui',
  'Miyashita Yuu',
  'Annabel',
  'Yanagi Nagi',
  'Kihow',
  'nayuta',
  'Kajiura Yuki',
  'Shikata Akiko',
  'Okabe Keiichi',
  'Sawano Hiroyuki',
  'Meguro Shoji',
  'Sennzai',
  'Hirose Akane',
  'Atsumi Saiki',
  'Tono Kanami',
  'Yonekura Chihiro',
  'Imai Asami',
  'Koeda',
  'Aoi Eir',
  'Kirin',
  'Hazuki',
  'Kobayashi Mika',
  'Ishiwatari Daisuke',
  'Rita',
  'Minami',
  'Kiyoura Natsumi'
];

const commentMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const generatePhotoId = getNewId();
const generateUrl = getNewId();
const generateCommentId = getNewId();

const createMessage = (linesAmount) => {
  let newMessage = '';
  const previousLines = [];
  if (linesAmount === 1) {
    newMessage += commentMessages[getRandomInteger(0, commentMessages.length - 1)];
  } else {
    for (let i = 1; i <= linesAmount; i++) {
      let newLine = commentMessages[getRandomInteger(0, commentMessages.length - 1)];
      if (previousLines.length >= commentMessages.length - 1) {
        return null;
      }
      while (previousLines.includes(newLine)) {
        newLine = commentMessages[getRandomInteger(0, commentMessages.length - 1)];
      }
      previousLines.push(newLine);
      newMessage += newLine;
      if (i !== linesAmount) {
        newMessage += ' ';
      }
    }
  }
  return newMessage;
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(getRandomInteger(1, 2)),
  name: names[getRandomInteger(0, names.length - 1)],
});

const createUserPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrl()}.jpg`,
  likes: getRandomInteger(15, 200),
  description: 'description placeholder',
  comments: createArray(getRandomInteger(0, 30), createComment),
});

createArray(25, createUserPhoto);
