!function () {


  var today = moment();

  var l = "";
  function Calendar(selector, events) {
    l = this;
    this.el = document.querySelector(selector);
    this.events = events;
    this.current = moment().date(1);
    this.draw();
    var current = document.querySelector('.today');
    if (current) {
      var self = this;
      window.setTimeout(function () {
        self.openDay(current);
      }, 500);
    }
  }

  Calendar.prototype.draw = function () {
    //Create Header
    this.drawHeader();

    //Draw Month
    this.drawMonth();
  }

  Calendar.prototype.drawHeader = function () {
    var self = this;
    if (!this.header) {
      //Create the header elements
      this.header = createElement('div', 'header');
      this.header.className = 'header';

      this.title = createElement('h1');

      var right = createElement('div', 'scRight');
      right.addEventListener('click', function () { self.nextMonth(); });

      var left = createElement('div', 'scLeft');
      left.addEventListener('click', function () { self.prevMonth(); });

      //Append the Elements
      this.header.appendChild(this.title);
      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
    }

    this.title.innerHTML = this.current.format('MMM YYYY');
  }

  Calendar.prototype.drawMonth = function () {
    var self = this;

    if (this.month) {
      var month = this.current.month() + 1 ;
      month = month + "";
      if(month.length==1){
        month = "0" + month;
      }
      $.get('/schedule/selectSchedule?month=' + month +'' , function (db_data) {
        l.events = db_data;
        l.events.forEach(function (ev) {
          var ev_date = moment(ev.sc_date);
          ev.sc_date = ev_date;
        });
        l.oldMonth = l.month;
        l.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
        l.oldMonth.addEventListener('webkitAnimationEnd', function () {
          self.oldMonth.parentNode.removeChild(self.oldMonth);
          self.month = createElement('div', 'month');
          self.backFill();
          self.currentMonth();
          self.fowardFill();
          self.el.appendChild(self.month);
          window.setTimeout(function () {
            self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
          }, 16);
        });
      });

    } else {

      this.events.forEach(function (ev) {
        var ev_date = moment(ev.sc_date);
        ev.sc_date = ev_date;
      });

      this.month = createElement('div', 'month');
      this.el.appendChild(this.month);
      this.backFill();
      this.currentMonth();
      this.fowardFill();
      this.month.className = 'month new';
    }
  }

  //달력의 앞부분 빈공간
  Calendar.prototype.backFill = function () {
    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if (!dayOfWeek) { return; }

    clone.subtract('days', dayOfWeek + 1);

    for (var i = dayOfWeek; i > 0; i--) {
      this.drawDay(clone.add('days', 1));
    }
  }
  //달력의 뒷부분 빈공간
  Calendar.prototype.fowardFill = function () {
    var clone = this.current.clone().add('months', 1).subtract('days', 1);
    var dayOfWeek = clone.day();

    if (dayOfWeek === 6) { return; }

    for (var i = dayOfWeek; i < 6; i++) {
      this.drawDay(clone.add('days', 1));
    }
  }

  //현재 해당월에 해당하는 달력그리다.
  Calendar.prototype.currentMonth = function () {
    var clone = this.current.clone();


    while (clone.month() === this.current.month()) {
      this.drawDay(clone);
      clone.add('days', 1);
    }
  }

  // ' 주 ' 단위 달력 그리기
  Calendar.prototype.getWeek = function (day) {
    if (!this.week || day.day() === 0) {
      this.week = createElement('div', 'week');
      this.month.appendChild(this.week);
    }
  }

  // ' 일 ' 단위 달력 그리기
  Calendar.prototype.drawDay = function (day) {
    var self = this;
    this.getWeek(day);


    //Outer Day
    var outer = createElement('div', this.getDayClass(day));

    //이벤트여는창
    outer.addEventListener('click', function () {
      self.openDay(this);
    });

    //Day Name (요일) 
    var name = createElement('div', 'day-name', day.format('ddd'));

    //Day Number (일)
    var number = createElement('div', 'day-number', day.format('DD'));

    //Events (이벤트)
    var events = createElement('div', 'day-events');
    this.drawEvents(day, events);

    outer.appendChild(number);
    outer.appendChild(events);
    this.week.appendChild(outer);

    if (this.week.previousElementSibling == null) {
      $(outer).prepend(name);
    }
  }


  //실제로 이벤트를 적는 함수
  Calendar.prototype.drawEvents = function (day, element) {
    if (day.month() === this.current.month()) {
      var todaysEvents = this.events.reduce(function (memo, ev) {

        if (ev.sc_date.isSame(day, 'day') && ev.sc_date.isSame(day, 'month')) {
          memo.push(ev);
        }
        return memo;
      }, []);

      todaysEvents.forEach(function (ev) {
        //  if(ev.sc_gb == "001") var s_color = "orange";
        s_color = colorMatch(ev.sc_gb);
        var evSpan = createElement('span', s_color);
        element.appendChild(evSpan);
      });
    }
  }

  Calendar.prototype.getDayClass = function (day) {
    classes = ['day'];
    if (day.month() !== this.current.month()) {
      classes.push('other');
    } else if (today.isSame(day, 'day') && today.isSame(day, 'month')) {
      classes.push('today');
    }
    return classes.join(' ');
  }

  Calendar.prototype.openDay = function (el) {
    var details, arrow;
    var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
    var day = this.current.clone().date(dayNumber);

    var currentOpened = document.querySelector('.details');

    //Check to see if there is an open detais box on the current row
    if (currentOpened && currentOpened.parentNode === el.parentNode) {
      details = currentOpened;
      arrow = document.querySelector('.arrow');
    } else {
      //Close the open events on differnt week row
      //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
      if (currentOpened) {

        //currentOpened.removeChild(currentOpened.childNodes[1]);

        currentOpened.addEventListener('webkitAnimationEnd', function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('oanimationend', function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('msAnimationEnd', function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('animationend', function () {
          currentOpened.parentNode.removeChild(currentOpened);
        });


        currentOpened.className = 'details out';
      }

      //Create the Details Container
      details = createElement('div', 'details in');

      //Create the arrow
      var arrow = createElement('div', 'arrow');

      //Create the arrow
      var plusBtn = createElement('div', 'plus');
      var plusIcon = createElement('span', 'icon fa-calendar-plus-o');


      plusIcon.day = day
      plusIcon.onclick = showBigBox;

      //Create the event wrapper
      details.appendChild(arrow);
      details.appendChild(plusBtn);
      el.parentNode.appendChild(details);
      plusBtn.appendChild(plusIcon);
    }

    var todaysEvents = this.events.reduce(function (memo, ev) {
      if (ev.sc_date.isSame(day, 'day') && ev.sc_date.isSame(day, 'month')) {
        memo.push(ev);
      }
      return memo;
    }, []);

    this.renderEvents(todaysEvents, details);

    arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 11 + 'px';
  }

  Calendar.prototype.renderEvents = function (events, ele) {
    //Remove any events in the current details element
    var currentWrapper = ele.querySelector('.events');
    var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

    events.forEach(function (ev) {
      // if(ev.sc_gb == "001") var s_color = "orange";
      s_color = colorMatch(ev.sc_gb);
      var div = createElement('div', 'event');
      var square = createElement('div', 'event-category ' + s_color);
      var span = createElement('span', '', ev.sc_event_name);

      div.appendChild(square);
      div.appendChild(span);
      wrapper.appendChild(div);
    });

    if (!events.length) {
      var div = createElement('div', 'event empty');
      var span = createElement('span', '', 'No Events');

      div.appendChild(span);
      wrapper.appendChild(div);
    }

    if (currentWrapper) {
      currentWrapper.className = 'events out';
      currentWrapper.addEventListener('webkitAnimationEnd', function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('oanimationend', function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('msAnimationEnd', function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('animationend', function () {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
    } else {
      ele.appendChild(wrapper);
    }
  }

  Calendar.prototype.nextMonth = function () {
    this.current.add('months', 1);
    this.next = true;
    this.draw();
  }

  Calendar.prototype.prevMonth = function () {
    this.current.subtract('months', 1);
    this.next = false;
    this.draw();
  }

  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if (className) {
      ele.className = className;
    }
    if (innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }

  // DB의 GB값에 맞게 색상을 정한다.
  function colorMatch(gb) {
    //001,002,003,004
    var idx = gb.substring(2, 3);
    var colorArr = ['yellow', 'green', 'orange', 'blue'];
    return colorArr[(idx - 1) * 1];
  };

  var dateFm = "";
  function showBigBox() {
    dateFm = this.day
    this.parentNode.className = this.parentNode.className + " active";
    console.dir(this.parentNode);
    $('.overBox').addClass('active');
    $('.back').toggleClass("on");
  }

  scInsert = function () {

    //이벤트이름
    var eventRegId = $('#sc_name').val();
    var eventNm = $('#sc_content').val();
    //이벤트날짜
    var eventDate = dateFm.format('YYYY-MM-DD');
    //해당월
    var month = dateFm.format('MM');

    if(eventRegId == "" || eventNm == ""){
      alert("빈칸을 입력하시오.");
    }else{
      $.ajax({
        url: '/schedule/insertSchedule',
        type: 'post',
        dataType: 'json',
        data: { eventNm: eventNm, eventDate: eventDate, eventRegId: eventRegId, eventNm: eventNm, month: month },
        success: function (data1) {
          var data;
          $.get('/schedule/selectSchedule?month=' + month, function (db_data) {
            $('#sc_name').val("");
            $('#sc_content').val("");
            $('.overBox').removeClass("active");
            $('.back').removeClass("on");

            console.log(dateFm)
            data = db_data;
            l.current =   moment(dateFm.format('YYYY-MM-01'));
            l.events = data
            l.draw();
          });
        }
      });
    }
    
  };

  $('.overBox .close').click(function () {
    $('.overBox').removeClass("active");
    $('.back').removeClass("on");
  });

  $('.overBox .cancel').click(function () {
    $('.overBox').removeClass("active");
    $('.back').removeClass("on");
  });

} ();

!function () {
  //맨처음에는 현재 월에 해당하는 데이터만 싹 불러온다.
  var current_month = moment().month();
  var data;
  current_month = current_month + 1;
  if(current_month.toString().length==1){
    current_month = "0"+current_month;
  }
  $.get('/schedule/selectSchedule?month=' + current_month, function (db_data) {
    data = db_data;
    var calendar = new Calendar('#calendar', data);
  });
} ();