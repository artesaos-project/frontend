export default function chunkArray<T>(arr: T[], size: number): T[][] {
  return arr.reduce(
    (acc: T[][], _: T, i: number) =>
      i % size ? acc : [...acc, arr.slice(i, i + size)],
    [],
  );
}
