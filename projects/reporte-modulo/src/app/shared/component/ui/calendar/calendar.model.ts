export class CalendarItem {
  value?: string;

  constructor(item?: any) {
    if (item.value) {
      this.value = item.value;
    }
  }
}

export type EventCalendarDropdown = {
  value: string;
};

export type CalendarItemAarray = Array<CalendarItem>;
