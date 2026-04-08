import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useAppSelector} from '../hooks/storeHooks';

function MetricCard({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

export default function InsightsScreen(): React.JSX.Element {
  const {items, query, hasMore, appState, lastUpdated} = useAppSelector(
    state => state.products,
  );

  const lastUpdatedText = useMemo(() => {
    if (!lastUpdated) {
      return 'Not yet';
    }
    return new Date(lastUpdated).toLocaleString();
  }, [lastUpdated]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Session Snapshot</Text>
      <Text style={styles.subHeading}>
        This screen reflects Redux state restored from local storage.
      </Text>

      <MetricCard label="Cached products" value={String(items.length)} />
      <MetricCard label="Current search" value={query || 'None'} />
      <MetricCard label="Has more pages" value={hasMore ? 'Yes' : 'No'} />
      <MetricCard label="App lifecycle" value={appState} />
      <MetricCard label="Last sync" value={lastUpdatedText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FC',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  subHeading: {
    marginTop: 6,
    marginBottom: 16,
    color: '#64748B',
    fontSize: 13,
    lineHeight: 18,
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#DCE4F2',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  metricLabel: {
    color: '#64748B',
    fontSize: 12,
  },
  metricValue: {
    marginTop: 4,
    color: '#101828',
    fontSize: 16,
    fontWeight: '700',
  },
});
