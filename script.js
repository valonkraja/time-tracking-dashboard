import data from './data.json' with {type: 'json'}

const main = document.querySelector('main')
const timeframeEl = document.querySelectorAll('.timeframe')
const timeEl = document.querySelector('.time')


const initialize = function(data, timeframe){
    data.forEach((d) => {
        const title = d.title === 'Self Care' ? 'self-care' : d.title.toLowerCase()
        const titleCapital = d.title
        const current = d.timeframes[timeframe]['current']
        const previous = d.timeframes[timeframe]['previous']
        main.insertAdjacentHTML('beforeend', `<div class="card ${title}">
        <img
          src="./images/icon-${title}.svg"
          alt="${title} icon"
          class="icon"
        />
        <div class="data-card">
          <div class="title">
            <p>${titleCapital}</p>
            <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                fill="#BBC0FF"
                fill-rule="evenodd"
              />
            </svg>
          </div>
          <div class="data">
            <h1 class="${title}-hours">${current}hrs</h1>
            <p class="${title}-prev">Last Day ${previous}hrs</p>
          </div>
        </div>
      </div>`)})
}

const updateUI = function(data, timeframe){
    data.forEach((d) => {
        const title = d.title === 'Self Care' ? 'self-care' : d.title.toLowerCase()

        const period = timeframe === 'daily' ? 'Day' : timeframe === 'weekly' ? 'Week' : 'Month'

        const current = d.timeframes[timeframe]['current']
        const previous = d.timeframes[timeframe]['previous']
        document.querySelector(`.${title}-hours`).innerText = `${current}hrs`
        document.querySelector(`.${title}-prev`).innerText = `Last ${period} ${previous}hrs`

    })
}

initialize(data, 'daily')

timeEl.addEventListener('click', function(e){
    e.preventDefault()
    timeframeEl.forEach((el)=>{
        el.classList.remove('active')
    })

    if(!e.target.classList.contains('timeframe')) return
    e.target.classList.add('active')

    const timeframe = e.target.classList.contains('monthly') ? 'monthly' : e.target.classList.contains('weekly') ? "weekly" : 'daily'

    updateUI(data, timeframe)

})
   


