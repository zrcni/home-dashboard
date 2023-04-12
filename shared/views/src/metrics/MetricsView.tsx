import { ResponsiveLine } from "@nivo/line"
import { ConditionMetricRow } from "@shared/types"
import "./MetricsView.global.css"

type Props = {
  insideConditionsMetrics: ConditionMetricRow[]
  dateRange: [Date, Date]
}

export const MetricsView: React.FC<Props> = ({
  insideConditionsMetrics,
  dateRange,
}) => {
  const data = formatData(insideConditionsMetrics)

  return (
    <div id="metrics">
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 80, bottom: 60, left: 50 }}
        xScale={{
          type: "time",
          // format: '%Y-%m-%dT%H:%M:%S.%L%Z',
          min: dateRange[0],
          max: dateRange[1],
          precision: "hour",
        }}
        yScale={{
          type: "linear",
        }}
        // yFormat=" >-.2f"
        // xFormat="time:%Y-%m-%dT%H:%M:%S.%L%Z"
        pointSize={0}
        axisBottom={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 15,
          format: "%H:%M",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        colors={["#f47560", "#e8c1a0"]}
        lineWidth={3}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            itemTextColor: "white",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        theme={{
          background: "var(--bg-color)",
          textColor: "white",
          fontSize: 16,
          legends: { text: { fontWeight: "bold" } },
          axis: {
            ticks: { text: { fontWeight: "bold" } },
            legend: { text: { fontWeight: "bold" } },
          },
        }}
      />
    </div>
  )
}

function formatData(rows: ConditionMetricRow[]) {
  const temperature = {
    id: "°C",
    data: [] as { x: any; y: any }[],
  }
  const humidity = {
    id: "%",
    data: [] as { x: any; y: any }[],
  }
  for (const row of rows) {
    const date = new Date(row.timestamp)

    temperature.data.push({
      y: row.temperature,
      x: date,
    })

    humidity.data.push({
      y: row.humidity,
      x: date,
    })
  }

  return [temperature, humidity]
}
