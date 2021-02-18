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
    case 3:
      event = "생활관리사 통화"
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
    default:
      event ="Unknown:"+eventType
      break;
  }

  return event
}

const tranDevType = (eventType) => {
  let event
  switch (eventType) {
    case 2:
      event = "활동감지기"
      break
    case 18:
      event = "열림감지기"
      break
    case 11:
      event = "화재감지기"
      break
    case 10:
      event = "응급호출기"
      break
    case 3:
      event = "레이더센서"
      break
    default:
      event ="Unknown:"+eventType
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
  }else if(failure == "Normal"){
    ret = "정상"
  }else if(failure == "AS"){
    ret = "점검"
  }

  return ret
}

const FormatNumber = (number) =>{

  if(number == "")
    return number

  if(number.length == 16){
    number = number.replace(/(\w{2})(\w{2})(\w{2})(\w{2})(\w{2})(\w{2})(\w{2})(\w{2})/, "$1\:$2\:$3\:$4\:$5\:$6\:$7\:$8");
  }else {
    if(number.length == 11){
      number = number.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3")
    }
  }

  return number
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

const elapsedTime = (time) =>{
  let eventTime = moment(time)
  let now = moment()
  let diff = now.diff(eventTime,"hours")

  if(diff <= 0){
    diff = now.diff(eventTime,"minutes")+"분"
  }else if(diff > 24){
    diff = now.diff(eventTime,"days")+"일"
  } else{
    diff += "시간"
  }
  return diff
}

const batteryStatus = (battery) =>{
  let bat

  switch (battery) {
    case 2:
      bat = "정상"
      break;
    case 1:
      bat = "부족"
      break;
    case 0 :
      bat = "교체"
      break;
  }

  return bat
}

export  default {
  batteryStatus,
  tranEventType,
  tranDevType,
  noActTime,
  failureType,
  FormatNumber,
  elapsedTime,
  define
}

