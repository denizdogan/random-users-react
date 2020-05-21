import * as React from "react";
import { useEffect, useState } from "react";
import URI from "urijs";

import Gender from "../types/Gender";
import type { User } from "../types/User";
import { BASE_URL, PAGE_SIZE, SEED } from "../consts";
import Loader from "./Loader";
import UserList from "./UserList";
import UserFilters from "./UserFilters";

export default () => {
  // set up the state
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [minAge, setMinAge] = useState(0);
  const [genders, setGenders] = useState(new Set([Gender.Male, Gender.Female]));

  // load new users whenever the value of `page` changes
  useEffect(() => {
    (async () => {
      setLoading(true);

      // build the url programmatically
      const uri = URI(BASE_URL).path("/api").addQuery({
        page,
        results: PAGE_SIZE,
        seed: SEED,
      });

      // i prefer using async/await instead of .then, even though it looks a
      // bit wonky inside useEffect (which doesn't support async callbacks)
      try {
        const response = await fetch(uri.toString());
        const data = await response.json();
        setUsers([...users, ...data.results]);
      } catch (e) {
        // normally we would probably log this to sentry or similar
        console.error(e);
      }

      setLoading(false);
    })();
  }, [page]);

  // exclude users that don't match all the filters
  const filteredUsers = users.filter(
    (u) =>
      u.dob.age >= minAge &&
      ((u.gender === "male" && genders.has(Gender.Male)) ||
        (u.gender === "female" && genders.has(Gender.Female)))
  );

  // render
  return (
    <div>
      {loading && <Loader />}
      <h1>Secret Profiles</h1>
      <UserFilters
        minAge={minAge}
        setMinAge={setMinAge}
        genders={genders}
        setGenders={setGenders}
      />
      <UserList users={filteredUsers} />
      <button disabled={loading} onClick={() => setPage(page + 1)}>
        Load more
      </button>
    </div>
  );
};
