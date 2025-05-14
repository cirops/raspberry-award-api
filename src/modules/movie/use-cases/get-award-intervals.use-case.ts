import { parseProducerNames } from '../../../shared/utils/parse-producer-names';
import { MovieRepository } from '../repositories/movie.repository';

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
  constructor(private movieRepository: MovieRepository) {}
  execute(): GetAwardIntervalsOutput {
    const winningMovies = this.movieRepository.findWinningProducers();
    const winners = this.extractProducersFromWinningMovies(winningMovies);
    const groupedWinners = this.groupWinsByProducer(winners);
    const intervals = this.calculateAwardIntervals(groupedWinners);

    return this.findMinAndMaxIntervals(intervals);
  }

  extractProducersFromWinningMovies(
    winningMovies: { producers: string; year: number }[]
  ): { producer: string; year: number }[] {
    const winners: { producer: string; year: number }[] = [];

    for (const { producers: producersString, year } of winningMovies) {
      const producers = parseProducerNames(producersString);
      const producersAndYearsWon = producers.map((producer) => ({
        producer,
        year,
      }));
      winners.push(...producersAndYearsWon);
    }

    return winners;
  }

  private groupWinsByProducer(
    winners: { producer: string; year: number }[]
  ): Map<string, number[]> {
    const map = new Map<string, number[]>();
    for (const { producer, year } of winners) {
      if (!map.has(producer)) {
        map.set(producer, []);
      }
      map.get(producer)!.push(year);
    }
    return map;
  }

  private calculateAwardIntervals(
    grouped: Map<string, number[]>
  ): AwardInterval[] {
    const result: AwardInterval[] = [];

    for (const [producer, years] of grouped) {
      const sortedYears = years.sort((a, b) => a - b);
      for (let i = 1; i < sortedYears.length; i++) {
        result.push({
          producer,
          interval: sortedYears[i] - sortedYears[i - 1],
          previousWin: sortedYears[i - 1],
          followingWin: sortedYears[i],
        });
      }
    }

    return result;
  }

  private findMinAndMaxIntervals(
    intervals: AwardInterval[]
  ): GetAwardIntervalsOutput {
    if (intervals.length === 0) {
      return { min: [], max: [] };
    }

    const min = Math.min(...intervals.map((i) => i.interval));
    const max = Math.max(...intervals.map((i) => i.interval));

    return {
      min: intervals.filter((i) => i.interval === min),
      max: intervals.filter((i) => i.interval === max),
    };
  }
}
