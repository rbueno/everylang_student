import PropTypes from 'prop-types';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, Box, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 270;

const LEGEND_HEIGHT = 360;

const StyledChart = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT,
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: CHART_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    // borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

AnalyticsCurrentVisits.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function AnalyticsCurrentVisits({ title, subheader, chart, ...other }) {
  const theme = useTheme();

  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    labels: series.map((i) => i.label),
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      floating: true,
      horizontalAlign: 'center',
    },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <StyledChart dir="ltr">
        <Chart type="pie" series={chartSeries} options={chartOptions} height={220} />
      </StyledChart>
      {/* <Box  display='flex' justifyContent='center' marginBottom={2}>
                  <Box display='flex' alignItems='center' marginRight={3}>
                      <Box display='flex' alignItems='center' marginRight={1} sx={{ borderRadius: '50px', backgroundColor: theme.palette.info.main, color: theme.palette.info.main, width: '10px', height: '10px'}}>.</Box>
                      <Typography>Gramática</Typography>
                  </Box>
                  <Box display='flex' alignItems='center'>
                      <Box display='flex' alignItems='center' marginRight={1} sx={{ borderRadius: '50px', backgroundColor: theme.palette.primary.main, color: theme.palette.primary.main, width: '10px', height: '10px'}}>.</Box>
                      <Typography>Pronúncia</Typography>
                  </Box>
        </Box> */}
    </Card>
  );
}
