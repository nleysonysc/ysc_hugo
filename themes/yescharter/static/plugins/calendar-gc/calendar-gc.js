var gcObject = {
  options: (options = {
    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayBegin: 1,
    monthNames: [],
    onPrevMonth: function (e) {},
    onNextMonth: function (e) {},
    events: [{ date: null, eventName: null, className: null, onclick: function (ev, data) {}, dateColor: "#38385c" }],
    onclickDate: function (ev, data) {},
    onclickEvent: function (ev, data) {},
    nextIcon: "&gt;",
    prevIcon: "&lt;",
    breakpoint: "md"
  }),
  el: "",
  eventAnimate: "none",
  pickedDate: new Date(),
  setDate(date) {
    const newDate = new Date(date);
    if (newDate == this.pickedDate) {
      return;
    } else if (newDate > this.pickedDate) {
      this.eventAnimate = "next";
    } else {
      this.eventAnimate = "prev";
    }
    this.pickedDate = newDate;
    this.render();
  },
  setEvents(events) {
    this.options.events = events;
    this.render();
  },
  prevMonth() {
    this.pickedDate = new Date(this.pickedDate.getFullYear(), this.pickedDate.getMonth() - 2, 1);
    this.options.onPrevMonth(this.pickedDate);
    this.eventAnimate = "prev";
    this.render();
  },
  nextMonth() {
    this.pickedDate = new Date(this.pickedDate.getFullYear(), this.pickedDate.getMonth(), 1);
    this.options.onNextMonth(this.pickedDate);
    this.eventAnimate = "next";
    this.render();
  },
  render() {
    const elem = $(this.el);
    elem.html("");
    const gcCalendar = $(`<div class="gc-calendar"></div>`);
    elem.append(gcCalendar);
    const head = $(`<div class="gc-calendar-header"></div>`);
    head.appendTo(gcCalendar);
    const montYear = $(`<span class="gc-calendar-month-year"></span>`);
    montYear.appendTo(head);
    const pickedMonth = $(`<span class='month'>${this.options.monthNames[this.pickedDate.getMonth()]}</span>`);
    pickedMonth.appendTo(montYear);
    const pickedYear = $(`<span class='year'> ${this.pickedDate.getFullYear()}</span>`);
    pickedYear.appendTo(montYear);
    const prev = $(`<button type="button" class='prev'>${this.options.prevIcon}</button>`);
    prev.appendTo(head);
    prev.on("click", function (e) {
      gcObject.prevMonth();
    });
    const next = $(`<button type="button" class='next'>${this.options.nextIcon}</button>`);
    next.appendTo(head);
    next.on("click", function (e) {
      gcObject.nextMonth();
    });

    const calendar = $('<div class="calendar container-fluid"></div>');
    calendar.removeClass("slide-in-left slide-in-right slide-out-left slide-out-right");
    /// ANIMATION
    if (this.eventAnimate == "none") {
      calendar.hide().addClass("slide-in-left").show();
    } else if (this.eventAnimate == "prev") {
      calendar
        .hide()
        .addClass("slide-out-right")
        .show()
        .delay(200)
        .hide()
        .removeClass("slide-out-right")
        .addClass("slide-in-left")
        .show();
    } else {
      calendar
        .hide()
        .addClass("slide-out-left")
        .show()
        .delay(200)
        .hide()
        .removeClass("slide-out-left")
        .addClass("slide-in-right")
        .show();
    }
    calendar.appendTo(gcCalendar);
    const header = $(`<header class="row d-none d${gcObject.options.breakpoint ? "-"+gcObject.options.breakpoint:""}-flex p-1 bg-dark text-white calendar-header"></header>`);
    header.appendTo(calendar);
    const dayLength = this.options.dayNames.length;
    for (let i = 0; i < dayLength; i++) {
      var index = i + gcObject.options.dayBegin;
      if (index >= dayLength) {
        index = index - dayLength;
      }
      const element = gcObject.options.dayNames[index];
      const headerCell = $(`<div class="dayname col p-1 text-center">` + element + "</th>");
      headerCell.appendTo(header);
    }
    var body = $(`<div class="row border border-right-0 border-bottom-0"></div>`);
    body.appendTo(calendar);
    const pickedDate = new Date(this.pickedDate);
    const calendarData = this.getCalendarArray();
    const stackDate = new Date();
    calendarData.forEach(function (e) {
      e.forEach(function (e) {
        var cell = $(`<div class="day col${gcObject.options.breakpoint ? "-"+gcObject.options.breakpoint:""} p-2 border border-left-0 border-top-0 text-truncate"></div>`);
        var btnCell = $(`<a type="button" class="btn-gc-cell"></a>`);
        cell.append(btnCell);
        btnCell.click(function (ev) {
          gcObject.options.onclickDate(ev, e);
        });
        var day = $(`<span class="day-number">${e.date}</span>`);
        cell.addClass(e.class);
        day.appendTo(btnCell);
        let dayHeaderMin = $(`<sup class="mx-1 d${gcObject.options.breakpoint ? "-"+gcObject.options.breakpoint:""}-none">${gcObject.options.dayNames[e.datejs.getDay()]}</sup>`)
        dayHeaderMin.appendTo(day);
        if (
          stackDate.getFullYear() == e.datejs.getFullYear() &&
          stackDate.getMonth() == e.datejs.getMonth() &&
          stackDate.getDate() == e.datejs.getDate()
          ) {
            btnCell.addClass("today");
          }
          
          if (
            // days not in the current month
            pickedDate.getMonth() != e.datejs.getMonth()
          ) {
            cell.addClass(`text-muted bg-light d-none d${gcObject.options.breakpoint ? "-"+gcObject.options.breakpoint:""}-inline-block`);
          } 
          
          var dayStyle = "";
          gcObject.options.events.forEach(function (evt) {
            let evtDate = new Date(evt.date+", 12:00");
            if (
              evtDate.getFullYear() == e.datejs.getFullYear() &&
              evtDate.getMonth() == e.datejs.getMonth() &&
              evtDate.getDate() == e.datejs.getDate()
              ) {
                console.log(evt)
                console.log(evtDate.getDate())
                console.log(e.datejs.getDate())
                cell.addClass("event");
                var event = $(`<a tabindex="0" class="text-left gc-event ${evt.className} text-wrap">${evt.eventName}</a>`);
                dayStyle = "color:" + (evt.dateColor || "inherit");
                event.on("click", function (e) {
                  gcObject.options.onclickEvent(e, evt);
                });
            cell.append(event);
          }
        });
        day.attr("style", dayStyle);
        cell.appendTo(body);
      });
      let separator = $(`<div class="w-100"></div>`)
      separator.appendTo(body);
    });
  },
  getCalendarArray() {
    const dayLength = 7;
    var firstDay = new Date(this.pickedDate.getFullYear(), this.pickedDate.getMonth(), 1).getDay();
    var lastDay = new Date(this.pickedDate.getFullYear(), this.pickedDate.getMonth() + 1, 0).getDate();
    var prevMonthLastDay = new Date(this.pickedDate.getFullYear(), this.pickedDate.getMonth(), 0).getDate();
    var firstWeek = [];
    var stop = firstDay - gcObject.options.dayBegin;
    if (stop < 0) {
      stop = dayLength + stop;
    }
    for (let i = 0; i < stop; i++) {
      firstWeek.push({
        datejs: new Date(this.pickedDate.getFullYear(), this.pickedDate.getMonth() - 1, prevMonthLastDay),
        date: prevMonthLastDay,
        class: "prev-month",
      });
      prevMonthLastDay--;
    }
    firstWeek.reverse();
    var cDate = 1;
    for (let i = firstWeek.length; i < dayLength; i++) {
      firstWeek.push({
        datejs: new Date(this.pickedDate.getFullYear(), this.pickedDate.getMonth(), cDate),
        date: cDate,
        class: "current-month",
      });
      cDate++;
    }
    var cMonth = [firstWeek];
    var cdateStop = false;
    var datejs = this.pickedDate;
    var className = "current-month";
    for (let i = 1; i < 6; i++) {
      var week = [];
      for (let j = 0; j < dayLength; j++) {
        week.push({
          datejs: new Date(datejs.getFullYear(), datejs.getMonth(), cDate),
          date: cDate,
          class: className,
        });
        cDate++;
        if (cDate > lastDay) {
          cDate = 1;
          datejs.setDate(1);
          datejs.setMonth(datejs.getMonth() + 1);
          cdateStop = true;
          className = "next-month";
        }
      }
      cMonth.push(week);
      if (cdateStop) {
        break;
      }
    }
    return cMonth;
  },
};
(function ($) {
  $.fn.calendarGC = function (
    options = {
      dayNames,
      dayBegin,
      monthNames,
      onPrevMonth,
      onNextMonth,
      events,
      onclickEvent,
      onclickDate,
      nextIcon: "&gt;",
      prevIcon: "&lt;",
      breakpoint: "md"
    }
  ) {
    gcObject.options.dayNames = options.dayNames || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    gcObject.options.dayBegin =
      typeof options.dayBegin === "undefined" || options.dayBegin === null ? 1 : options.dayBegin;
    gcObject.options.monthNames = options.monthNames || [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    gcObject.options.onPrevMonth = options.onPrevMonth || function (e) {};
    gcObject.options.onNextMonth = options.onNextMonth || function (e) {};
    gcObject.options.events = options.events || [];
    gcObject.options.onclickDate = options.onclickDate || function (e, data) {};
    gcObject.options.onclickEvent = options.onclickEvent || function (e, data) {};
    gcObject.options.nextIcon = options.nextIcon || "&gt;";
    gcObject.options.prevIcon = options.prevIcon || "&lt;";
    gcObject.options.breakpoint = options.breakpoint || "md";

    gcObject.el = this;
    gcObject.render();
    return gcObject;
  };
})(jQuery);
