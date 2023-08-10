import axios from 'axios'
import { load } from 'cheerio'

export default defineEventHandler(async (event) => {
  var ebay_url = getQuery(event).ebay_url as string
  console.log(ebay_url)
  ebay_url = ebay_url += '&_ipg=240'
  const response = await axios.get(ebay_url)
  const $ = load(response.data)

  // general details
  const search_query = $('#gh-ac').attr('value')
  const total_results = $('.srp-controls__count-heading span').map((i, el) => $(el).text()).get()[0]

  const is_spell_check = $('.section-notice__main').text().includes('Showing results for')
  var original_search_query = null
  var expected_search_query = null
  var disreguard_spell_check_link = null
  if (is_spell_check) {
    original_search_query = $('#gh-ac').attr('value')
    expected_search_query = $('.srp-controls__count-heading span').map((i, el) => $(el).text()).get()[1]
    disreguard_spell_check_link = $('.section-notice__main a').attr('href')
  }



  // items
  const items: object[] = []
  $('.srp-results .s-item').each((item_index, item) => {
    const title: string | null = getDirectTextContent($(item).find('.s-item__title span[role="heading"]')).text().trim() || null
    const date_sold: Date = new Date($(item).find('.s-item__title--tag .POSITIVE').text().replace('Sold', '').trim()) || null
    const secondary_info: string[] = $(item).find('.s-item__subtitle').text().split('·').map((e) => e.trim())
    const item_link: string | null = $(item).find('a.s-item__link').attr('href') || null


    const ratings_element = $(item).find('.s-item__reviews')
    const ratings_count = $(ratings_element).find('.s-item__reviews-count > span:not(.clipped)').text().replace(' product ratings', '') || null
    const stars = $(ratings_element).find('.x-star-rating .clipped').text().replace(' stars.', '').split(' out of ')[0] || null
    const possible_stars = $(ratings_element).find('.x-star-rating .clipped').text().replace(' stars.', '').split(' out of ')[1] || null
    const ratings_link = $(ratings_element).find('a').attr('href') || null


    const price_element = $(item).find('.s-item__price')
    const is_price_range: boolean | null = $(price_element).find('.DEFAULT').text().includes('to')
    var price_value: number | null = null
    var price_lower: number | null = null
    var price_upper: number | null = null
    var total_bids: number | null = null
    if (is_price_range) {
      price_lower = parseFloat($(price_element).find(':not(.DEFAULT)').map((i, el) => $(el).text()).get()[0])
      price_upper = parseFloat($(price_element).find(':not(.DEFAULT)').map((i, el) => $(el).text()).get()[1])
    }
    else {
      price_value = parseFloat($(price_element).text().trim().replaceAll('$', '').replaceAll(',', ''))
    }
    var buying_format = null
    if ($(item).find('.s-item__purchase-options').text().includes('Buy It Now')) {
      buying_format = 'Buy It Now'
    }
    else if ($(item).find('.s-item__bids').text().includes('bid')) {
      buying_format = 'Auction'
      total_bids = Number($(item).find('.s-item__bids').text().trim().replace('bids', '').replace('bid', '').trim())
    }
    else if ($(item).find('.s-item__purchase-options').text().includes('or Best Offer')) {
      buying_format = 'Accepts Offers'
    }


    const shipping_price = $(item).find('.s-item__shipping').text().replace('+$', '').replace('shipping', '').trim() || null
    const is_free_returns = !!$(item).find('.s-item__free-returns').text() || null
    const sell_one_like_this_link = $(item).find('.s-item__sell-one-like-this a').attr('href') || null

    const is_top_rated_plus = !!$(item).find('.s-item__etrs-text').text()
    const is_ebay_refurbished = !!$(item).find('.s-item__authorized-seller').text()
    const is_benefits_charity = !!$(item).find('.s-item__charity s-item__charity').text()

    const image_url = $(item).find('.s-item__image-wrapper img').attr('src') || null

    const from_location = $(item).find('.s-item__location').text().replace('from', '').trim()


            items.push({
              title,
              date_sold,
              secondary_info,
              item_link,
              price: {
                is_price_range,
                price_value,
                price_lower,
                price_upper,
              },
              product_ratings: {
                stars,
                possible_stars,
                ratings_count,
                ratings_link
              },
              buying_format,
              total_bids,
              shipping_price,
              is_free_returns,
              sell_one_like_this_link,
              image_url,
              badges: {
                is_top_rated_plus,
                is_ebay_refurbished,
                is_benefits_charity
              },
              from_location
            })

    function getDirectTextContent(element: any) {
      return $(element).contents().filter(function () {
        return this.type === 'text';
      })
    }

  });
  return {
    //items,
    search_query,
    total_results,
    spell_check: {
      is_spell_check,
      original_search_query,
      expected_search_query,
      disreguard_spell_check_link
    },
    items
  }

})