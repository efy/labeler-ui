import { EntityLabeler } from './EntityLabeler';

export default {
  title: 'CompoBox',
};

const text = 'I want to fly from Boston at 8:38 am and arrive in Denver at 11:10 in the morning.'

const labels = [
  {label: 'City', color: "yellow"},
  {label: 'Organisation', color: "blue"}, 
  {label: 'Time', color: "orange"},
  {label: 'Misc', color: "green"},
]

const annotations = [
  {
    start: 19,
    end: 25,
    tag: 'City'
  },
  {
    start: 29,
    end: 36,
    tag: 'Time'
  }
]

export const Usage = () => <EntityLabeler text={text} labels={labels} annotations={annotations} />;
