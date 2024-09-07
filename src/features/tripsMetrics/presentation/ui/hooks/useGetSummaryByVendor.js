/**
 * @param {HourlyTripSummary[]} summary
 * @return {HourlyTripSummary[][]}
 * */
export default function useGetSummaryByVendor(summary) {
  return Object.values(summary.reduce((acc, item) => {
    const vendor = item.vendor
    if (!acc[vendor]) {
      acc[vendor] = []
    }
    acc[vendor].push(item)
    return acc
  }, {}),
  )
}
