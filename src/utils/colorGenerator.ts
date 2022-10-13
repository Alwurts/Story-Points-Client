const allowedColors = [
  "red",
  "pink",
  "purple",
  "indigo",
  "blue",
  "cyan",
  "green",
  "lime",
  "yellow",
  "orange",
  "brown",
];

interface GetRandomType {
  colorsAllowed?: string[];
  range: string[];
  prefix: string;
}

export const getRandomTailwindColor = ({
  colorsAllowed = allowedColors,
  range,
  prefix,
}: GetRandomType) => {
  const colorToUse =
    colorsAllowed[Math.floor(Math.random() * colorsAllowed.length)];
  const rangeToUse = range[Math.floor(Math.random() * range.length)];
  return `${prefix}-${colorToUse}-${rangeToUse}`;
};
