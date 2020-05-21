import * as React from "react";

import type { User } from "../types/User";
import { formatDate } from "../utils";

interface Props {
  users: User[];
}

export default ({ users }: Props) => (
  <div>
    Displaying {users.length} users
    <ul id="users">
      {users.map((val, idx) => (
        <li key={idx}>
          <img
            className="photo"
            src={val.picture.large}
            alt="" // no reason to use alt here
          />
          <div className="name">
            {val.name.title} {val.name.first} {val.name.last}
          </div>
          <div className="dob">
            {formatDate(val.dob.date)} ({val.dob.age} yo)
          </div>
          <div className="phone">
            <a href={`tel:${val.phone}`}>{val.phone}</a>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
