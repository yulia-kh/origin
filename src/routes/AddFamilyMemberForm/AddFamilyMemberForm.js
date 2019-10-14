import React from 'react';

export default class AddFamilyMemberForm extends React.Component {
  render() {
    return (
      <section>
        <form>
          <label for="select-relative">Relation*</label>
          <select id="select-relative">
            <option>Father</option>
            <option>Mother</option>
          </select>
          <div class="form-section">
            <label for="first-name">First name</label>
            <input type="text" name="first-name" id="first-name" placeholder="First name" required />
            <label for="last-name">Last name</label>
            <input type="text" name="last-name" id="last-name" placeholder="Last name" required />
          </div>    
          <div class="form-section">
            <label>Date of birth</label>
            <input type="number" name="date-month" placeholder="01" min="1" max="12" /> .
            <input type="number" name="date-day" class="date-day"  placeholder="01" min="1" max="31" /> .
            <input type="number" name="date-year" class="date-year" placeholder="2017" min="2016" max="2017" />
            <label>Date of death</label>
            <input type="number" name="date-month" placeholder="01" min="1" max="12" /> .
            <input type="number" name="date-day" class="date-day"  placeholder="01" min="1" max="31" /> .
            <input type="number" name="date-year" class="date-year" placeholder="2017" min="2016" max="2017" />
          </div>
          <div class="form-section">
            <label for="summary">Add interesting facts, details or story</label>
            <textarea name="summary" id="summary" rows="15"></textarea>
          </div>
          <button type="submit">Submit</button>
          <button type="reset">Cancel</button>
        </form>
      </section>
    )
  }
}