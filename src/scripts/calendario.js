import "../styles/styles.css";
import "./globals.js";
import "../styles/calendario.css";
import { aboutCtaButtonHandling } from "./utils.js";

aboutCtaButtonHandling();

/*
  const calendarWrapper = document.querySelector(".calendar-embed-wrapper");
  const calendarEmbed = document.querySelector(".google-calendar-embed");

  calendarEmbed.addEventListener("error", () => {
    log("Error loading calendar");
  });

  // Utilities for potential use. Handling loading looks goofy with a fade in, and handling errors was not feasible, at least when I tried giving a wrong IP
  const calendarUtils = {
    reloadCalendar: () => {
      const calendarEmbed = document.querySelector(".google-calendar-embed");
      if (calendarEmbed) {
        const currentSrc = calendarEmbed.src;
        calendarEmbed.src = "";
        setTimeout(() => {
          calendarEmbed.src = currentSrc;
        }, 100);
      }
    },

    updateCalendarId: (newCalendarId) => {
      const calendarEmbed = document.querySelector(".google-calendar-embed");
      if (calendarEmbed && newCalendarId) {
        calendarEmbed.src = `wüt${newCalendarId}wüt`;
      }
    },
  };
*/
