import moment from "moment";
import define from "./define"

const tranEventType = (eventType) => {
  let event

  switch (eventType) {
    case 0:
      event = "119통화 버튼"
      break
    case 1:
      event = "119통화 취소"
      break
    case 2:
      event = "119통화"
      break
    case 4:
      event = "G/W 전원연결"
      break
    case 5:
      event = "G/W 전원차단"
      break
    case 7:
      event = "활동미감지"
      break
    case 8:
      event = "활동있음"
      break
    case 9:
      event = "문 열림"
      break
    case 10:
      event = "문 닫힘"
      break
    case 11:
      event = "화재"
      break;
    case 12:
      event = "화재 종료"
      break;
    case 15:
      event = "응급호출"
      break;
    case 16:
      event = "응급호출 취소"
      break;
    case 17:
      event = "외출"
      break
    case 18:
      event = "재실"
      break
    case 100:
      event = "개통"
      break;
  }

  return event
}

const failureType = (failure) =>{
  let ret = ""
  if(failure == "Unplug"){
    ret = "전원 차단"
  }else if(failure == "Non_Receive"){
    ret = "데이터 미수신"
  }
  return ret
}

const noActTime = (time) =>{
  let eventTime = moment(time)
  let now = moment()
  let ret = []
  let diff = now.diff(eventTime,"hours")

  if(diff > 0){
    ret.time = diff+"시간"
    if(diff < 12){
      ret.level = '보통'
    }else if(diff < 18){
      ret.level = '주의'
      ret.label = { 심각도: 'secondary'}
    }else if(diff < 24){
      ret.level = '경고'
      ret.label = { 심각도: 'warning'}
    }else {
      ret.level = '위험'
      ret.label = { 심각도: 'danger'}
    }
  }else{
    ret.time = now.diff(eventTime,"minutes")+"분"
    ret.level = '보통'
  }
  return ret
}

export  default {
  tranEventType,
  noActTime,
  failureType,
  define
}

