const starSystem = (score) => {
  let newScore = score / 2;
  let wholestars = Math.round(newScore);
  let htmlStar = '';
  for (var i = 1; i <= wholestars; i++) {
    htmlStar += `<svg class='c-filmdetail-star-checked' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" xml:space="preserve">
        <polygon class="st0" points="405.47,490.98 250.6,377.41 96.77,492.38 154.89,307.22 0.02,193.65 190.8,192.78 248.92,7.62 
          308.72,192.25 499.5,191.38 345.67,306.35 "/>
        </svg>`;
  }
  for (var ii = wholestars; ii <= 4; ii++) {
    htmlStar += `<svg class='c-filmdetail-star' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" xml:space="preserve">
        <polygon class="st0" points="405.47,490.98 250.6,377.41 96.77,492.38 154.89,307.22 0.02,193.65 190.8,192.78 248.92,7.62 
          308.72,192.25 499.5,191.38 345.67,306.35 "/>
        </svg>`;
  }
  return htmlStar;
};
export default starSystem;
