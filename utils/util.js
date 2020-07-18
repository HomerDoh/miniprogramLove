const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const timeStamp = date => {
  const timeStamp = Date.parse(date)
  return timeStamp
}


const stampTime = stamp => {
  let date = new Date()
  let currentTimeStamp = Date.parse(date)
  let inteval = (currentTimeStamp - stamp) / 1000
  if (inteval < 60) {
    return inteval + '秒钟前'
  } else if (inteval < 3600) {
    return parseInt(inteval / 60) + '分钟前'
  } else if (inteval < 216000) {
    return parseInt(inteval / 3600) + '小时前'
  } else {
    let time = (date.getMonth() + 1) + '月' + date.getDate() + '日'
    return time
  }
}



module.exports = {
  formatTime: formatTime,
  timeStamp: timeStamp,
  stampTime: stampTime
}