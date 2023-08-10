import axios from 'axios'
import { load } from 'cheerio'

export default defineEventHandler(async (event) => {
  const { keywords, new_url } = getQuery(event)
  var url: any = null

  if (!keywords && !new_url) {
    throw createError({ statusCode: 400, statusMessage: 'Keywords required.' })
  }
  if (keywords) url = encodeURI(`https://www.ebay.com/sch/i.html?&_nkw=${keywords}&LH_Sold=1&LH_Complete=1`);
  if (new_url) url = new_url


  const response = await axios.get(url)
  const $ = load(response.data)
  console.log(url)


  const excluded_categories = [
    'All'
  ]

  const categories_element = $('.srp-refine__category__list').last()
  var recommended_category: any = []
  const primary_categories: any = []

  const recommended_name = $('.srp-refine__category__item[data-state="selected"] > span').contents().filter(function () { return this.nodeType === 3 }).text().trim()
  if (recommended_name && !excluded_categories.includes(recommended_name)) {
    recommended_category = [{
      name: recommended_name,
      value: url
    }]
  }

  categories_element.find('a').each((i, cat_element) => {
    const primary_name = $(cat_element).find('span').text().trim()
    const primary_url = $(cat_element).attr('href')
    primary_categories.push({
      name: primary_name,
      value: primary_url
    })
  })


  const is_spell_check = $('.section-notice__main').text().includes('Showing results for')
  var original_search_query = null
  var expected_search_query = null
  var disreguard_spell_check_link = null
  if (is_spell_check) {
    original_search_query = $('#gh-ac').attr('value')
    expected_search_query = $('.srp-controls__count-heading span').map((i, el) => $(el).text()).get()[1]
    disreguard_spell_check_link = $('.section-notice__main a').attr('href')
  }


  return {
    recommended_category,
    primary_categories,
    spell_check: {
      is_spell_check,
      original_search_query,
      expected_search_query,
      disreguard_spell_check_link
    }
  }

})