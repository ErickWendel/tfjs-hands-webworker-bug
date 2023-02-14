
const worker = new Worker('./index.worker.js')

worker.onmessage = ({ data }) => {
  console.log('msg', data)
  document.querySelector('#output').innerHTML = `<strong>Error from Worker</strong>: <br>${data.split('\n').join('<br>')}`
}
worker.postMessage({ msg: 'hey' })