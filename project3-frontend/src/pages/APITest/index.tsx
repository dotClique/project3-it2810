import { User } from ".prisma/client";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { HelloAPI } from "../../../../project3-common/src/types";
import { createUserFromAPI, getHelloFromAPI, getUserFromAPI } from "../../helpers/api-calls";

const users = gql`
  query {
    users {
      alias
    }
  }
`;
/**
 * A page testing that the client and server work.
 */
export default function APITest() {
  const [hello, setHello] = useState<HelloAPI | null>(null);
  const [postUser, setPostUser] = useState<User | null>(null);
  const [getUser, setGetUser] = useState<User | null>(null);
  const { loading, error, data } = useQuery(users);

  useEffect(() => {
    console.log(loading, error, data);
  }, [loading]);

  useEffect(() => {
    getHelloFromAPI()
      .then((res) => {
        setHello(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log("Hello error", err);
      });

    createUserFromAPI()
      .then((res) => {
        setPostUser(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log("createUser Error", err);
      });

    getUserFromAPI()
      .then((res) => {
        setGetUser(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log("getUser error", err);
      });
  }, []);
  return (
    <div>
      <div>
        <pre>{hello ? JSON.stringify(hello, null, 2) : "No hello"}</pre>
      </div>
      <div>
        <pre>{postUser ? JSON.stringify(postUser, null, 2) : "No postUser"}</pre>
      </div>
      <div>
        <pre>{getUser ? JSON.stringify(getUser, null, 2) : "No getUser"}</pre>
      </div>
    </div>
  );
}
