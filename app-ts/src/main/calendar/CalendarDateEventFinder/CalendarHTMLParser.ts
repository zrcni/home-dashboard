import cheerio from 'cheerio'

// TODO: rename?
export class CalendarHTMLParser {
  private $: cheerio.Root

  private selectors = {
    calendarDay: '.kuukausi_taulu .kuukausi_taulu_sisa tbody',
    calendarDayNum: '.kasikuva:first-child > td[align=RIGHT]',
    holyDayEvent: '.teksti_pyh',
    holidayDayEvent: '.teksti_juh',
  }

  constructor(html: string) {
    this.$ = cheerio.load(html)
  }

  getEventsByDayOfMonth(dayOfMonth: number) {
    const calendarDayElement = this.findCalendarDayElement(dayOfMonth)

    return {
      holiday: this.findHolidayEvents(this.$(calendarDayElement)),
      holy: this.findHolyDayEvents(this.$(calendarDayElement)),
    }
  }

  private findHolyDayEvents(el: cheerio.Cheerio) {
    return el
      .find(this.selectors.holyDayEvent)
      .map((_, el) => this.parseEventElement(this.$(el)))
      .get()
  }

  private findHolidayEvents(el: cheerio.Cheerio) {
    return el
      .find(this.selectors.holidayDayEvent)
      .map((_, el) => this.parseEventElement(this.$(el)))
      .get()
  }

  private parseEventElement(el: cheerio.Cheerio) {
    return this.$(el).text().trim()
  }

  private findCalendarDayElement(dayOfMonth: number) {
    const e = this.$(this.selectors.calendarDay)

    return e
      .filter((_, el) => {
        const l = this.$(el).find(this.selectors.calendarDayNum)
        return this.isCalendarDay(l, dayOfMonth)
      })
      .get()[0]
  }

  private isCalendarDay(el: cheerio.Cheerio, dayOfMonth: number) {
    const nums = dayOfMonth
      .toString()
      .split('')
      .map((n) => Number(n))

    return nums.length === 1
      ? this.isSingleDigitCalendarDay(el, nums[0])
      : this.isDoubleDigitCalendarDay(el, nums[0], nums[1])
  }

  private findCalendarDayImgElements(el: cheerio.Cheerio) {
    const imgEls = el.find('img')
    return imgEls.filter((_, el) => this.isImgSrc(this.$(el).attr().src))
  }

  private isSingleDigitCalendarDay(el: cheerio.Cheerio, n: number) {
    const dayImgEls = this.findCalendarDayImgElements(el)
    if (dayImgEls.length !== 1) {
      return false
    }

    const [img] = dayImgEls.get()
    const imgSrc = this.$(img).attr().src

    return this.isImgSrcForNumber(imgSrc, n)
  }

  private isDoubleDigitCalendarDay(
    el: cheerio.Cheerio,
    n1: number,
    n2: number
  ) {
    const dayImgEls = this.findCalendarDayImgElements(el)
    if (dayImgEls.length !== 2) {
      return false
    }

    const [img1, img2] = dayImgEls.get()
    const img1Src = this.$(img1).attr().src
    const img2Src = this.$(img2).attr().src

    return (
      this.isImgSrcForNumber(img1Src, n1) && this.isImgSrcForNumber(img2Src, n2)
    )
  }

  private isImgSrcForNumber(src: string, n: number) {
    return src === this.blackNumImageUrl(n) || src === this.redNumImageUrl(n)
  }

  private blackNumImageUrl(n: number) {
    return `images/styles/original/num-musta-${n}.png`
  }

  private redNumImageUrl(n: number) {
    return `images/styles/original/num-punainen-${n}.png`
  }

  private isImgSrc(src: string) {
    return src.startsWith(`images/styles/original/num-`)
  }
}
