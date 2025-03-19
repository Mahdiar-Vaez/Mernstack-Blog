import React from "react";
import Title from "../../ui/Title";
import { users } from "../../constants";
import Member from "./Member";

export default function Team() {
  return (
    <div className="bg-white  p-4 rounded-2xl w-full dark:bg-gray-600 dark:text-gray-300 flex-1 flex-col gap-5">
      <Title>تیم من </Title>

      {users.map((user, index) => {
        return <Member key={index} user={user} />;
      })}
    </div>
  );
}
