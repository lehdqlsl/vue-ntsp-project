function dest(){
  if (process.env.VUE_APP_LOC === 'dev')
    return 'https://www.api-ntsp.site/dev'
  if (process.env.VUE_APP_LOC === 'sn')
    return 'https://www.api-ntsp.site/sn'
  if (process.env.VUE_APP_LOC === 'local')
    return 'http://localhost:8473'
  if (process.env.VUE_APP_LOC === 'kt')
    return 'https://www.api-ntsp.site/kt'
}

export default Object.freeze({
  DEST: dest()
})

