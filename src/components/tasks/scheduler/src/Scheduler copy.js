import React, { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { Grid, Paper, Fade, Zoom, Slide } from "@mui/material";
import {
  format,
  getDaysInMonth,
  getDay,
  sub,
  startOfMonth,
  parse,
  add,
  getWeeksInMonth,
  isSameDay,
} from "date-fns";
import { zonedTimeToUtc, toZonedTime } from "date-fns-tz";
import SchedulerToolbar from "./Toolbar.jsx";
import MonthModeView from "./MonthModeView.jsx";
import WeekModeView from "./WeekModeView.jsx";
import DayModeView from "./DayModeView.jsx";
import TimeLineModeView from "./TimeLineModeView.jsx";
import { ar, de, enAU, es, fr, ja, ko, ru, zhCN } from "date-fns/locale";

export default function Scheduler(props) {
  const {
    events,
    locale,
    options,
    alertProps,
    onCellClick,
    legacyStyle,
    onTaskClick,
    toolbarProps,
    onEventsChange,
    onAlertCloseButtonClicked,
  } = props;

  const theme = useTheme();
  const { t } = useTranslation(["common"]);
  const today = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localToday = toZonedTime(today, timeZone);

  const getWeekDays = (translate, startWeekOn) => {
    const days = [
      translate("mon"),
      translate("tue"),
      translate("wed"),
      translate("thu"),
      translate("fri"),
      translate("sat"),
      translate("sun"),
    ];
    return startWeekOn.toUpperCase() === "SUN" ? [days.pop(), ...days] : days;
  };

  const [state, setState] = useState({
    selectedDay: localToday,
    mode: options?.defaultMode || "month",
    daysInMonth: getDaysInMonth(localToday),
    selectedDate: format(localToday, "MMMM-yyyy"),
    weekDays: getWeekDays(t, options?.startWeekOn || "mon"),
  });

  const isDayMode = state.mode.toLowerCase() === "day";
  const isWeekMode = state.mode.toLowerCase() === "week";
  const isMonthMode = state.mode.toLowerCase() === "month";
  const isTimelineMode = state.mode.toLowerCase() === "timeline";
  const TransitionMode =
    options?.transitionMode === "zoom"
      ? Zoom
      : options?.transitionMode === "fade"
      ? Fade
      : Slide;

  const getDateFnsLocale = (locale) => {
    switch (locale) {
      case "fr":
        return fr;
      case "ko":
        return ko;
      case "de":
        return de;
      case "es":
        return es;
      case "ar":
        return ar;
      case "ja":
        return ja;
      case "ru":
        return ru;
      case "zh":
        return zhCN;
      default:
        return enAU;
    }
  };

  let dateFnsLocale = getDateFnsLocale(locale);

  const getMonthHeader = () => {
    return state.weekDays.map((day, i) => ({
      id: `row-day-header-${i + 1}`,
      flex: 1,
      sortable: false,
      editable: false,
      align: "center",
      headerName: day,
      headerAlign: "center",
      field: `rowday${i + 1}`,
      headerClassName: "scheduler-theme--header",
    }));
  };

  const getMonthRows = () => {
    let rows = [],
      daysBefore = [];
    const monthStartDate = startOfMonth(state.selectedDay);
    const monthStartDay = getDay(monthStartDate);
    let dateDay = 1;
    const daysInMonth = state.daysInMonth;

    const addDaysBefore = () => {
      for (let i = 1; i <= monthStartDay; i++) {
        const subDate = sub(monthStartDate, { days: monthStartDay - i });
        daysBefore.push(createDayData(subDate));
      }
    };

    const createDayData = (date) => {
      const day = parseInt(format(date, "dd"));
      const data = events.filter((event) =>
        isSameDay(date, parse(event?.date, "yyyy-MM-dd", new Date()))
      );
      return { id: `day_-${day}`, day, date, data };
    };

    addDaysBefore();

    const addDaysInMonth = (rows, dateDay) => {
      for (let week = 0; week < getWeeksInMonth(state.selectedDay); week++) {
        const weekDays = [];

        for (let day = 0; day < 7; day++) {
          if (dateDay > daysInMonth) break;
          const date = parse(
            `${dateDay}-${state.selectedDate}`,
            "dd-MMMM-yyyy",
            new Date()
          );
          weekDays.push(createDayData(date));
          dateDay++;
        }

        if (weekDays.length > 0) rows.push({ id: week, days: weekDays });
      }
    };

    addDaysInMonth(rows, dateDay);

    const addDaysAfter = () => {
      const lastRow = rows[rows.length - 1];
      const daysToAdd = 7 - lastRow.days.length;
      let lastDate = lastRow.days[lastRow.days.length - 1].date;

      for (let i = 0; i < daysToAdd; i++) {
        lastDate = add(lastDate, { days: 1 });
        lastRow.days.push(createDayData(lastDate));
      }
    };

    addDaysAfter();

    return rows;
  };

  const onDayClick = (day) => {
    if (onCellClick) onCellClick(day);
    setState((prevState) => ({ ...prevState, selectedDay: day.date }));
  };

  const onTaskClickHandler = (task) => {
    if (onTaskClick) onTaskClick(task);
  };

  const changeMonth = (increment) => {
    const newDate = add(state.selectedDay, { months: increment });
    setState({
      ...state,
      selectedDay: newDate,
      daysInMonth: getDaysInMonth(newDate),
      selectedDate: format(newDate, "MMMM-yyyy"),
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SchedulerToolbar
          events={events}
          options={options}
          selectedDate={state.selectedDate}
          toolbarProps={toolbarProps}
          setMode={(mode) => setState((prevState) => ({ ...prevState, mode }))}
          setPrevMonth={() => changeMonth(-1)}
          setNextMonth={() => changeMonth(1)}
          switchMode={state.mode}
        />
      </Grid>
      <Grid item xs={12}>
        <TransitionMode in={true}>
          <Paper>
            {isMonthMode && (
              <MonthModeView
                locale={locale}
                rows={getMonthRows()}
                headers={getMonthHeader()}
                onDayClick={onDayClick}
                onTaskClick={onTaskClickHandler}
              />
            )}
            {isWeekMode && (
              <WeekModeView
                locale={locale}
                selectedDay={state.selectedDay}
                onDayClick={onDayClick}
                onTaskClick={onTaskClickHandler}
              />
            )}
            {isDayMode && (
              <DayModeView
                locale={locale}
                selectedDay={state.selectedDay}
                onDayClick={onDayClick}
                onTaskClick={onTaskClickHandler}
              />
            )}
            {isTimelineMode && (
              <TimeLineModeView
                locale={locale}
                selectedDay={state.selectedDay}
                onTaskClick={onTaskClickHandler}
              />
            )}
          </Paper>
        </TransitionMode>
      </Grid>
    </Grid>
  );
}

Scheduler.propTypes = {
  events: PropTypes.array.isRequired,
  locale: PropTypes.string,
  alertProps: PropTypes.object,
  options: PropTypes.object,
  onCellClick: PropTypes.func,
  legacyStyle: PropTypes.bool,
  onTaskClick: PropTypes.func,
  toolbarProps: PropTypes.object,
  onEventsChange: PropTypes.func,
  onAlertCloseButtonClicked: PropTypes.func,
};

Scheduler.defaultProps = {
  events: [],
  locale: "es",
  options: {
    transitionMode: "slide",
    defaultMode: "month",
    startWeekOn: "mon",
  },
};
