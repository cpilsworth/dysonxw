export default function decorate(block) {
  // get image and set class
  const image = block.querySelector(':scope > div:first-child');
  image.className = 'teaser-image';

  const content = document.createElement('div');
  content.className = 'teaser-content';

  // remove the div wrappers for each content item & append to single content block
  const contentItems = block.querySelectorAll(':scope > div:nth-child(n + 2)');
  contentItems?.forEach((div) => {
    const elem = div?.firstElementChild?.firstElementChild;
    if (elem || (elem instanceof Node)) {
      content.appendChild(elem);
      div.remove();
    }
  });

  // add both image and content to a wrapper div
  const wrapper = document.createElement('div');
  wrapper.appendChild(image);
  wrapper.appendChild(content);
  block.appendChild(wrapper);
}
