const reviewForm = () => {
  return `<div class="mb-3 col-lg-8">
    <label for="titel" class="form-label">Titel</label>
    <input type="text" class="form-control bg-dark text-light" id="titel" placeholder="">
</div>
<div class="mb-3 col-lg-2">
    <label for="score" class="form-label">Score</label>
    <input type="number" class="form-control bg-dark text-light" id="score" placeholder="" min="1" max="10">
</div>
<div class="mb-3 col-lg-10">
    <label for="discription" class="form-label">Discription</label>
    <textarea class="form-control bg-dark text-light" id="discription" rows="3"></textarea>
</div>
<div class="mb-3 col-lg-5">
<button type="submit" class="btn c-app-buttons js-review">Submit</button>
</div>
</div>`;
};
export default reviewForm;
