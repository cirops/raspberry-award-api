export interface AwardInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface GetAwardIntervalsOutput {
  min: AwardInterval[];
  max: AwardInterval[];
}

export class GetAwardIntervalsUseCase {
  execute(): GetAwardIntervalsOutput {
    // placeholder
    return { min: [], max: [] };
  }
}
