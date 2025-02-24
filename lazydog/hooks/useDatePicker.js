import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export function useDatePicker() {
  const dateRef = useRef(null);

  useEffect(() => {
    if (typeof window == "undefined") return;

    flatpickr(dateRef.current, {
      mode: "range",
      dateFormat: "Y-m-d",
      minDate: "today",
      locale: {
        firstDayOfWeek: 1,
        weekdays: {
          shorthand: ["日", "一", "二", "三", "四", "五", "六"],
          longhand: [
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
          ],
        },
        rangeSeparator: " 至 ",
      },
    });
  }, []);

  return dateRef;
}
