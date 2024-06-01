// import PropTypes from 'prop-types';
// // @mui
// import { alpha } from '@mui/material/styles';
// import { Box, Card, Typography, Stack } from '@mui/material';
// // utils
// import { fNumber, fPercent } from '../../../../utils/formatNumber';
// // components
// import Iconify from '../../../../components/iconify';
// import Chart from '../../../../components/chart';

// // ----------------------------------------------------------------------

// AppWidgetSummary.propTypes = {
//   sx: PropTypes.object,
//   chart: PropTypes.object,
//   title: PropTypes.string,
//   total: PropTypes.number,
//   percent: PropTypes.number,
// };

// export default function AppWidgetSummary({ title, percent, total, chart, sx, ...other }) {
//   const { colors, series, options } = chart;

//   const chartOptions = {
//     colors,
//     chart: {
//       sparkline: {
//         enabled: true,
//       },
//     },
//     plotOptions: {
//       bar: {
//         columnWidth: '68%',
//         borderRadius: 2,
//       },
//     },
//     tooltip: {
//       x: { show: false },
//       y: {
//         formatter: (value) => fNumber(value),
//         title: {
//           formatter: () => '',
//         },
//       },
//       marker: { show: false },
//     },
//     ...options,
//   };

//   return (
//     <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
//       <Box sx={{ flexGrow: 1 }}>
//         <Typography variant="subtitle2">{title}</Typography>

//         <TrendingInfo percent={percent} />

//         <Typography variant="h3">{fNumber(total)}</Typography>
//       </Box>

//       <Chart type="bar" series={[{ data: series }]} options={chartOptions} width={60} height={36} />
//     </Card>
//   );
// }

// // ----------------------------------------------------------------------

// TrendingInfo.propTypes = {
//   percent: PropTypes.number,
// };

// function TrendingInfo({ percent }) {
//   return (
//     <Stack direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
//       <Iconify
//         icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
//         sx={{
//           mr: 1,
//           p: 0.5,
//           width: 24,
//           height: 24,
//           borderRadius: '50%',
//           color: 'success.main',
//           bgcolor: (theme) => alpha(theme.palette.success.main, 0.16),
//           ...(percent < 0 && {
//             color: 'error.main',
//             bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
//           }),
//         }}
//       />

//       <Typography component="div" variant="subtitle2">
//         {percent > 0 && '+'}

//         {fPercent(percent)}
//       </Typography>
//     </Stack>
//   );
// }

import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import ReactApexChart from '../../../../components/chart';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  chartColor: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.number).isRequired,
  percent: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, percent, total, chartColor, chartData, sx, ...other }) {
  const theme = useTheme();

  const chartOptions = {
    colors: [chartColor],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `@${seriesName}`,
        },
      },
      marker: { show: false },
    },
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

{
  percent && <>
  <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <Iconify width={16} height={16} icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />
          </IconWrapperStyle>
          <Typography component="span" variant="subtitle2">
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Typography>
        </Stack>
  </>
}
        

        <Typography variant="h3">{fNumber(total)}</Typography>
      </Box>

      <ReactApexChart type="bar" series={[{ data: chartData }]} options={chartOptions} width={60} height={36} />
    </Card>
  );
}
