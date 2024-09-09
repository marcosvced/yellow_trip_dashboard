import {describe, vi, test, expect} from "vitest";
import {GetTripsMetricsUseCase} from "../../../../../../src/features/tripsMetrics/domain/useCases/GetTripsMetricsUseCase.js";
import {HourlyTripSummary} from "../../../../../../src/core/hourlyTripSummary/domain/entities/HourlyTripSummary.js";
import {HourlyTripSummaryDtoFactory} from "../../../../common/fatories/HourlyTripSummaryDtoFactory.js";
import {faker} from "@faker-js/faker";
import useToIsoDate from "../../../../common/utils/useToIsoDate.js";

describe('GetTripsMetricsUseCase - execute utilizes repository and transforms data to HourlyTripSummary objects', () => {

    test('should return HourlyTripSummary array when valid date is provided', async () => {

        const trip_date = faker.date.between({from: '2017-01-01', to: '2017-01-31'})
        const mockData = HourlyTripSummaryDtoFactory.new().times(Math.floor(Math.random() * 100) + 1, {trip_date})

        /** @type {TripsMetricsRepository} */
        const mockRepository = {
            getHourlyData: vi.fn().mockResolvedValue(mockData),
        };

        const useCase = new GetTripsMetricsUseCase(mockRepository);
        const result = await useCase.execute(trip_date);

        expect(result).toHaveLength(mockData.length);
        result.forEach((r, index) => {
            expect(r).toBeInstanceOf(HourlyTripSummary);
            expect(r.vendor).toBe(mockData[index].vendorid);
            expect(r.pickupDate.toISODate()).toBe(useToIsoDate(trip_date))
        })

    });
})

