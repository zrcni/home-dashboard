import cheerio from 'cheerio'

export class NameDayHTMLParser {
  private $: cheerio.Root

  private selectors = {
    official: 'p:contains("Nimipäivää") > strong > a',
    swedish: 'p:contains("Ruotsinkielistä nimipäivää") > strong > a',
    sami: 'p:contains("Saamenkielistä nimipäivää") > strong > a',
    orthodox: 'p:contains("Ortodoksista nimipäivää") > strong > a',
    unofficial: 'p:contains("Epävirallista nimipäivää") > strong > a',
  }

  constructor(html: string) {
    this.$ = cheerio.load(html)
  }

  findNameDays() {
    return Object.entries(this.selectors).reduce(
      (nameDays, [key, selector]) => {
        nameDays[key as keyof typeof this.selectors] = this.$(selector)
          .map((_, el) => this.$(el).text())
          .get() as string[]
        return nameDays
      },
      {} as NameDaysResult
    )
  }
}

export interface NameDaysResult {
  official: string[]
  swedish: string[]
  sami: string[]
  orthodox: string[]
  unofficial: string[]
}
