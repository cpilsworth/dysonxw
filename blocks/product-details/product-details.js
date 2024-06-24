import { html, render } from '../../scripts/preact.js';
import ffetch from '../../scripts/ffetch.js';

/**
 * https://main--dysonxw--cpilsworth.aem.page/products.json
 * sku: "AW12345",
 * title: "Dyson Airwrap™ multi-styler and dryer Complete Long in Nickel/Copper",
 * image: "https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/hero/400720-01.png?$responsive$&fmt=png-alpha&cropPathE=desktop&fit=stretch,1&wid=576",
 * rating: "5",
 * price: "479.99",
 * paypal: "160",
 * includes: "Includes complimentary Fast dryer attachment worth £35. Only at Dyson.co.uk",
 * description: ""
 */
function ProductDetails(props) {
  const { product } = props;
  return html`
    <div>
        <div class="product-details-info">
            <picture>
                <source type="image/webp" srcset="${product.logo}?width=152&amp;format=webply&amp;optimize=medium" />
                <img loading="eager" alt="The logo for ${product.title}" src="${product.logo}?width=152&amp;format=png&amp;optimize=medium" width="152" height="52"/>
            </picture>
            <p class="save-label">Save £${product.save}</p>
            <div class="rating">
                <div class="stars" style="--rating: ${product.save};" aria-label="Rating of this product is ${product.save} out of 5."><span> ${product.rating} / 5 from 48950 Reviews</span></div>
            </div>
            <p class="stock">${product.stock}</p>
            <p class="previous-price">Was £${product.previousPrice}</p>
            <p class="price">Price: £${product.price}</p>
            <p class="save"><span>Save: £${product.save}</span></p>
            <p class="credit">Pay in 3 interest-free payments of £${product.paypal} with PayPal</p>
            <p class="includes">${product.includes}</p>
            <a href="#" class="button">Add to basket</a>
        </div>
        <div class="product-details-desc">
            <div class="product-details-media">
                <picture>
                    <source type="image/webp" srcset="${product.image}?width=315&amp;format=webply&amp;optimize=medium" media="(min-width: 600px)" />
                    <source type="image/webp" srcset="${product.image}?width=496&amp;format=webply&amp;optimize=medium" />
                    <source type="image/png"  srcset="${product.image}?width=315&amp;format=png&amp;optimize=medium" media="(min-width: 600px)" />
                    <img loading="eager" alt="The airwrap and all it's accessories" src="${product.image}?width=496&amp;format=png&amp;optimize=medium" width="496" height="744" />
                </picture>
            </div>
            <div class="product-details-copy">
                <h1>${product.title}</h1>
                <p>${product.description}</p>
            </div>
        </div>
    </div>`;
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const sku = block.innerText?.trim();
  const product = await ffetch('/products.json')
    .filter((e) => e.sku === sku).first();
  block.innerText = '';
  render(html`<${ProductDetails} product=${product} />`, block);
}
