function dest(){
  if (process.env.VUE_APP_LOC === 'dev')
    return 'https://api-ntsp.ga/dev'
  if (process.env.VUE_APP_LOC === 'sn')
    return 'https://api-ntsp.ga/sn'
  if (process.env.VUE_APP_LOC === 'local')
    return 'http://localhost:8473'
}

export default Object.freeze({
  DEST: dest()
})

