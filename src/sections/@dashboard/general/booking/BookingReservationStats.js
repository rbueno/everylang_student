import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { CustomSmallSelect } from '../../../../components/custom-input';
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

BookingReservationStats.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function BookingReservationStats({ title, subheader, chart, ...other }) {
  const { categories, colors, series, options } = chart;

  const [seriesData, setSeriesData] = useState('Cliques');

  const chartOptions = useChart({
    colors,
    redrawOnWindowResize: true,
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories,
    },
    tooltip: {
      y: {
        formatter: (value) => `$${value}`,
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      {/* <CardHeader
        title={title}
        subheader={subheader}
        action={
          <CustomSmallSelect
            value={seriesData}
            onChange={(event) => setSeriesData(event.target.value)}
          >
            {series.map((option) => (
              <option key={option.type} value={option.type}>
                {option.type}
              </option>
            ))}
          </CustomSmallSelect>
        }
      /> */}

      {/* {series.map((item) => (
        <Box key={item.type} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.type === seriesData && (
            <Chart type="bar" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))} */}
      <Chart  type="bar" series={series[0].data} options={chartOptions} height={364} />
    </Card>
  );
}