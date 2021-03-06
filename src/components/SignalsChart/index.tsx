import React, { FC, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  ChartDataset,
  ChartOptions,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import range from 'lodash.range';
import cn from 'classnames';
import merge from 'lodash.merge';

import { Signal } from '~src/types';
import { CHART_X_SIZE, DEFAULT_CHART_OPTIONS } from '~src/constants';

import * as styles from './SignalsChart.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const defaultDataset: Partial<ChartDataset<'line', Signal[]>> = {
  stepped: true,
  fill: true,
};

const chartOptions: ChartOptions<'line'> = {
  plugins: {
    title: {
      text: 'Areas of interest',
    },
  },
  scales: {
    y: {
      max: 2,
      min: 0,
    },
  },
};

type Props = {
  className?: string;
  dataset: ChartDataset<'line', Signal[]>;
};

export const SignalsDataChart: FC<Props> = ({ dataset, className }) => {
  const currentOptions = useMemo(
    () => merge(chartOptions, DEFAULT_CHART_OPTIONS),
    []
  );
  return (
    <div className={cn(styles.container, className)}>
      <Line
        data={{
          labels: range(1, CHART_X_SIZE + 1),
          datasets: [{ ...defaultDataset, ...dataset }],
        }}
        options={currentOptions}
      />
    </div>
  );
};
