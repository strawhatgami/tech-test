import React from "react";
import { useAppContext, selectPlayerLabel, ISession, IAppState } from "../../contexts/AppContext";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import "./Stats.css";

interface IBidimentionalStat {
  [k: string]: number;
};

const toReChartsData = (bidimensionalStat: IBidimentionalStat, keyLabel: string, valueLabel: string): any[] =>
  Object.entries(bidimensionalStat).map(([key, value]) => ({
    [keyLabel]: key,
    [valueLabel]: value,
  }));

const CustomBarChart = ({
  label, data, xLabel, yLabel
}: {
  label: string, data: IBidimentionalStat, xLabel: string, yLabel: string
}) => {
  const reChartsData = toReChartsData(data, xLabel, yLabel);
  return (
    <div className="stat">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={reChartsData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xLabel} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey={yLabel} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="label">
        <p>{label}</p>
      </div>
    </div>
  );
}
  
const CustomPieChart = ({
  label, data, yLabel
}: {
  label: string, data: IBidimentionalStat, yLabel: string
}) => {
  const reChartsData = toReChartsData(data, "name", yLabel);

  return (
    <div className="stat">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={500} height={500}>
            <Pie
              dataKey={yLabel}
              isAnimationActive={false}
              data={reChartsData}
              cx="50%"
              cy="53%"
              outerRadius={70}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="label">
        <p>{label}</p>
      </div>
    </div>
  );
}

const countBy = (specimens: Array<any>, groupName: string | number): IBidimentionalStat =>
  specimens.reduce((acc, specimen) => {
    const group = specimen[groupName];
    if (!acc[group]) acc[group] = 0;
    acc[group] += 1;
    return acc;
  }, {});

const groupBy = (
  specimens: Array<any>,
  groupName: string | number,
  valueName: string | number
): IBidimentionalStat =>
  specimens.reduce((acc, specimen) => {
    const group = specimen[groupName];
    const value = specimen[valueName];

    if (!acc[group]) acc[group] = 0;
    acc[group] += value;

    return acc;
  }, {});

const statTotal = (stat: IBidimentionalStat): number =>
  Object.values(stat).reduce((acc, value) => {
    return acc + value;
  }, 0);

const toPlayersLabels = (appState: IAppState, playerStat: IBidimentionalStat): IBidimentionalStat =>
  Object.entries(playerStat).reduce((acc, [playerValue, value]) => {
    const label = selectPlayerLabel(appState, playerValue) || playerValue;
    acc[label] = value;

    return acc;
  }, {});

const groupedMeans = (
  totalNumerators: IBidimentionalStat,
  totalDenominators: IBidimentionalStat
): IBidimentionalStat =>
  Object.entries(totalNumerators).reduce((acc, [key, totalNumerator]) => {
    const totalDenominator = totalDenominators[key];
    if (!totalDenominator) return acc;

    acc[key] = totalNumerator / totalDenominator;
    return acc;
  }, {});

const usersFromSessions = (sessions: Array<ISession>) =>
  sessions.reduce((acc, {username}: ISession) => {
    if (!acc.includes(username)) acc.push(username);
    return acc;
  }, []);

  
function BasicKeyValueTable({
  dict,
  keyLabel = "",
  valueLabel = ""
}: {
  dict: { [s: string]: number | string; },
  keyLabel: string,
  valueLabel: string
}) {
  return (
    <div className="basic-kv-table">
      <table>
        {keyLabel && valueLabel && (
          <thead>
            <tr>
              <th>{keyLabel}</th>
              <th>{valueLabel}</th>
            </tr>
          </thead>
        )}
        <tbody>
          { Object.entries(dict).map(([key, value], i) => (
            <tr key={i}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Stats() {
  const appState = useAppContext();
  const { sessions } = appState;

  const totalListeningTimeByUser = groupBy(sessions, "username", "time");
  const totalSessionsByUser = countBy(sessions, "username");
  const meanSessionTimeByUser = groupedMeans(
    totalListeningTimeByUser,
    totalSessionsByUser,
  );

  const totalListeningTimeByPlayer = groupBy(sessions, "player", "time");
  const totalSessionsByPlayer = countBy(sessions, "player");
  const meanListeningTimeByPlayer = groupedMeans(
    totalListeningTimeByPlayer,
    totalSessionsByPlayer,
  );
  
  const meanListeningTimeByPlayerLabel = toPlayersLabels(appState, meanListeningTimeByPlayer);

  const totalListeningTime = statTotal(totalListeningTimeByPlayer);
  const totalUsers = usersFromSessions(sessions).length;
  const meanListeningTime = sessions.length? totalListeningTime / totalUsers : 0;

  const unidimensionalStats = {
    "Temps total d'écoute": totalListeningTime + " minutes",
    "Nombre d'utilisateurs": totalUsers,
    "Temps moyen d'écoute par utilisateur": meanListeningTime.toFixed(1) + " minutes",
  };

  return (
    <div className="stats">
      <h2>Statistiques</h2>
      <div className="stats-container">
        <BasicKeyValueTable
          keyLabel="Statistique"
          valueLabel="Valeur"
          dict={unidimensionalStats} />
        {sessions.length >= 2 && (<>
          <CustomPieChart
            label="Temps d'écoute par utilisateur"
            data={totalListeningTimeByUser}
            yLabel="Temps d'écoute" />
          <CustomBarChart
            label="Temps d'écoute moyen par session et par utilisateur"
            data={meanSessionTimeByUser}
            xLabel="Utilisateur"
            yLabel="Temps d'écoute moyen (min)" />
          <CustomPieChart
            label="Temps d'écoute par player"
            data={totalListeningTimeByPlayer}
            yLabel="Temps d'écoute" />
          <CustomBarChart
            label="Temps d'écoute moyen par session et par player"
            data={meanListeningTimeByPlayerLabel}
            xLabel="Player"
            yLabel="Temps d'écoute moyen (min)" />
        </>)}
      </div>
    </div>
  );
}
