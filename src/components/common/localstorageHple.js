export function getData () {
  return JSON.parse(localStorage.getItem('goodslist') || '[]')
}

export function setData (json) {
  let data = getData()
  let hasdata = false
  if (data.length > 0) {
    data.forEach((item) => {
      if (json.id == item.id) {
        hasdata = true
        item.count += json.count
      }
    })
  }
  if (!hasdata) {
    data.push(json)
  }
  localStorage.setItem('goodslist', JSON.stringify(data))
}
export function delgoods (id) {
  let data = getData()
  let index = data.findIndex((item) => {
    return item.id == id
  })
  data.splice(index, 1)
  localStorage.setItem('goodslist', JSON.stringify(data))
}
export function update (json) {
  let data = getData()
  data.forEach((item) => {
    if (item.id == json.id) {
      item.count += parseInt(json.count)
    }
  })
  localStorage.setItem('goodslist', JSON.stringify(data))
}
