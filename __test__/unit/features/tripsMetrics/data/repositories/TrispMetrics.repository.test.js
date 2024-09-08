
import {  describe, expect, test, vi, } from 'vitest'
import {apiClient} from "../../../../../../src/core/common/data/models/ApiClient.js";
import {
    TripsMetricsRepository
} from "../../../../../../src/features/tripsMetrics/data/repositories/TripsMetrics.repository.js";
import {HourlyTripSummaryDto} from "../../../../../../src/core/hourlyTripSummary/data/dto/HourlyTripSummary.dto.js";
import {faker} from "@faker-js/faker";
import useToIsoDate from "../../../../common/utils/useToIsoDate.js";
import {HourlyTripSummaryDtoFactory} from "../../../../common/fatories/HourlyTripSummaryDtoFactory.js";

describe('TripsMetricsRepository - fetches and maps trip data', () => {

    test('should return an empty array when no trip data is available for the given day', async () => {
        vi.spyOn(apiClient, 'get').mockResolvedValue({ data: [] });

        const repository = new TripsMetricsRepository();
        const trip_date = HourlyTripSummaryDtoFactory.new().create().trip_date
        const result = await repository.getHourlyData(trip_date)

        expect(result).toHaveLength(0);
    });


    test('should return an array of HourlyTripSummaryDto objects when a valid date is provided', async () => {
        const trip_date = faker.date.between({from: '2017-01-01', to: '2017-01-31'})
        const mockResultLength = 3
        const mockData = HourlyTripSummaryDtoFactory.new().times(mockResultLength, {trip_date})

        vi.spyOn(apiClient, 'get').mockResolvedValue({ data: mockData });

        const repository = new TripsMetricsRepository();
        const result = await repository.getHourlyData(useToIsoDate(trip_date));

        expect(result).toHaveLength(mockResultLength);
        result.forEach((r, index) => {
            expect(r).toBeInstanceOf(HourlyTripSummaryDto);
            expect(r.vendorid).toBe(mockData[index].vendorid);
        })
    });
})
