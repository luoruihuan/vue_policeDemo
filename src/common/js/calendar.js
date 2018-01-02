export function getLastDay(year, month) {
  var new_year = year //取当前的年份
  month++ //取下一个月的第一天，方便计算（最后一天不固定）
  if (month > 12) {
    new_month = 1 //月份减
    new_year++ //年份增
  }
  var new_date = new Date(new_year, month, 1) //取当年下月中的第一天
  return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)) //获取当月最后一天日期
}

export function getMonthDays(year, month, vm) {
  vm.daysArr = []
  let lastDay = getLastDay(year, month).getDate() //当月的最后一天
  let lastMothLastDay = getLastDay(year, month - 1).getDate() // 获取上一月的最后一天
  for (let i = 1; i < lastDay + 1; i++) {
    let day = new Date(year, month, i).getDay() // 星期数
    let date_i = new Date(year, month, i).getDate() // 日数
    let date_item = {
      day: day,
      date_i: date_i,
      month: month,
      year: year,
      time: (new Date(year, month, date_i)).getTime()
    }
    if (i == 1) {
      if (day > 1) { // 2,3,4,5,6
        for (let i = 0; i < day - 1; i++) { // 31   26 27 28 29 30 31  0 day = 0
          vm.daysArr.push({
            day: '',
            date_i: lastMothLastDay - day + 2 + i,
            month: month,
            year: year,
            time: (new Date(year, month - 1, (lastMothLastDay - day + 2 + i))).getTime()
          })
        }
      } else if (day == 0) { // 0
        for (let i = 0; i < 6; i++) {
          vm.daysArr.push({
            day: '',
            date_i: lastMothLastDay - 5 + i,
            month: month,
            year: year,
            time: (new Date(year, month - 1, (lastMothLastDay - 5 + i))).getTime()
          })
        }
      }
    }
    vm.daysArr.push(date_item)
    if (i == (lastDay)) {
      if (0 < day <= 6) { //1,2,3,4,5,6
        for (let i = 0; i < 7 - day; i++) {
          vm.daysArr.push({
            day: '',
            date_i: i + 1,
            month: month,
            year: year,
            time: (new Date(year, month + 1, (i + 1))).getTime()
          })
        }
      }
    }
  }
  if (vm.daysArr.length < 42) {
    for (let i = 0; i < 7; i++) {
      vm.daysArr.push({
        day: '',
        date_i: i + 1,
        month: month,
        year: year,
        time: (new Date(year, month + 1, (i + 1))).getTime()
      })
    }
  }
}

export function selectTime(vm, event, i) {
  // 获取当前点击选择的时间的时间戳
  let select_time = (new Date(i.year, i.month, i.date_i)).getTime()
  // 选择单日
  if (vm.isSingleDay) {
    vm.$store.commit('changeBegin_time', select_time)
    vm.$store.commit('changeEnd_time', select_time)
  } else {
    // 选择区间
    // 往后点
    if (select_time >= vm.begin_time) {
      if (select_time <= vm.end_time) {
        // 距离开始位置的长度小于距离结束位置的长度
        if ((select_time - vm.begin_time) < vm.end_time - select_time) {
          vm.$store.commit('changeEnd_time', select_time)
        } else {
          vm.$store.commit('changeBegin_time', select_time)
        }
      } else {
        vm.$store.commit('changeEnd_time', select_time)
      }
    }
    // 往前点
    if (select_time < vm.begin_time) {
      vm.$store.commit('changeBegin_time', select_time)
    }
  }
}

export function addMonth(vm) {
  vm.month = vm.month + 1
  // 当前月份为12月 年加1 月等于0
  if (vm.month > 11) {
    vm.year = vm.year + 1
    vm.month = 0
  }
  getMonthDays(vm.year, vm.month, vm)
}

export function reduceMonth(vm) {
  vm.month = vm.month - 1
  // 当前月份为1月 年减1 月等于11
  if (vm.month < 0) {
    vm.year = vm.year - 1
    vm.month = 11
  }
  getMonthDays(vm.year, vm.month, vm)
}

export function changeMonth(vm, event, m) {
  vm.month = m
  getMonthDays(vm.year, vm.month, vm)
}

export function addYear(vm) {
  vm.year = vm.year + 1
  getMonthDays(vm.year, vm.month, vm)
}

export function reduceYear(vm) {
  vm.year = vm.year - 1
  getMonthDays(vm.year, vm.month, vm)
}
