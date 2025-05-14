export class Movie {
  constructor(
    public readonly id: number,
    public readonly year: number,
    public readonly title: string,
    public readonly studios: string,
    public readonly producers: string,
    public readonly winner: boolean
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromRow(row: any): Movie {
    return new Movie(
      row.id,
      row.year,
      row.title,
      row.studios,
      row.producers,
      row.winner === 1
    );
  }
}
