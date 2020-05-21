import * as React from "react";

import Gender from "../types/Gender";
import { setRemove } from "../utils";

interface Props {
  minAge: number;
  setMinAge: (minAge: number) => void;
  genders: Set<Gender>;
  setGenders: (genders: Set<Gender>) => void;
}

export default ({ minAge, setMinAge, genders, setGenders }: Props) => {
  /**
   * Toggle the filter of a given gender. Prevent disabling all genders.
   * @param gender The gender to toggle
   */
  const toggleGender = (gender: Gender) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.target.checked
      ? setGenders(new Set(genders.add(gender)))
      : genders.size > 1 && setGenders(setRemove(genders, gender));
  };

  return (
    <div id="filters">
      <div className="age">
        <label htmlFor="min-age-slider">Age from:</label>
        <input
          id="min-age-slider"
          type="range"
          value={minAge}
          onChange={(e) => setMinAge(e.target.valueAsNumber)}
        />
        <span>{minAge}</span>
      </div>
      <div className="gender">
        <label htmlFor="gender-male">
          <input
            id="gender-male"
            type="checkbox"
            checked={genders.has(Gender.Male)}
            onChange={toggleGender(Gender.Male)}
          />
          Male
        </label>
        <label htmlFor="gender-female">
          <input
            id="gender-female"
            type="checkbox"
            checked={genders.has(Gender.Female)}
            onChange={toggleGender(Gender.Female)}
          />
          Female
        </label>
      </div>
    </div>
  );
};
