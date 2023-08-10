import axios from 'axios'
import { load } from 'cheerio'

export default defineEventHandler(async (event) => {
    const { new_url } = getQuery(event)
    const url: string = String(new_url)
    const response = await axios.get(url)
    /*
        const response_url = response.request.res.responseUrl
        const url_params: string[] = []
        new URL(response_url).searchParams.forEach((value, key) => {
            url_params.push(key)
        })
        console.log(response_url)
    */

    const $: any = load(response.data)
    const total_results = $('.srp-controls__count-heading span').map((i, el) => $(el).text()).get()[0]
    const excluded_aspects = [
        'Category',
        'Price',
        'Buying Format',
        'Item Location',
        'Shipping Options',
        'Local Pickup',
        'Show only',
        'Features',
    ]
    /*
        const speical_aspect_ids: any = {
            'Condition': 'LH_ItemCondition'
        }
    */
    const aspects: any = {}
    $('.x-refine__main__list').each((_, aspect_selector: any) => {
        // only show the filters deemed most important by ebay (opened)
        if ($(aspect_selector).find('.x-refine__item--toggle').attr('aria-expanded') == 'true') {
            const group_name = $(aspect_selector).find('h3').text().trim()
            if (!excluded_aspects.includes(group_name)) {
                const values: any = []
                $(aspect_selector).find('.x-refine__main__list--value').each((_, aspect_value_selector: any) => {
                    const aspect_name = $(aspect_value_selector).find('.x-refine__multi-select-checkbox input').attr('aria-label')
                    const aspect_url = $(aspect_value_selector).find('a').attr('href')
                    const selected = !!$(aspect_value_selector).find('.x-refine__main__list--value a .x-refine__select__svg ~ span.clipped').text().trim()
                    const results: number = Number($(aspect_value_selector).find('.x-refine__multi-select-histogram').text().trim().replaceAll('(', '').replaceAll(')', '').replaceAll(',', ''))
                    values.push({
                        name: aspect_name,
                        value: aspect_url,
                        selected,
                        metadata: {
                            results: results
                        }
                    })
                })
                if (Object.keys(values).length) {
                    aspects[group_name] = values
                }
            }


            /*
            var aspect_name = $(aspect_selector).find('.x-refine__main__list--value').attr('name')
            var aspect_value = $(aspect_selector).find('h3').text().trim()
            // do not include excluded_aspects
            if (!excluded_aspects.includes(aspect_value)) {
                // handle all aspect names that dont have 'name' attribute. eg. ones that are converted to special ids we cannot see.
                if (aspect_name === undefined) {
                    aspect_name = speical_aspect_ids[aspect_value]
                }
                const values: any = []
                $(aspect_selector).find('.x-refine__main__list--value').each((_, aspect_value_selector: any) => {
                    // do not include text in span
                    const aspect_name = $(aspect_value_selector).find('.x-refine__multi-select-cbx input').attr('[aria-label]')
                    const aspect_value = $(aspect_value_selector).attr('name')
                    values.push({
                        name: aspect_name,
                        value: aspect_value
                    })
                })
                aspects.push({
                    name: aspect_name,
                    value: aspect_value,
                    selections: values
                })
            }
            */
        }
    })
    return {
        total_results,
        aspects
    }

})